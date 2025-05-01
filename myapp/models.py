from django.db import models
from django.db.models import Model
from django.contrib.auth.models import User


class Users(models.Model):
    username = models.CharField(max_length = 15, unique = True, blank = False)
    first_name = models.CharField(max_length= 15, blank = False)
    last_name = models.CharField(max_length= 35, blank = False)
    emails = models.EmailField(max_length=50,  blank=False, unique=True)
    password = models.CharField(max_length=25, blank=False)

class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Task(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='tasks')
    description = models.TextField()
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.description[:30]  
