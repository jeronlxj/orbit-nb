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

# to allow us to update the venues
class UpdateVenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venue
        fields = ('location', 'closed', 'total_pax')