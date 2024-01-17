from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework import permissions, viewsets, status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from backend.serializers import UserSerializer, EmployeeSerializer
from backend.models import Employee

# Create your views here.

# API Viewset for testing
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [permissions.IsAuthenticated]


# Login user
@api_view(['POST'])
def login_view(request):
    user = authenticate(username=request.data['username'], password=request.data['password'])
    if not user:
        return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
    login(request, user)
    serializer = UserSerializer(user)
    return Response(data=serializer.data, status=status.HTTP_200_OK)

# Register user
@api_view(['POST'])
def register_view(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        login(request, user)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_200_OK)

# Logout user
@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def logout_view(request):
    logout(request)
    return Response({"isAuthenticated": request.user.is_authenticated}, status=status.HTTP_200_OK)
