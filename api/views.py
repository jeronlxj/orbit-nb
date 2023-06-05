from django.urls import path
# import the Venues table from model
from .models import Venue

# allows us to create a class that inherits form a generic API view
from rest_framework import generics, viewsets

# import the serialiser that we want to use
from .serializer import VenueSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

# view and create Venues
class VenueView(generics.CreateAPIView):
    # return all venue objects
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer

class VenueDisplay(generics.ListAPIView):
    # return all venue objects
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer



        