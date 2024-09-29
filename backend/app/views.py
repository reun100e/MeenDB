from django.shortcuts import render, get_object_or_404

from .models import Fish, FishPhoto, LocalNames
from .serializers import (
    FishSerializer,
    FishPhotoSerializer,
    LocalNamesSerializer,
    UserSerializer,
)
from rest_framework import status
from rest_framework.response import Response
from rest_framework import viewsets, generics
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes

from django.contrib.auth.models import User


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def fish_list(request):
    fishes = Fish.objects.all()  # Retrieve all fish entries
    return render(request, "fish/index.html", {"fishes": fishes})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def fish_detail(request, fish_id):
    fish = get_object_or_404(Fish, id=fish_id)
    return render(request, "fish/fish_detail.html", {"fish": fish})


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        if User.objects.filter(username=username).exists():
            return Response(
                {"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST
            )
        user = User.objects.create_user(username=username, password=password)
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            },
            status=status.HTTP_201_CREATED,
        )


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh_token")
            if refresh_token is None:
                return Response(
                    {"error": "Refresh token is required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(
                {"success": "User logged out successfully"}, status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
