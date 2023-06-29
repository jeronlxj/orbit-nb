import firebase_admin, os
from firebase_admin import credentials
from firebase_admin import firestore

from django.conf import settings


class FirebaseClient:

    def __init__(self):
        try:
            firebase_admin.get_app()
        except ValueError:
            firebase_admin.initialize_app(
                #credentials.Certificate(settings.FIREBASE_ADMIN_CERT)
                credentials.Certificate("/etc/secrets/FIREBASE_ADMIN_CERT")
                #credentials.Certificate(os.environ.get('FIREBASE_ADMIN_CERT'))
            )

        self._db = firestore.client()
        self._collection = self._db.collection(u'bookings')

    def create(self, data):
        #Create in firestore database
        doc_ref = self._collection.document()
        doc_ref.set(data)

    def update(self, id, data):
        #Update in firestore database using document id
        doc_ref = self._collection.document(id)
        doc_ref.update(data)

    def delete_by_id(self, id):
        #Delete from firestore database using document id
        self._collection.document(id).delete()

    def get_by_id(self, id):
        #Get from firestore database using document id
        doc_ref = self._collection.document(id)
        doc = doc_ref.get()

        if doc.exists:
            return {**doc.to_dict(), "id": doc.id}
        return

    def all(self):
        #Get all from firestore database
        docs = self._collection.stream()
        return [{**doc.to_dict(), "id": doc.id} for doc in docs]

    def filter(self, field, condition, value):
        #Filter using conditions on firestore database
        docs = self._collection.where(field, condition, value).stream()
        return [{**doc.to_dict(), "id": doc.id} for doc in docs]
    
# Users firebase table
class UserClient:

    def __init__(self):
        try:
            firebase_admin.get_app()
        except ValueError:
            firebase_admin.initialize_app(
                #credentials.Certificate(settings.FIREBASE_ADMIN_CERT)
                credentials.Certificate("/etc/secrets/FIREBASE_ADMIN_CERT")
                #credentials.Certificate(os.environ.get('FIREBASE_ADMIN_CERT'))
            )

        self._db = firestore.client()
        self._collection = self._db.collection(u'Users')

    def create(self, data):
        #Create in firestore database
        doc_ref = self._collection.document()
        doc_ref.set(data)

    def update(self, id, data):
        #Update in firestore database using document id
        doc_ref = self._collection.document(id)
        doc_ref.update(data)

    def delete_by_id(self, id):
        #Delete from firestore database using document id
        self._collection.document(id).delete()

    def get_by_id(self, id):
        #Get from firestore database using document id
        doc_ref = self._collection.document(id)
        doc = doc_ref.get()

        if doc.exists:
            return {**doc.to_dict(), "id": doc.id}
        return

    def all(self):
        #Get all from firestore database
        docs = self._collection.stream()
        return [{**doc.to_dict(), "id": doc.id} for doc in docs]

    def filter(self, field, condition, value):
        #Filter using conditions on firestore database
        docs = self._collection.where(field, condition, value).stream()
        return [{**doc.to_dict(), "id": doc.id} for doc in docs]
    
# Locations firebase table
class LocationClient:

    def __init__(self):
        try:
            firebase_admin.get_app()
        except ValueError:
            firebase_admin.initialize_app(
                #credentials.Certificate(settings.FIREBASE_ADMIN_CERT)
                credentials.Certificate("/etc/secrets/FIREBASE_ADMIN_CERT")
                #credentials.Certificate(os.environ.get('FIREBASE_ADMIN_CERT'))
            )

        self._db = firestore.client()
        self._collection = self._db.collection(u'Locations')

    def create(self, data):
        #Create in firestore database
        doc_ref = self._collection.document()
        doc_ref.set(data)

    def update(self, id, data):
        #Update in firestore database using document id
        doc_ref = self._collection.document(id)
        doc_ref.update(data)

    def delete_by_id(self, id):
        #Delete from firestore database using document id
        self._collection.document(id).delete()

    def get_by_id(self, id):
        #Get from firestore database using document id
        doc_ref = self._collection.document(id)
        doc = doc_ref.get()

        if doc.exists:
            return {**doc.to_dict(), "id": doc.id}
        return

    def all(self):
        #Get all from firestore database
        docs = self._collection.stream()
        return [{**doc.to_dict(), "id": doc.id} for doc in docs]

    def filter(self, field, condition, value):
        #Filter using conditions on firestore database
        docs = self._collection.where(field, condition, value).stream()
        return [{**doc.to_dict(), "id": doc.id} for doc in docs]
    
# Locations firebase table
class FacilityClient:

    def __init__(self):
        try:
            firebase_admin.get_app()
        except ValueError:
            firebase_admin.initialize_app(
                #credentials.Certificate(settings.FIREBASE_ADMIN_CERT)
                credentials.Certificate("/etc/secrets/FIREBASE_ADMIN_CERT")
                #credentials.Certificate(os.environ.get('FIREBASE_ADMIN_CERT'))
            )

        self._db = firestore.client()
        self._collection = self._db.collection(u'Facilities')

    def create(self, data):
        #Create in firestore database
        doc_ref = self._collection.document()
        doc_ref.set(data)

    def update(self, id, data):
        #Update in firestore database using document id
        doc_ref = self._collection.document(id)
        doc_ref.update(data)

    def delete_by_id(self, id):
        #Delete from firestore database using document id
        self._collection.document(id).delete()

    def get_by_id(self, id):
        #Get from firestore database using document id
        doc_ref = self._collection.document(id)
        doc = doc_ref.get()

        if doc.exists:
            return {**doc.to_dict(), "id": doc.id}
        return

    def all(self):
        #Get all from firestore database
        docs = self._collection.stream()
        return [{**doc.to_dict(), "id": doc.id} for doc in docs]

    def filter(self, field, condition, value):
        #Filter using conditions on firestore database
        docs = self._collection.where(field, condition, value).stream()
        return [{**doc.to_dict(), "id": doc.id} for doc in docs]
   