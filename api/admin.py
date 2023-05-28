from django.contrib import admin
from .models import Venue
# Register your models here.
# for django admin
# username: ramanen
# password: ram@2001

#admin.site.register(Venue)

@admin.register(Venue)
class VenueModel(admin.ModelAdmin):
    list_filter = ('location', 'host')
    list_display = ('location', 'host')