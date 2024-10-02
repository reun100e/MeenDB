from django.contrib import admin
from .models import Fish, LocalName, FishPhoto

# Register your models here.

admin.site.register(Fish)
admin.site.register(LocalName)
admin.site.register(FishPhoto)
