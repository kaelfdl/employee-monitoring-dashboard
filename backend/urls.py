from django.urls import path, include
from rest_framework import routers
from backend import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
# router.register(r'employees', views.EmployeeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', views.login_user),
    path('register/', views.register_user),
    path('logout/', views.logout_user),
    path('user/', views.retrieve_user),
    path('employees/', views.employee_list),
    path('employees/<int:pk>/', views.employee_detail)
]

urlpatterns += router.urls