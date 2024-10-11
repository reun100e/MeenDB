from django.db import models
from django.contrib.auth import get_user_model
from .users import CustomUser

User = get_user_model()


class Family(models.Model):
    family_name = models.CharField(max_length=100)

    def __str__(self):
        return self.family_name


class Fish(models.Model):
    scientific_name = models.CharField(max_length=150, unique=True)
    family = models.ForeignKey(
        Family, on_delete=models.SET_NULL, null=True, related_name="fishes"
    )
    description = models.TextField(blank=True, null=True)
    added_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="added_fish",
    )

    def __str__(self):
        return self.scientific_name


class CommonNames(models.Model):
    NAME_TYPES = [
        ("general", "General"),
        ("region", "Region"),
        ("size", "Size"),
        ("color", "Color"),
        ("growth", "Growth"),
    ]
    fish = models.ForeignKey(
        Fish, on_delete=models.CASCADE, related_name="common_names"
    )
    common_name = models.CharField(max_length=100)
    name_type = models.CharField(max_length=10, choices=NAME_TYPES)
    added_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="added_common_names",
    )

    def __str__(self):
        return f"{self.common_name} ({self.get_name_type_display()})"


class ExternalLinks(models.Model):
    fish = models.ForeignKey(
        Fish, on_delete=models.CASCADE, related_name="external_links"
    )
    url = models.URLField()
    description = models.TextField(blank=True, null=True)
    added_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="added_links",
    )

    def __str__(self):
        return f"Link for {self.fish.scientific_name}: {self.url[:30]}..."


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
        return f"Photo of {self.fish.scientific_name}"


class PhotoDetails(models.Model):
    DETAIL_TYPES = [
        ("age", "Age"),
        ("color", "Color"),
        ("region", "Region"),
    ]
    photo = models.ForeignKey(
        FishPhoto, on_delete=models.CASCADE, related_name="details"
    )
    detail_type = models.CharField(max_length=10, choices=DETAIL_TYPES)
    detail_value = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.get_detail_type_display()}: {self.detail_value}"


class DataEdits(models.Model):
    EDIT_TYPES = [
        ("create", "Create"),
        ("update", "Update"),
        ("delete", "Delete"),
    ]
    table_name = models.CharField(max_length=50)
    record_id = models.IntegerField()
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="data_edits"
    )
    edit_date = models.DateTimeField(auto_now_add=True)
    edit_type = models.CharField(max_length=10, choices=EDIT_TYPES)
    old_value = models.TextField(blank=True, null=True)
    new_value = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.get_edit_type_display()} on {self.table_name} by {self.user.username}"
