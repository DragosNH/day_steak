from django.db import models
from django.db.models import Model

class Users(models.Model):
    username = models.CharField(max_length = 15, unique = True, blank = False)
    first_name = models.CharField(max_length= 15, blank = False)
    last_name = models.CharField(max_length= 35, blank = False)
    emails = models.EmailField(max_length=50,  blank=False, unique=True)
    password = models.CharField(max_length=25, blank=False)
