from rest_framework.routers import DefaultRouter
from server.views import CategoryListViewSet, ServerListView

router = DefaultRouter()
router.register("api/server/select", ServerListView)
router.register("api/server/category", CategoryListViewSet)



urlpatterns = [] + router.urls
