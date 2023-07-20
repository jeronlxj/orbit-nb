from rest_framework import serializers
from . models import Venue

# take our model and all the python related code -> JSON response
# that our frontend can understand

# allows us to create the venue
class VenueSerializer(serializers.ModelSerializer):
    class Meta:
        # model we want to use
        model = Venue
        # all the fields we want to include in the seriaiization
        # id is the primary key for our model
        fields = ('id', 'host', 'name', 'location', 
                  'closed', 'total_pax')

class BookingsSerializer(serializers.Serializer):
    id = serializers.CharField(max_length=200, read_only=True)
    Location = serializers.CharField(max_length=200)
    Facility = serializers.CharField(max_length=200)
    Name = serializers.CharField(max_length=200)
    UserEmail = serializers.CharField(max_length=200)
    bookingDate = serializers.CharField(max_length=200)
    bookingTitle = serializers.CharField(max_length=200)
    #createdAt = serializers.DateTimeField()
    endTime = serializers.CharField(max_length=200)
    startTime = serializers.CharField(max_length=200)
    status = serializers.CharField(max_length=200)

# serializer for Users
class UsersSerializer(serializers.Serializer):
    id = serializers.CharField(max_length=200, read_only=True)
    Name = serializers.CharField(max_length=200)
    Email = serializers.CharField(max_length=200)
    Location = serializers.CharField(max_length=200)
    Tier = serializers.CharField(max_length=200)
    photoURL = serializers.CharField(max_length=300)

# serializer for Location
class LocationsSerializer(serializers.Serializer):
    id = serializers.CharField(max_length=200, read_only=True)
    Name = serializers.CharField(max_length=200)
    mapURL = serializers.CharField(max_length=300)

# serializer for Users
class UsersSerializer(serializers.Serializer):
    id = serializers.CharField(max_length=200, read_only=True)
    Name = serializers.CharField(max_length=200)
    Email = serializers.CharField(max_length=200)
    Location = serializers.CharField(max_length=200)
    Tier = serializers.CharField(max_length=200)

# serializer for Location
class FacilitiesSerializer(serializers.Serializer):
    id = serializers.CharField(max_length=200, read_only=True)
    Location = serializers.CharField(max_length=200)
    Name = serializers.CharField(max_length=200)
    TotalPax = serializers.IntegerField()

# class TodoSerializer(serializers.Serializer):
#     id = serializers.CharField(max_length=200, read_only=True)
#     name = serializers.CharField(max_length=200)
#     status = serializers.ChoiceField(choices=STATUS_CHOICES)
#     due_date = serializers.DateTimeField()
