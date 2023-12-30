"""
ASGI config for Chithi project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Chithi.settings')

django_application = get_asgi_application()

from . import urls # noqa isort:skip

application = ProtocolTypeRouter(
    {
    # Django's ASGI application to handle traditional HTTP requests
    "http": get_asgi_application(),
    "websocket":URLRouter(urls.websocket_urlpatterns),
})
