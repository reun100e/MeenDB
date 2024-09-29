from rest_framework import serializers
from .models import Fish, LocalNames, FishPhoto

from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["url", "username", "email", "groups"]


class FishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fish
        fields = "__all__"

class LocalNamesSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocalNames
        fields = "__all__"

class FishPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FishPhoto
        fields = "__all__"