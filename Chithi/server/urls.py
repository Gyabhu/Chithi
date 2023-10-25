from rest_framework.routers import DefaultRouter
from server.views import ServerListView

router = DefaultRouter()
router.register("api/server/select", ServerListView)

urlpatterns = [] + router.urls
