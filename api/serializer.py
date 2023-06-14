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

class ArticleSerializer(serializers.Serializer):
    id = serializers.CharField(max_length=200, read_only=True)
    headline = serializers.CharField(max_length=2000)
    type_article = serializers.CharField(max_length=2000)

# class TodoSerializer(serializers.Serializer):
#     id = serializers.CharField(max_length=200, read_only=True)
#     name = serializers.CharField(max_length=200)
#     status = serializers.ChoiceField(choices=STATUS_CHOICES)
#     due_date = serializers.DateTimeField()