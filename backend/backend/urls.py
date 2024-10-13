from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from api.views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/user/register/", UserCreate.as_view(), name="user_create"),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path("accounts/", include("allauth.urls")),
    path("callback/", google_login_callback, name="callback"),
    path("api/auth/user/", UserDetailView.as_view(), name="user_detail"),
    path("api/google/validate_token/", validate_google_token, name="validate_token"),
    path("api/", include("fish.urls")),
    path("api/active-user/", get_active_user, name="active_user"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
