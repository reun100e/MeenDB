from django.shortcuts import render, get_object_or_404

from .models import Fish, FishPhoto, LocalNames
from .serializers import FishSerializer, FishPhotoSerializer, LocalNamesSerializer, UserSerializer

from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated, AllowAny

from django.contrib.auth.models import User


def fish_list(request):
    fishes = Fish.objects.all()  # Retrieve all fish entries
    return render(request, "fish/index.html", {"fishes": fishes})


def fish_detail(request, fish_id):
    fish = get_object_or_404(Fish, id=fish_id)
    return render(request, "fish/fish_detail.html", {"fish": fish})


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]