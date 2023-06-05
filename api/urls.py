from django.urls import path
from .views import VenueView, VenueDisplay

urlpatterns = [
    path('venue', VenueView.as_view()),
    path('display', VenueDisplay.as_view()),
]