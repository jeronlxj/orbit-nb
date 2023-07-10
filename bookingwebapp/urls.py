"""
URL configuration for bookingwebapp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from api.views import *
from .views import index, test

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',index),
    path('signup',index),
    path('Home',index),
    path('Rome',index),
    path('book_form',index),
    path('book_calendar',index),
    path('book_dropdown',index),
    path('book_edit',index),
    path('profile',index),
    path('editpassword',index),
    path('editdetails',index),
    path('approve',index),
    path('staffapprove',index),
    path('Rome',index),
    path('staff',index),
    path('StaffHome',index),
    path('chatHome', index),
    path('addFacility',index),
    path('editFacility',index),
    path('dashboard',index),
    path('api/',include('api.urls')),
    path('test',test),
]

