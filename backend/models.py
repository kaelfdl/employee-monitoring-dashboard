from django.db import models
from django.contrib.auth.models import User
# Create your models here.

# Employee Model
class Employee(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(max_length=200, null=True)
    last_name = models.CharField(max_length=200, null=True)
    is_online = models.BooleanField()