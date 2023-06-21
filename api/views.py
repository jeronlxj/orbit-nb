from django.urls import path
# import the Venues table from model
from .models import Venue

# allows us to create a class that inherits form a generic API view
from rest_framework import generics, viewsets, status

# import the serialiser that we want to use
from .serializer import VenueSerializer, BookingsSerializer, UsersSerializer, LocationsSerializer, FacilitiesSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound

from .firebase_client import FirebaseClient, UserClient, LocationClient, FacilityClient

# view and create Venues
class VenueView(generics.CreateAPIView):
    # return all venue objects
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer

class VenueDisplay(generics.ListAPIView):
    # return all venue objects
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer

# handle Bookings table
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
    
# handle Users table
class UsersViewSet(viewsets.ViewSet):
    client = UserClient()

    def create(self, request, *args, **kwargs):
        serializer = UsersSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.client.create(serializer.data)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    def list(self, request):
        users = self.client.all()
        serializer = UsersSerializer(users, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        users = self.client.get_by_id(pk)

        if users:
            serializer = UsersSerializer(users)
            return Response(serializer.data)

        raise NotFound(detail="User Not Found", code=404)

    def destroy(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        self.client.delete_by_id(pk)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        serializer = UsersSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.client.update(pk, serializer.data)

        return Response(serializer.data)
    
# handle Location table
class LocationViewSet(viewsets.ViewSet):
    client = LocationClient()

    def create(self, request, *args, **kwargs):
        serializer = LocationsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.client.create(serializer.data)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    def list(self, request):
        location = self.client.all()
        serializer = LocationsSerializer(location, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        location = self.client.get_by_id(pk)

        if location:
            serializer = LocationsSerializer(location)
            return Response(serializer.data)

        raise NotFound(detail="Location Not Found", code=404)

    def destroy(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        self.client.delete_by_id(pk)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        serializer = LocationsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.client.update(pk, serializer.data)

        return Response(serializer.data)
    
# handle Facility table
class FacilityViewSet(viewsets.ViewSet):
    client = FacilityClient()

    def create(self, request, *args, **kwargs):
        serializer = FacilitiesSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.client.create(serializer.data)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    def list(self, request):
        facility = self.client.all()
        serializer = FacilitiesSerializer(facility, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        facility = self.client.get_by_id(pk)

        if facility:
            serializer = FacilitiesSerializer(facility)
            return Response(serializer.data)

        raise NotFound(detail="Facility Not Found", code=404)

    def destroy(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        self.client.delete_by_id(pk)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        serializer = FacilitiesSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.client.update(pk, serializer.data)

        return Response(serializer.data)
    
