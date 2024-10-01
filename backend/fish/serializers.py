from rest_framework import serializers
from .models import Fish, LocalName, FishPhoto


class FishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fish
        fields = "__all__"


class LocalNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocalName
        fields = "__all__"


class FishPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FishPhoto
        fields = "__all__"
