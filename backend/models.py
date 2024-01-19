from django.db import models
from django.contrib.auth.models import User
# Create your models here.

# Employee Model
class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    is_online = models.BooleanField(default=False)