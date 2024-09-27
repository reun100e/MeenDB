from django.db import models


class Fish(models.Model):
    common_name = models.CharField(max_length=100)
    scientific_name = models.CharField(max_length=150)
    other_features = models.TextField(blank=True, null=True)  # Optional
    description = models.TextField(blank=True, null=True)
    related_fish = models.ForeignKey(
        "self",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="related_fish_entries",
    )

    def __str__(self):
        return f"{self.common_name} ({self.scientific_name})"


class LocalNames(models.Model):
    fish = models.ForeignKey(Fish, on_delete=models.CASCADE, related_name="local_names")
    local_name = models.CharField(max_length=100)
    description = models.TextField(
        blank=True, null=True
    )  # Explain size/shape differences

    def __str__(self):
        return f"{self.local_name} for {self.fish.common_name}"


class FishPhoto(models.Model):
    fish = models.ForeignKey(Fish, on_delete=models.CASCADE, related_name="photos")
    image = models.ImageField(upload_to="fish_photos/")
    description = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Photo of {self.fish.common_name} ({self.description})"
