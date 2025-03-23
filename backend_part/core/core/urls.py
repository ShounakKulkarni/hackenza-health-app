"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from main_app import views
from main_app.views import * 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/doctor/add/', views.api_add_user_doctor, name='api_add_user_doctor'),
    path('api/doctor/profile/add/', views.api_add_user_doctor_profile, name='api_add_user_doctor_profile'),
    path('api/login/', views.api_login_user, name='api_login_user'),
    path('api/doctor/<int:doctor_id>/profile/', views.api_show_doctor_profile, name='api_show_doctor_profile'),
    path('api/doctor/<int:doctor_id>/history/', views.api_show_patient_history_doctor, name='api_show_patient_history_doctor'),
    path('api/doctor/<int:doctor_id>/pending/', views.api_show_pending_reports, name='api_show_pending_reports'),
    path('api/diagnosis/<int:query_id>/approve/', views.api_approve_response, name='api_approve_response'),
    path('api/diagnosis/<int:query_id>/edit/', views.api_edit_response, name='api_edit_response'),
    path('api/patient/add/',views.api_add_user_patient, name='api_add_user_patient'),
    path('api/patient/profile/add/',views.api_add_user_patient_profile, name='api_add_user_patient_profile'),
    path('api/patient/<int:patient_id>/profile/',views.api_show_patient_profile, name='api_show_patient_profile'),
    path('api/patient/<int:patient_id>/diagnosis/history/',views.api_show_diagnosis_history_patient, name='api_show_diagnosis_history_patient'),
    path('api/diagnosis/add/',views.api_add_diagnosis, name='api_add_diagnosis'),
    path('api/patient/<int:patient_id>/pending/',views.api_show_pending_reports_patient, name='api_show_pending_reports_patient'),
]
