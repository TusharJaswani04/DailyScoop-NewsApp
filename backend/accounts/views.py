from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from news.models import UserProfile
from news.serializers import UserProfileSerializer

@api_view(['POST'])
def user_login(request):
    """
    Login user using Django's session authentication
    """
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response(
            {'error': 'Username and password required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    user = authenticate(request, username=username, password=password)
    if user:
        login(request, user)
        return Response({
            'message': 'Login successful',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        })
    else:
        return Response(
            {'error': 'Invalid credentials'}, 
            status=status.HTTP_401_UNAUTHORIZED
        )

@api_view(['POST'])
def user_logout(request):
    """
    Logout user and clear session
    """
    logout(request)
    return Response({'message': 'Logout successful'})

@api_view(['POST'])
def user_signup(request):
    """
    Register new user
    """
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not username or not email or not password:
        return Response(
            {'error': 'Username, email and password required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if User.objects.filter(username=username).exists():
        return Response(
            {'error': 'Username already exists'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if User.objects.filter(email=email).exists():
        return Response(
            {'error': 'Email already exists'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )
        
        # Login the user immediately after signup
        login(request, user)
        
        return Response({
            'message': 'Signup successful',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        })
    except Exception as e:
        return Response(
            {'error': f'Error creating user: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    """
    Get or update user profile
    """
    try:
        profile = UserProfile.objects(username=request.user.username).first()
        
        if request.method == 'GET':
            if not profile:
                return Response(
                    {'error': 'Profile not found'}, 
                    status=status.HTTP_404_NOT_FOUND
                )
            
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data)
        
        elif request.method == 'PUT':
            if not profile:
                # Create profile if it doesn't exist
                profile = UserProfile(
                    username=request.user.username,
                    email=request.user.email
                )
            
            # Update preferences
            preferred_categories = request.data.get('preferred_categories', [])
            preferred_sources = request.data.get('preferred_sources', [])
            
            profile.preferred_categories = preferred_categories
            profile.preferred_sources = preferred_sources
            profile.save()
            
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data)
            
    except Exception as e:
        return Response(
            {'error': f'Error handling profile: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_status(request):
    """
    Check if user is authenticated
    """
    return Response({
        'authenticated': True,
        'user': {
            'id': request.user.id,
            'username': request.user.username,
            'email': request.user.email
        }
    })