from django.shortcuts import render
from .models import *
from django.http import JsonResponse


def add_user_doctor(request, email, password):
    try:
        if not Login.objects.filter(mail_id=email):
            user = Login(mail_id=email, password=password, role='Doctor')
            user.save()
            response_data = {'status': 'success', 'message': 'User added successfully', 'role': user.role}
            response = JsonResponse(response_data)
            # Set cookie with email
            response.set_cookie('user_email', email, max_age=7*24*60*60)  # Cookie valid for 7 days
            return response
        else:
            return JsonResponse({'status': 'failed', 'message': 'User already exists'})
    
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})

# change for doctors profile.
def add_user_doctor_profile(request, name, age, contact, medical_cred, nmr_id, specialization, experience):
    try:
        # Get email from cookie
        email = request.COOKIES.get('user_email')
        
        # Validate that email exists in cookie
        if not email:
            return JsonResponse({'status': 'failed', 'message': 'User not logged in or session expired'})
            
        if not Doctor.objects.filter(name=name, contact=contact, age=age, medical_cred=medical_cred, nmr_id=nmr_id).exists():
            pkey = Login.objects.filter(mail_id=email).values_list('id', flat=True).first()
            doctor = Doctor(name=name, contact=contact, age=age, medical_cred=medical_cred, 
                           nmr_id=nmr_id, specialization=specialization, experience=experience)
            doctor.save()
            return JsonResponse({'status': 'success', 'message': 'Profile created successfully'})
        else:
            return JsonResponse({'status': 'failed', 'message': 'User already exists'})
        
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})



def login_user(request, email, password):
    try:
        # Check if user exists
        if Login.objects.filter(mail_id=email).exists():
            # Get user and verify password
            user = Login.objects.get(mail_id=email)
           
            if user.password == password:
                # Create success response
                response_data = {
                    'status': 'success', 
                    'message': 'Login successful',
                    'role': user.role
                }
                
                # Set cookie with user email
                response = JsonResponse(response_data)
                response.set_cookie('user_email', email, max_age=7*24*60*60)  # Cookie valid for 7 days
                
                return response
            else:
                return JsonResponse({'status': 'failed', 'message': 'Invalid password'})
        else:
            return JsonResponse({'status': 'failed', 'message': 'User does not exist'})
    
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})


def show_doctor_profile(doctor_id):
    try:
        if not Doctor.objects.filter(doctor_id = doctor_id).exists():
            return {'status': 'failed', 'message': 'User does not exist'}
        else:
            doc = Doctor.objects.get(doctor_id = doctor_id)
            return{
                'name' : doc.name,
                'age' : doc.age,
                'contact' : doc.contact,
                'medical_cred' : doc.medical_cred,
                'nmr_id' : doc.nmr_id,
                'specialization' : doc.specialization,
                'experience' : doc.experience
            }

    except Exception as e:
        return {'status': 'error', 'message': str(e)}

def show_patient_history_doctor(doctor_id):
    try:
        # Find all diagnosis records for this doctor
        doctor_diagnoses = Diagnosis.objects.filter(doctor_id=doctor_id)
        
        # Check if any diagnoses exist
        if not doctor_diagnoses.exists():
            return {'status': 'success', 'message': 'No patient history found', 'data': []}
        
        # Get unique patients diagnosed by this doctor
        patient_ids = doctor_diagnoses.values_list('patient_id', flat=True).distinct()
        
        # Prepare the response data
        history_data = []
        for patient_id in patient_ids:
            patient = Patient.objects.get(patient_id=patient_id)
            patient_diagnoses = doctor_diagnoses.filter(patient_id=patient_id)
            
            # Get all diagnoses for this patient
            diagnoses_info = []
            for diagnosis in patient_diagnoses:
                diagnoses_info.append({
                    'diagnosis_id': diagnosis.id,
                    'created_at': diagnosis.created_at,
                    'symptoms': diagnosis.symptoms,
                    'severity': diagnosis.severity,
                    'duration': diagnosis.duration,
                    'response': diagnosis.response,
                    'approval': diagnosis.approval
                })
            
            # Add patient details with their diagnoses
            history_data.append({
                'patient_id': patient.patient_id,
                'patient_name': patient.name,
                'age': patient.age,
                'gender': patient.gender,
                'diagnoses': diagnoses_info
            })
            
        return {
            'status': 'success',
            'message': f'Found history for {len(history_data)} patients',
            'data': history_data
        }
            
    except Exception as e:
        return {'status': 'error', 'message': str(e)}


def show_pending_reports(doctor_id):
    try:
        # Find all diagnosis records for this doctor with PENDING approval status
        pending_reports = Diagnosis.objects.filter(
            doctor_id=doctor_id, 
            approval='PENDING'
        )
        
        # Check if any pending reports exist
        if not pending_reports.exists():
            return {'status': 'success', 'message': 'No pending reports found', 'data': []}
        
        # Prepare the response data
        reports_data = []
        for report in pending_reports:
            patient = report.patient_id
            reports_data.append({
                'diagnosis_id': report.id,
                'created_at': report.created_at,
                'patient_name': patient.name,
                'patient_age': patient.age,
                'patient_gender': patient.gender,
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


def approve_response(query_id):
    try:
        if not Diagnosis.objects.filter(id=query_id).exists():
            return {'status': 'failed', 'message': 'No such query exists.'}
        
        query = Diagnosis.objects.get(id=query_id)
        query.approval = 'APPROVED'
        query.save()
        
        return {'status': 'success', 'message': 'Query approved successfully.'}
    
    except Exception as e:
        return {'status': 'error', 'message': str(e)}


def edit_response(query_id, editted_response):
    try:
        if not Diagnosis.objects.filter(id=query_id).exists():
            return {'status': 'failed', 'message': 'No such query exists.'}
        
        query = Diagnosis.objects.get(id=query_id)
        if query.approval == 'APPROVED':
            return {'status': 'failed', 'message': 'Already Approved.'}
        
        query.response = editted_response
        query.approval = 'APPROVED'
        query.save()
        
        return {'status': 'success', 'message': 'Query response editted successfully.'}
    
    except Exception as e:
        return {'status': 'error', 'message': str(e)}
    

