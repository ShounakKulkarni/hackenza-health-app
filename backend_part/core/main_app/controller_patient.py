from django.shortcuts import render
from .models import *
import faiss
import numpy as np
from openai import OpenAI
from django.db.models import *
import ctypes.util

def patched_find_library(name):
    if name == 'c':
        return 'msvcrt.dll'  # Windows' C runtime library
    return ctypes.util.find_library(name)

ctypes.util.find_library = patched_find_library
import whisper
import os
os.environ['KMP_DUPLICATE_LIB_OK'] = 'True'

def add_user_patient(email,password):
    try:
        if not Login.objects.filter(mail_id = email):
            user = Login(mail_id = email, password = password, role = 'Patient')
            user.save()
            return {'status': 'success', 'message': 'User added successfully', 'role': user.role}
        else:
            return {'status': 'failed', 'message': 'User already exists'}
    
    except Exception as e:
        return {'status': 'error', 'message': str(e)}

def add_user_patient_profile(name, age, gender, mobile, blood_group, email, allergies, medical_history):
    try:
        if not Patient.objects.filter(name = name, gender = gender, age = age, blood_group = blood_group, contact = mobile).exists():
            pkey = Login.objects.filter(mail_id = email).values_list('id',flat=True).first()
            patient = Patient(patient_id = pkey,name = name, gender = gender, age = age, blood_group = blood_group, contact = mobile, allergies = allergies, medical_history = medical_history)
            patient.save()
        else:
            return {'status': 'failed', 'message': 'User already exists'}
        
    except Exception as e:
        return {'status': 'error', 'message': str(e)}

def show_patient_profile(patient_id):
    try:
        if not Patient.objects.filter(patient_id = patient_id).exists():
            return {'status': 'failed', 'message': 'User does not exist'}
        else:
            pat = Patient.objects.get(patient_id = patient_id)
            return{
                'name' : pat.name,
                'gender' : pat.gender,
                'age' : pat.age,
                'blood_group' : pat.blood_group,
                'allergies' : pat.allergies,
                'medical_history' : pat.medical_history,
                'contact' : pat.contact
            }

    except Exception as e:
        return {'status': 'error', 'message': str(e)}
    
def show_diagnosis_history_patient(patient_id):
    try:
        if not Patient.objects.filter(patient_id = patient_id).exists():
            return {'status': 'failed', 'message': 'User does not exist'}
        else:
            diag = Diagnosis.objects.get(patient_id = patient_id)
            return{
                'symptoms' : diag.symptoms,
                'severity' : diag.severity,
                'duration' : diag.duration,
                'response' : diag.response,
                'approval' : diag.approval
            }

    except Exception as e:
        return {'status': 'error', 'message': str(e)}
    
from django.db.models import Max

def add_diagnosis(symptoms, severity, duration, patient_id, symptoms_audio_path=None):
    try:
        # Check if the patient exists by the patient_id field.
        if not Patient.objects.filter(patient_id=patient_id).exists():
            return {'status': 'failed', 'message': 'User does not exist'}

        # If no text is provided but an audio path is provided, transcribe the audio.
        #example usage
        # symptoms_audio_path = "C:\\Users\\Divyam Gupta\\Desktop\\hackenza-health-app\\backend\\core\\AI_RAG\\file1.mp3"
        # if symptoms_audio_path:
        #     symptoms = speech_to_text(symptoms_audio_path)

        index_path = "C:\\Users\\Divyam Gupta\\Desktop\\hackenza-health-app\\backend\\core\\AI_RAG\\index"
        chunks_path = "C:\\Users\\Divyam Gupta\\Desktop\\hackenza-health-app\\backend\\core\\AI_RAG\\chunks.txt"
        query = symptoms + " This is the severity: " + severity + " This is the duration: " + duration

        # Retrieve doctor and patient objects (using doctor with id=1 as example)
        doc = Doctor.objects.get(doctor_id='1')
        pat = Patient.objects.get(patient_id=patient_id)
        
        # Get response from the AI component.
        ai_response = answer_query(query=query, index_path=index_path, chunks_path=chunks_path, k=5)
        print(ai_response)
        
        # Determine a new id by finding the maximum current id and adding one.
        max_id = Diagnosis.objects.all().aggregate(Max('id'))['id__max'] or 0
        new_id = max_id + 1
        
        # Create a Diagnosis object.
        diag = Diagnosis(
            id=new_id,
            patient_id=pat,  # foreign key field expects a Patient instance
            doctor_id=doc,   # foreign key field expects a Doctor instance
            symptoms=symptoms,
            severity=severity,
            duration=duration,
            response=ai_response,
            approval='Pending'
        )
        diag.save()
        
        return {'status': 'success', 'message': 'Diagnosis added successfully'}
    except Exception as e:
        return {'status': 'error', 'message': str(e)}



