from backend.consumers import AppConsumer

from django.urls import re_path


websocket_urlpatterns = [
    re_path(r'ws/employees/', AppConsumer.as_asgi()),
]