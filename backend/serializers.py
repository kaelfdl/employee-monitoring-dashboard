from django.contrib.auth.models import User
from rest_framework import serializers
from backend.models import Employee

# Get an API representation for a user
class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']

class EmployeeSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    email = serializers.EmailField(source='user.email')
    class Meta:
        model = Employee
        fields = ['username', 'first_name', 'last_name', 'email','is_online']