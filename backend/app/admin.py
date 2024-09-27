from django.contrib import admin
from .models import Fish, LocalNames, FishPhoto


class LocalNamesInline(admin.TabularInline):
    model = LocalNames
    extra = 1  # Show one extra field for adding new entries


class FishPhotoInline(admin.TabularInline):
    model = FishPhoto
    extra = 1  # Show one extra field for adding new photos


@admin.register(Fish)
class FishAdmin(admin.ModelAdmin):
    inlines = [LocalNamesInline, FishPhotoInline]
    list_display = ("common_name", "scientific_name")  # Display in admin list view
