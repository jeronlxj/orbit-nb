from django.urls import path
from .views import VenueView, VenueDisplay, UpdateVenueView

urlpatterns = [
    path('venue', VenueView.as_view()),
    path('display', VenueDisplay.as_view()),
    path('updatevenue', UpdateVenueView.as_view()),
]