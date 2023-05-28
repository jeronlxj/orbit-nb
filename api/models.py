from django.db import models

# Create your models here.

# venues and it's fields
class Venue(models.Model):
    
    name = models.CharField(max_length=30, unique=True)
    location = models.CharField(max_length=30, default="Utown")
    closed = models.BooleanField(null=False, default=False)
    total_pax = models.IntegerField(null=False, default=10)
    host = models.CharField(max_length=50, unique=True) 
