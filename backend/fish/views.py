from rest_framework import viewsets, permissions
from .models import (
    Fish,
    CommonNames,
    FishPhoto,
    Family,
    ExternalLinks,
    PhotoDetails,
    CustomUser,
)
from .serializers import (
    FishSerializer,
    CommonNamesSerializer,
    FishPhotoSerializer,
    FamilySerializer,
    ExternalLinksSerializer,
    PhotoDetailsSerializer,
    UserSerializer,
)


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.added_by == request.user


class FishViewSet(viewsets.ModelViewSet):
    queryset = Fish.objects.all()
    serializer_class = FishSerializer

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
        else:
            permission_classes = [permissions.IsAuthenticatedOrReadOnly]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        serializer.save(added_by=self.request.user)


class CommonNamesViewSet(viewsets.ModelViewSet):
    queryset = CommonNames.objects.all()
    serializer_class = CommonNamesSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(added_by=self.request.user)


class FishPhotoViewSet(viewsets.ModelViewSet):
    queryset = FishPhoto.objects.all()
    serializer_class = FishPhotoSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(added_by=self.request.user)


class FamilyViewSet(viewsets.ModelViewSet):
    queryset = Family.objects.all()
    serializer_class = FamilySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ExternalLinksViewSet(viewsets.ModelViewSet):
    queryset = ExternalLinks.objects.all()
    serializer_class = ExternalLinksSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(added_by=self.request.user)


class PhotoDetailsViewSet(viewsets.ModelViewSet):
    queryset = PhotoDetails.objects.all()
    serializer_class = PhotoDetailsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]
