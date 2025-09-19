from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.user_login, name='user_login'),
    path('logout/', views.user_logout, name='user_logout'),
    path('signup/', views.user_signup, name='user_signup'),
    path('profile/', views.user_profile, name='user_profile'),
    path('status/', views.get_user_status, name='get_user_status'),
]