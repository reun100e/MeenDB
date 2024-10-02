from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FishViewSet, LocalNameViewSet, FishPhotoViewSet

router = DefaultRouter()
router.register(r"fish", FishViewSet)
router.register(r"local-name", LocalNameViewSet)
router.register(r"fish-photos", FishPhotoViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
