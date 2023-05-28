from django.urls import path

# import the Venues table from model
from .models import Venue

# allows us to create a class that inherits form a generic API view
from rest_framework import generics, status

# import the serialiser that we want to use
from .serializer import VenueSerializer, UpdateVenueSerializer
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

# view modified views
# since the parent class is API View -> can say post/get method etc..
class UpdateVenueView(APIView):
    Venue.objects.all().delete()

    serializer_class = UpdateVenueSerializer

    def post(self, request, format=None):

        # create a new Venue if the active & current venue does not exist
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        # if the session for venue exists 
        if serializer.is_valid():
            location = serializer.data.get('location')
            closed = serializer.data.get('closed')
            total_pax = serializer.data.get('total_pax')
            host = self.request.session.session_key

            # check in database if theres any Venue that matches w the current session
            queryset = Venue.objects.filter(host=host)


            #if said query exists, then update the query
            if queryset.exists():
               venue = queryset[0]
               venue.location = location
               venue.closed = closed
               venue.total_pax = total_pax

               # set what fields you can update
               venue.save(update_fields=['location', 'closed', 'total_pax'])
               return Response(VenueSerializer(venue).data, status=status.HTTP_200_OK)
            
            else:
                venue = Venue(location=location, closed=closed,
                                total_pax=total_pax)
                venue.save()
                
                # basically serialise the venue data and send it to response to show it 
                return Response(VenueSerializer(venue).data, status=status.HTTP_201_CREATED)


        