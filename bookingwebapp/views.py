from django.shortcuts import render
from django.http import HttpResponse
# from pyrebase import pyrebase
from google.cloud import firestore

# config = {
#   'apiKey': "AIzaSyCDF-HxTp2OIrQs9kAFdrKS1Znvyx66YIY",
#   'authDomain': "bookingwebapp-8bfa9.firebaseapp.com",
#   'databaseURL': "https://bookingwebapp-8bfa9-default-rtdb.asia-southeast1.firebasedatabase.app",
#   'projectId': "bookingwebapp-8bfa9",
#   'storageBucket': "bookingwebapp-8bfa9.appspot.com",
#   'messagingSenderId': "254879504393",
#   'appId': "1:254879504393:web:394822ed9278a06d1d40d8"
# }
# firebase=pyrebase.initialize_app(config)
# authe = firebase.auth()
# database=firebase.database()

db=firestore.Client(project = 'bookingwebapp-8bfa9')

def index(request):
    return render(request, 'index.html')

def test(request):
    sampledoc = db.collection('bookings').document('UQyzF2SyEjra3dIoBOfk').get().to_dict()
    loc = sampledoc['Location']
    return render(request, 'test.html', {"location":loc}) 
#test.html in rwfb/build
