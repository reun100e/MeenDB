from rest_framework import generics
from .models import Fish, LocalName, FishPhoto
from .serializers import FishSerializer, LocalNameSerializer, FishPhotoSerializer
from rest_framework.permissions import IsAuthenticated


class FishListCreateView(generics.ListCreateAPIView):
    queryset = Fish.objects.all()
    serializer_class = FishSerializer
    permission_classes = [IsAuthenticated]


class LocalNameListCreateView(generics.ListCreateAPIView):
    queryset = LocalName.objects.all()
    serializer_class = LocalNameSerializer
    permission_classes = [IsAuthenticated]


class FishPhotoListCreateView(generics.ListCreateAPIView):
    queryset = FishPhoto.objects.all()
    serializer_class = FishPhotoSerializer
    permission_classes = [IsAuthenticated]
