from django.urls import path
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

from .views import UserViewSet, LogoutView, CustomAuthToken

urlpatterns = [
    path("login/", CustomAuthToken.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
]

router = routers.DefaultRouter()

router.register(r'users', UserViewSet)
urlpatterns += router.urls