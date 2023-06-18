from django.urls import path
from .views import VenueView, VenueDisplay, BookingsViewSet

urlpatterns = [
    path('venue', VenueView.as_view()),
    path('display', VenueDisplay.as_view()),
    path('bookings', BookingsViewSet.as_view({'get': 'list'})),
    path('bs', BookingsViewSet.as_view({'post': 'create'}))
]