from django.contrib.auth import authenticate

from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser

from .models import CustomUser
from .serializers import LoginSerializer, UserSerializer


class UserViewSet(viewsets.ModelViewSet):    
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(data="User Registered Successfully", status=status.HTTP_200_OK)
            
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get_permissions(self):
        if self.action == "get":
            return [IsAdminUser(),]
        
        if self.action == "create":
            return [AllowAny(),]
        
        return [IsAuthenticated(),]
    
    
class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username,
            'email': user.email,
            'is_admin': user.is_superuser
        })
    

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):    
        request.user.auth_token.delete()
        return Response({"msg" : "Logged Out"}, status=status.HTTP_200_OK)