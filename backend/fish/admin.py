from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import (
    Fish,
    CommonNames,
    FishPhoto,
    Family,
    ExternalLinks,
    PhotoDetails,
    CustomUser,
)


class CommonNamesInline(admin.TabularInline):
    model = CommonNames
    extra = 1


class ExternalLinksInline(admin.TabularInline):
    model = ExternalLinks
    extra = 1


class FishPhotoInline(admin.TabularInline):
    model = FishPhoto
    extra = 1


@admin.register(Fish)
class FishAdmin(admin.ModelAdmin):
    list_display = ("scientific_name", "family", "added_by")
    list_filter = ("family", "added_by")
    search_fields = ("scientific_name", "common_names__common_name")
    inlines = [CommonNamesInline, ExternalLinksInline, FishPhotoInline]


@admin.register(Family)
class FamilyAdmin(admin.ModelAdmin):
    list_display = ("family_name",)
    search_fields = ("family_name",)


@admin.register(FishPhoto)
class FishPhotoAdmin(admin.ModelAdmin):
    list_display = ("fish", "added_by", "uploaded_at")
    list_filter = ("fish", "added_by")
    search_fields = ("fish__scientific_name", "description")


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = ("username", "email", "user_type", "is_staff", "is_active")
    list_filter = ("user_type", "is_active", "groups")
    search_fields = ("username", "email")
    ordering = ("username",)
    filter_horizontal = (
        "groups",
        "user_permissions",
    )

    fieldsets = (
        (None, {"fields": ("username", "password")}),
        ("Personal info", {"fields": ("email",)}),
        (
            "Permissions",
            {"fields": ("user_type", "is_active", "groups", "user_permissions")},
        ),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("username", "email", "password1", "password2", "user_type"),
            },
        ),
    )

    def get_readonly_fields(self, request, obj=None):
        if obj:  # editing an existing object
            return self.readonly_fields + ("user_type",)
        return self.readonly_fields


admin.site.register(CommonNames)
admin.site.register(ExternalLinks)
admin.site.register(PhotoDetails)
