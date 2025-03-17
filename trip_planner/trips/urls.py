from django.urls import path
from .views import TripAPI, RouteAPI, ELDLogsAPI

urlpatterns = [
    path('api/trip/', TripAPI.as_view(), name='trip_api'),
    path('api/route/', RouteAPI.as_view(), name='route_api'),
    path('api/eld-logs/', ELDLogsAPI.as_view(), name='eld_logs_api'),
]
