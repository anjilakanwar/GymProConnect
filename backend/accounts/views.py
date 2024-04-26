from django.contrib.auth import authenticate
from django.views import decorators
from django.core import serializers

from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from rest_framework.decorators import permission_classes, api_view, authentication_classes

from .models import CustomUser
from .serializers import LoginSerializer, UserSerializer

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getUserRole(request):
    if request.method == 'GET':
        user = request.user
    
    return Response({"role" : user.role}, status=200)


class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(data="User Registered Successfully", status=status.HTTP_200_OK)
            
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def list(self, request):
        queryset = CustomUser.objects.only('id', 'first_name', 'last_name', 'email', 'role',)
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data)
    
    def get_permissions(self):
        if self.action == "get":
            return [AllowAny(),]
        
        if self.action == "create":
            return [AllowAny(),]
        
        return [AllowAny(),]
    
    
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
            'is_admin': user.is_superuser,
            'full_name': f"{user.first_name} {user.last_name}",
        })
    

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):    
        request.user.auth_token.delete()
        return Response({"msg" : "Logged Out"}, status=status.HTTP_200_OK)