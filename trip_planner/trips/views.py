from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Trip
from .serializers import TripSerializer, RouteSerializer, ELDLogSerializer
import requests
import math

class TripAPI(APIView):
    def post(self, request):
        serializer = TripSerializer(data=request.data)
        if serializer.is_valid():
            trip = serializer.save()
            # Call external map API for route data
            route_data = self.get_route(serializer.data)
            
            # Update trip with route details
            trip.total_distance = route_data.get('distance')
            trip.total_duration = route_data.get('duration')
            trip.save()
            
            return Response({
                "trip": serializer.data,
                "route": route_data,
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_route(self, trip_data):
        access_token = "pk.eyJ1IjoiNGNvZGV4IiwiYSI6ImNtODM1djB5bjFqeHgyanNhM25qdmR3OWwifQ.gCllT-vPN_z9I3wyM5QqBg"  # mapbox token
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
        
        # Calculate fuel stops (every 1000 miles)
        # Convert meters to miles (1 meter = 0.000621371 miles)
        distance_miles = route["distance"] * 0.000621371
        fuel_stops = math.floor(distance_miles / 1000)
        
        return {
            "distance": route["distance"],
            "distance_miles": distance_miles,
            "duration": route["duration"],
            "duration_hours": route["duration"] / 3600,  # Convert seconds to hours
            "fuel_stops": fuel_stops,
            "pickup_time": 1,  # 1 hour for pickup
            "dropoff_time": 1,  # 1 hour for dropoff
            "geometry": route["geometry"],
            "steps": route["legs"][0]["steps"]
        }

class RouteAPI(APIView):
    def get(self, request):
        serializer = RouteSerializer(data=request.query_params)
        if serializer.is_valid():
            trip_id = serializer.validated_data['trip_id']
            trip = get_object_or_404(Trip, id=trip_id)
            
            # Get trip data
            trip_data = TripSerializer(trip).data
            
            # Calculate route details
            route_data = self.calculate_route(trip_data)
            
            return Response(route_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def calculate_route(self, trip_data):
        # This would be similar to get_route in TripAPI but with more details
        # For now, we'll reuse the existing method
        trip_api = TripAPI()
        route_data = trip_api.get_route(trip_data)
        
        # Add stops and rests based on regulations
        route_data['stops'] = self.calculate_stops(route_data)
        
        return route_data
    
    def calculate_stops(self, route_data):
        stops = []
        
        # Add pickup stop
        stops.append({
            "type": "pickup",
            "duration_hours": 1,
            "location": "Pickup Location"
        })
        
        # Add fuel stops
        distance_covered = 0
        for i in range(route_data['fuel_stops']):
            distance_covered += 1000  # miles
            stops.append({
                "type": "fuel",
                "duration_hours": 0.5,  # 30 minutes for fueling
                "location": f"Fuel Stop {i+1}",
                "distance_miles": distance_covered
            })
        
        # Add dropoff stop
        stops.append({
            "type": "dropoff",
            "duration_hours": 1,
            "location": "Dropoff Location"
        })
        
        return stops

class ELDLogsAPI(APIView):
    def get(self, request):
        serializer = ELDLogSerializer(data=request.query_params)
        if serializer.is_valid():
            trip_id = serializer.validated_data['trip_id']
            trip = get_object_or_404(Trip, id=trip_id)
            
            # Get trip data
            trip_data = TripSerializer(trip).data
            
            # Generate ELD logs
            eld_logs = self.generate_eld_logs(trip_data)
            
            return Response(eld_logs, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def generate_eld_logs(self, trip_data):
        # Get route data first
        trip_api = TripAPI()
        route_data = trip_api.get_route(trip_data)
        
        # Calculate total driving hours
        driving_hours = route_data['duration_hours']
        
        # Add time for stops
        route_api = RouteAPI()
        stops = route_api.calculate_stops(route_data)
        stop_hours = sum(stop['duration_hours'] for stop in stops)
        
        total_hours = driving_hours + stop_hours
        
        # Current cycle used
        current_cycle = trip_data['cycle_hours']
        
        # Calculate remaining hours in 70-hour/8-day cycle
        remaining_hours = 70 - current_cycle
        
        # Generate daily logs
        daily_logs = []
        day = 1
        hours_left = total_hours
        
        while hours_left > 0:
            # Maximum 11 hours driving per day
            day_hours = min(11, hours_left, remaining_hours)
            
            if day_hours <= 0:
                # Need to reset cycle (34-hour restart)
                daily_logs.append({
                    "day": day,
                    "driving_hours": 0,
                    "rest_hours": 34,
                    "status": "34-hour restart",
                    "remaining_cycle_hours": 70
                })
                remaining_hours = 70
                day += 1
                continue
            
            daily_logs.append({
                "day": day,
                "driving_hours": day_hours,
                "rest_hours": 10,  # 10-hour rest period
                "status": "driving",
                "remaining_cycle_hours": remaining_hours - day_hours
            })
            
            hours_left -= day_hours
            remaining_hours -= day_hours
            day += 1
        
        return {
            "trip_id": trip_data['id'],
            "total_driving_hours": driving_hours,
            "total_stop_hours": stop_hours,
            "total_trip_hours": total_hours,
            "daily_logs": daily_logs
        }
