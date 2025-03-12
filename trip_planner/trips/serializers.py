from rest_framework import serializers
from .models import Trip

class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = '__all__'
        
    def validate_cycle_hours(self, value):
        if value < 1 or value > 70:
            raise serializers.ValidationError("Cycle hours must be between 1 and 70.")
        return value
