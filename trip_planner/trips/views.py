from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Trip
from .serializers import TripSerializer
import requests

class TripAPI(APIView):
    def post(self, request):
        serializer = TripSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # Call external map API for route data we are using OpenStreetMap
            route_data = self.get_route(serializer.data)
            return Response({
                "trip": serializer.data,
                "route": route_data,
                "eld_logs": self.generate_eld_logs(serializer.data)
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_route(self, trip_data):
        access_token = "pk.eyJ1IjoiNGNvZGV4IiwiYSI6ImNtODM1djB5bjFqeHgyanNhM25qdmR3OWwifQ.gCllT-vPN_z9I3wyM5QqBg"  # mapstoken
        pickup = trip_data["pickup_location"]
        dropoff = trip_data["dropoff_location"]

        # Convert locations to coordinates using Geocoding API
        geocode_url = f"https://api.mapbox.com/geocoding/v5/mapbox.places/{pickup}.json?access_token={access_token}"
        pickup_coords = requests.get(geocode_url).json()["features"][0]["center"]

        geocode_url = f"https://api.mapbox.com/geocoding/v5/mapbox.places/{dropoff}.json?access_token={access_token}"
        dropoff_coords = requests.get(geocode_url).json()["features"][0]["center"]

        # Get route
        directions_url = f"https://api.mapbox.com/directions/v5/mapbox/driving/{pickup_coords[0]},{pickup_coords[1]};{dropoff_coords[0]},{dropoff_coords[1]}?geometries=geojson&access_token={access_token}"
        response = requests.get(directions_url).json()

        route = response["routes"][0]
        return {
            "distance": route["distance"],
            "duration": route["duration"],
            "steps": route["legs"][0]["steps"]
        }


    def generate_eld_logs(self, trip_data):
        # Generate daily log sheets based on cycle hours
        return [{"day": 1, "driving_hours": 8, "rest_hours": 4}]
