from django.urls import path
from .views import FishListCreateView, LocalNameListCreateView, FishPhotoListCreateView

urlpatterns = [
    path('', FishListCreateView.as_view(), name='fish_list_create'),
    path('local-names/', LocalNameListCreateView.as_view(), name='localname_list_create'),
    path('photos/', FishPhotoListCreateView.as_view(), name='fishphoto_list_create'),
]