def show_pending_reports_patient(patient_id):
    try:
        # Find all diagnosis records for this patient with PENDING approval status
        pending_reports = Diagnosis.objects.filter(
            patient_id=patient_id, 
            approval='PENDING'
        )
        
        # Check if any pending reports exist
        if not pending_reports.exists():
            return {'status': 'success', 'message': 'No pending reports found', 'data': []}
        
        # Prepare the response data
        reports_data = []
        for report in pending_reports:
            doctor = report.doctor_id
            reports_data.append({
                'diagnosis_id': report.id,
                'created_at': report.created_at,
                'doctor_name': doctor.name,
                'doctor_specialization': doctor.specialization,
                'symptoms': report.symptoms,
                'severity': report.severity,
                'duration': report.duration,
                'response': report.response
            })
            
        return {
            'status': 'success',
            'message': f'Found {len(reports_data)} pending reports',
            'data': reports_data
        }
            
    except Exception as e:
        return {'status': 'error', 'message': str(e)}



# Speech-to-Text Module
def speech_to_text(audio_path):
    print("here 1")
    model = whisper.load_model("base")  # or tiny, small, medium, large
    print("here 2")
    result = model.transcribe(audio_path)
    print(result["text"])

#RAG MODULES
client = OpenAI(api_key="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")  # Replace with your actual API key


def load_faiss_index(index_path: str):
    """Load a FAISS index from the specified file path."""
    return faiss.read_index(index_path)

def load_text_chunks(path: str):
    """Load text chunks (retrieved documents) from a file."""
    with open(path, "r", encoding="utf-8") as f:
        return [line.strip() for line in f if line.strip()]

def generate_query_embedding(query: str):
    """Generate an embedding vector for the input query using OpenAI."""
    response = client.embeddings.create(
        input=query,
        model="text-embedding-ada-002"
    )
    return np.array(response.data[0].embedding).astype("float32").reshape(1, -1)

def search_index(faiss_index, query_embedding, k: int = 5):
    """Search the FAISS index and return top-k indices for similar chunks."""
    distances, indices = faiss_index.search(query_embedding, k)
    return indices[0]

def build_prompt(query: str, relevant_chunks: list):
    """Construct the full prompt for GPT using context and the user's query."""
    context = "\n".join(relevant_chunks)
    
    return f"""Context:
{context}

Query:
{query}

Answer:"""

def generate_response(query: str, relevant_chunks: list, model: str = "gpt-4-turbo", max_tokens: int = 500):
    """Generate a response from the LLM using the query and context chunks."""
    
    if not relevant_chunks:
        return "I'm sorry, but I couldn't find enough relevant medical information based on your symptoms. We will check back with the doctor"

    system_prompt = (
        "You are a helpful and knowledgeable medical assistant. "
        "The user will provide medical symptoms, and your task is to suggest possible diagnoses or causes based solely on the information provided and the retrieved documents.\n\n"
        "Guidelines:\n"
        "- Always use only the information from the context provided.\n"
        "- If no relevant information is found, clearly state that the context doesn’t contain sufficient details.\n"
        "- Never make up diagnoses, symptoms, or treatments.\n"
        "- Be cautious and avoid medical certainty.\n"
        "- Use clear, concise, and professional language.\n"
        "- Do not assume or guess beyond the provided context.\n"
        "- This is a medical system, do not tell the user to consult a healthcare professional"
        "If the user gives something very abstract ask it to redescribe it, "
        "If the q"
    )

    user_prompt = build_prompt(query, relevant_chunks)

    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        max_tokens=max_tokens
    )
    return response.choices[0].message.content.strip()

def answer_query(query: str, index_path: str, chunks_path: str, k: int = 5):
    """Full RAG pipeline: From query to response."""
    faiss_index = load_faiss_index(index_path)
    chunks = load_text_chunks(chunks_path)
    query_embedding = generate_query_embedding(query)
    indices = search_index(faiss_index, query_embedding, k)
    relevant_chunks = [chunks[i] for i in indices if i < len(chunks)]
    return generate_response(query, relevant_chunks)

# === Example ===
index_path = "C:\\Users\\Divyam Gupta\\Desktop\\hackenza-health-app\\backend\\core\\AI_RAG\\index"
chunks_path = "C:\\Users\\Divyam Gupta\\Desktop\\hackenza-health-app\\backend\\core\\AI_RAG\\chunks.txt"
# query = "I feel dumb"

# response = answer_query(query, index_path, chunks_path, k=5)
# print("Answer:", response)

