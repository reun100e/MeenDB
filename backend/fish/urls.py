from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    FishViewSet,
    CommonNamesViewSet,
    FishPhotoViewSet,
    FamilyViewSet,
    ExternalLinksViewSet,
    PhotoDetailsViewSet,
    UserViewSet,
)

router = DefaultRouter()
router.register(r"fish", FishViewSet)
router.register(r"common-names", CommonNamesViewSet)
router.register(r"fish-photos", FishPhotoViewSet)
router.register(r"families", FamilyViewSet)
router.register(r"external-links", ExternalLinksViewSet)
router.register(r"photo-details", PhotoDetailsViewSet)
router.register(r"users", UserViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
