from rest_framework import viewsets
from .models import Fish, LocalName, FishPhoto
from .serializers import FishSerializer, LocalNameSerializer, FishPhotoSerializer
from rest_framework.permissions import IsAuthenticated


class FishViewSet(viewsets.ModelViewSet):
    queryset = Fish.objects.all()
    serializer_class = FishSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(added_by=self.request.user)


class LocalNameViewSet(viewsets.ModelViewSet):
    queryset = LocalName.objects.all()
    serializer_class = LocalNameSerializer
    permission_classes = [IsAuthenticated]


class FishPhotoViewSet(viewsets.ModelViewSet):
    queryset = FishPhoto.objects.all()
    serializer_class = FishPhotoSerializer
    permission_classes = [IsAuthenticated]
