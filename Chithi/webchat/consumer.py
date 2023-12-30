#similar to views in django
from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer

from .models import Conversation, Message
from django.contrib.auth import get_user_model

User = get_user_model()


class WebChatConsumer(JsonWebsocketConsumer):

    def __init__(self, *args, **kwargs):
        super().__init__(*args,**kwargs)
        self.chatId = None
        self.user = None

    

    def connect(self):
        self.accept()
        self.chatId = self.scope["url_route"]["kwargs"]["chatId"]
        

        self.user = User.objects.get(id=1)

        async_to_sync(self.channel_layer.group_add)(
            self.chatId,
            self.channel_name,
            )

    def receive_json(self, content):
        chat_id = self.chatId
        sender = self.user
        message = content["message"]

        conversation, created = Conversation.objects.get_or_create(chat_id=chat_id)

        new_message = Message.objects.create(conversation=conversation, sender=sender, content=message)

        async_to_sync(self.channel_layer.group_send)(
            self.chatId,
            {
                "type": "chat.message",
                "new_message": {
                    "id": new_message.id,
                    "sender": new_message.sender.username,
                    "content": new_message.content,
                    "timestamp": new_message.timestamp.isoformat(),
                    },
            },
        )

    def chat_message(self, event):
        self.send_json(event)
                                                        
    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(self.chatId, self.channel_name)
        super().disconnect(close_code)