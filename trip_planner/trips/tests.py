from django.test import TestCase
from .models import Trip

class TripModelTest(TestCase):
    def test_create_trip(self):
        trip = Trip.objects.create(
            current_location="New York, NY",
            pickup_location="Boston, MA",
            dropoff_location="Philadelphia, PA",
            cycle_hours=8
        )
        self.assertEqual(trip.cycle_hours, 8)

class APITest(TestCase):
    def test_trip_api(self):
        response = self.client.post("/api/trip/", {
            "current_location": "New York, NY",
            "pickup_location": "Boston, MA",
            "dropoff_location": "Philadelphia, PA",
            "cycle_hours": 8
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn("route", response.json())
        