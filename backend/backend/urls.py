from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    # auth
    path("api-auth/", include("rest_framework.urls")),
    path("api-auth/", include("drf_social_oauth2.urls", namespace="drf")),
    path("api-auth/", include("accounts.urls")),
]
