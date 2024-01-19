import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from asgiref.sync import async_to_sync
from django.contrib.auth.models import User
from backend.models import Employee

class AppConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = 'employees'

        self.user = self.scope['user']
        await self.set_online_status(True)
        self.employee = await self.get_employee()


        await self.channel_layer.group_add(self.room_group_name, self.channel_name)


        await self.accept()
        await self.send(text_data=json.dumps({
            'type': 'connection established',
            'message': self.employee.is_online
        }))

    async def disconnect(self, close_code):
        await self.set_online_status(False)
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'client_message',
                'message': message
            }
        )
    
    async def client_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({
            "message": message
        }))

    @database_sync_to_async
    def get_employee(self):
        return Employee.objects.get(user=self.scope['user'])

    async def set_online_status(self, status):
        employee = await self.get_employee()
        employee.is_online = status
        await database_sync_to_async(employee.save)()
