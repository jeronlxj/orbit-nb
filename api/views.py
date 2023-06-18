from django.urls import path
# import the Venues table from model
from .models import Venue

# allows us to create a class that inherits form a generic API view
from rest_framework import generics, viewsets, status

# import the serialiser that we want to use
from .serializer import VenueSerializer, BookingsSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound

from .firebase_client import FirebaseClient

# view and create Venues
class VenueView(generics.CreateAPIView):
    # return all venue objects
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer

class VenueDisplay(generics.ListAPIView):
    # return all venue objects
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer

class BookingsViewSet(viewsets.ViewSet):
    client = FirebaseClient()

    def create(self, request, *args, **kwargs):
        serializer = BookingsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.client.create(serializer.data)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    def list(self, request):
        bookings = self.client.all()
        serializer = BookingsSerializer(bookings, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        booking = self.client.get_by_id(pk)

        if booking:
            serializer = BookingsSerializer(booking)
            return Response(serializer.data)

        raise NotFound(detail="Booking Not Found", code=404)

    def destroy(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        self.client.delete_by_id(pk)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        serializer = BookingsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.client.update(pk, serializer.data)

        return Response(serializer.data)