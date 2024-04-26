from django.urls import path
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

from . import views

urlpatterns = [
    path("login/", views.CustomAuthToken.as_view(), name="login"),
    path("logout/", views.LogoutView.as_view(), name="logout"),
    path("user_role/", views.getUserRole, name="user_role")
]

router = routers.DefaultRouter()

router.register(r'users', views.UserViewSet)
urlpatterns += router.urls