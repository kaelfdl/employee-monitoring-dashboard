from django.contrib.auth.models import User, Group
from rest_framework import serializers
from backend.models import Employee

# Get an API representation for a user
class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['first_name', 'last_name','is_online']