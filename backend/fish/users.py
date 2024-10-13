from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    USER_TYPE_CHOICES = (
        ("visitor", "Visitor"),
        ("registered", "Registered User"),
        ("contributor", "Contributor"),
        ("trusted_contributor", "Trusted Contributor"),
        ("moderator", "Moderator"),
        ("admin", "Admin"),
        ("super_admin", "Super Admin"),
    )

    user_type = models.CharField(
        max_length=20, choices=USER_TYPE_CHOICES, default="registered"
    )

    def __str__(self):
        return f"{self.username} ({self.get_user_type_display()})"

    @property
    def is_staff(self):
        return self.user_type in ["moderator", "admin", "super_admin"]

    @property
    def is_superuser(self):
        return self.user_type == "super_admin"
