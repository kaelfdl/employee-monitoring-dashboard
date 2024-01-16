from django.urls import path, include, re_path
from rest_framework import routers
from backend import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'employees', views.EmployeeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', views.login_view),
    path('register/', views.register_view),
    path('logout/', views.logout_view),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

urlpatterns += router.urls