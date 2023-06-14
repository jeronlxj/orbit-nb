from django.urls import path
from .views import VenueView, VenueDisplay, ArticleDisplay

urlpatterns = [
    path('venue', VenueView.as_view()),
    path('display', VenueDisplay.as_view()),
    path('articledisplay', ArticleDisplay.as_view()),
]