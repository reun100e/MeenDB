from django.db import models
from django.contrib.auth.models import User


class Fish(models.Model):
    common_name = models.CharField(max_length=100)
    scientific_name = models.CharField(max_length=150, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    added_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="added_fish",
    )

    def __str__(self):
        return self.common_name


class LocalName(models.Model):
    fish = models.ForeignKey(Fish, on_delete=models.CASCADE, related_name="local_names")
    local_name = models.CharField(max_length=100)
    region = models.CharField(max_length=100, blank=True, null=True)
    size = models.CharField(max_length=50, blank=True, null=True)
    color_variation = models.CharField(max_length=50, blank=True, null=True)
    growth_stage = models.CharField(max_length=50, blank=True, null=True)
    added_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="added_local_names",
    )

    def __str__(self):
        return f"{self.local_name} - {self.region or 'Unknown Region'}"


class FishPhoto(models.Model):
    fish = models.ForeignKey(Fish, on_delete=models.CASCADE, related_name="photos")
    image = models.ImageField(upload_to="fish_photos/")
    description = models.CharField(max_length=255, blank=True, null=True)
    added_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="added_photos",
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return (
            f"Photo of {self.fish.common_name} ({self.description or 'No description'})"
        )
