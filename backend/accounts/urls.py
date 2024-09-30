from django.urls import path, include
from . import views


urlpatterns = [
    path("", views.home, name="home"),
    path("complete-profile/", views.complete_profile, name="complete_profile"),
]
