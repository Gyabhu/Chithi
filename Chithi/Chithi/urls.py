"""
URL configuration for Chithi project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from webchat.consumer import WebChatConsumer
from rest_framework.routers import DefaultRouter
from webchat.views import ChatViewSet
from account.views import AccountViewSet, JWTCookieTokenObtainView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)



router = DefaultRouter()
router.register("api/chats", ChatViewSet, basename="chats")
router.register("api/account", AccountViewSet, basename="account")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("server.urls")),
    path("api/docs/schema", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/schema/ui", SpectacularSwaggerView.as_view()),
    path('api/token/', JWTCookieTokenObtainView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
] + router.urls

websocket_urlpatterns =[path("chats/<str:chatId>", WebChatConsumer.as_asgi())]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
