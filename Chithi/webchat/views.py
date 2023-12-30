from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .schemas import list_message_docs

from .models import Conversation
from .serializers import MessageSerializer

# Create your views here.

class ChatViewSet(viewsets.ViewSet):
    @list_message_docs
    def list(self, request):
        chat_id = request.query_params.get("chat_id")
        
        try: 
            conversation = Conversation.objects.get(chat_id=chat_id)
            message = conversation.message.all()
            serialzier = MessageSerializer(message, many=True)
            return Response(serialzier.data)
        except Conversation.DoesNotExist:
            return Response([])

