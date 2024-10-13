from rest_framework import serializers
from .models import (
    Fish,
    CommonNames,
    FishPhoto,
    Family,
    ExternalLinks,
    PhotoDetails,
    CustomUser,
)


class FamilySerializer(serializers.ModelSerializer):
    class Meta:
        model = Family
        fields = "__all__"


class CommonNamesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommonNames
        fields = "__all__"


class ExternalLinksSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExternalLinks
        fields = "__all__"


class PhotoDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhotoDetails
        fields = "__all__"


class FishPhotoSerializer(serializers.ModelSerializer):
    details = PhotoDetailsSerializer(many=True, read_only=True)

    class Meta:
        model = FishPhoto
        fields = "__all__"


class FishSerializer(serializers.ModelSerializer):
    family = FamilySerializer(read_only=True)
    common_names = CommonNamesSerializer(many=True, read_only=True)
    external_links = ExternalLinksSerializer(many=True, read_only=True)
    photos = FishPhotoSerializer(many=True, read_only=True)
    added_by = serializers.ReadOnlyField(source="added_by.username")

    class Meta:
        model = Fish
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "username", "email", "user_type"]
        read_only_fields = ["user_type"]
