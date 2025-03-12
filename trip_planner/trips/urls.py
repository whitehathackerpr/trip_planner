from django.urls import path
from .views import TripAPI

urlpatterns = [
    path('api/trip/', TripAPI.as_view(), name='trip_api'),
]
