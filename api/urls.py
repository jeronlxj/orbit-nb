from django.urls import path
from .views import VenueView, VenueDisplay, BookingsViewSet,UsersViewSet, LocationViewSet, FacilityViewSet
from .views import VenueView, VenueDisplay, BookingsViewSet,UsersViewSet, LocationViewSet, FacilityViewSet

urlpatterns = [
    path('venue', VenueView.as_view()),
    path('display', VenueDisplay.as_view()),

    # method : action
    path('bookingsGet', BookingsViewSet.as_view({'get': 'list'})),
    path('bookingsPOST', BookingsViewSet.as_view({'post': 'create'})),
    path('bookingsUpdate/<pk>', BookingsViewSet.as_view({'put': 'update'})),
    path('bookingsGetById/<pk>', BookingsViewSet.as_view({'get': 'retrieve'})),
    path('bookingsDeleteById/<pk>', BookingsViewSet.as_view({'delete': 'destroy'})),

    path('usersGET', UsersViewSet.as_view({'get': 'list'})),
    path('usersPOST', UsersViewSet.as_view({'post': 'create'})),
    path('usersUpdate/<pk>', UsersViewSet.as_view({'put': 'update'})),

    path('locationsGet', LocationViewSet.as_view({'get': 'list'})),
    path('locationsPOST', LocationViewSet.as_view({'post': 'create'})),

    path('facilityGet', FacilityViewSet.as_view({'get': 'list'})),
    path('facilityPOST', FacilityViewSet.as_view({'post': 'create'})),
    path('facilityDeleteById/<pk>', FacilityViewSet.as_view({'delete': 'destroy'})),
]