from django.shortcuts import render

# Create your views here.

# API ENDPOINTS FOR DOCTOR FUNCTIONS

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST
import json
from .models import *
from .controller_doctor import *
from .controller_patient import *


@csrf_exempt
@require_POST
def api_add_user_doctor(request):
    try:
        data = json.loads(request.body.decode("utf-8"))
        email = data.get('email')
        password = data.get('password')
        # Call your logical function (which sets the cookie as well)
        return add_user_doctor(request, email, password)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})

@csrf_exempt
@require_POST
def api_add_user_doctor_profile(request):

    try:
        data = json.loads(request.body.decode("utf-8"))
        name = data.get("name")
        age = data.get("age")
        contact = data.get("contact")
        medical_cred = data.get("medical_cred")
        nmr_id = data.get("nmr_id")
        specialization = data.get("specialization")
        experience = data.get("experience")
        return add_user_doctor_profile(request, name, age, contact, medical_cred, nmr_id, specialization, experience)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})

@csrf_exempt
@require_POST
def api_login_user(request):
    try:
        data = json.loads(request.body.decode("utf-8"))
        email = data.get("email")
        password = data.get("password")
        return login_user(request, email, password)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})

@require_GET
def api_show_doctor_profile(request, doctor_id):
    result = show_doctor_profile(doctor_id)
    return JsonResponse(result)

@require_GET
def api_show_patient_history_doctor(request, doctor_id):
    result = show_patient_history_doctor(doctor_id)
    return JsonResponse(result)

@require_GET
def api_show_pending_reports(request, doctor_id):
    result = show_pending_reports(doctor_id)
    return JsonResponse(result)

@csrf_exempt
@require_POST
def api_approve_response(request, query_id):
    result = approve_response(query_id)
    return JsonResponse(result)

@csrf_exempt
@require_POST
def api_edit_response(request, query_id):
    try:
        data = json.loads(request.body.decode("utf-8"))
        editted_response = data.get('editted_response')
        result = edit_response(query_id, editted_response)
        return JsonResponse(result)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})
        
    
# API ENDPOINTS FOR PATIENT FUNCTIONS


@csrf_exempt
@require_POST
def api_add_user_patient(request):
    try:
        data = json.loads(request.body.decode("utf-8"))
        email = data.get("email")
        password = data.get("password")
        result = add_user_patient(email, password)
        return JsonResponse(result)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})

@csrf_exempt
@require_POST
def api_add_user_patient_profile(request):
    try:
        data = json.loads(request.body.decode("utf-8"))
        name = data.get("name")
        age = data.get("age")
        gender = data.get("gender")
        mobile = data.get("mobile")
        blood_group = data.get("blood_group")
        email = data.get("email")
        allergies = data.get("allergies")
        medical_history = data.get("medical_history")
        result = add_user_patient_profile(name, age, gender, mobile, blood_group, email, allergies, medical_history)
        return JsonResponse(result)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})

@require_GET
def api_show_patient_profile(request, patient_id):
    try:
        result = show_patient_profile(patient_id)
        return JsonResponse(result)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})

@require_GET
def api_show_diagnosis_history_patient(request, patient_id):
    try:
        result = show_diagnosis_history_patient(patient_id)
        return JsonResponse(result)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})

@csrf_exempt
@require_POST
def api_add_diagnosis(request):
    try:
        data = json.loads(request.body.decode("utf-8"))
        symptoms = data.get("symptoms")
        severity = data.get("severity")
        duration = data.get("duration")
        patient_id = data.get("patient_id")
        result = add_diagnosis(symptoms, severity, duration, patient_id)
        return JsonResponse(result)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})

@require_GET
def api_show_pending_reports_patient(request, patient_id):
    try:
        result = show_pending_reports_patient(patient_id)
        return JsonResponse(result)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})
