from django.urls import path
from . import views

urlpatterns = [
    path('news/', views.get_news, name='get_news'),
    path('news/category/<str:category>/', views.get_news_by_category, name='get_news_by_category'),
    path('news/for-you/', views.get_personalized_news, name='get_personalized_news'),
    path('news/<str:article_id>/', views.get_article_detail, name='get_article_detail'),
    path('news/search/', views.search_news, name='search_news'),
    path('refresh-news/', views.refresh_news, name='refresh_news'),
]