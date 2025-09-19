
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from rest_framework.pagination import PageNumberPagination
from .models import NewsArticle, UserProfile
from .serializers import NewsArticleSerializer
import requests
from django.conf import settings

class NewsPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100

@api_view(['GET'])
def get_news(request):
    """
    Get all news articles with optional category and search filters
    """
    category = request.GET.get('category')
    search_query = request.GET.get('search')

    # Build MongoDB query
    query_filter = {}
    if category:
        query_filter['category__icontains'] = category
    if search_query:
        query_filter['title__icontains'] = search_query

    # Get articles from MongoDB
    articles = NewsArticle.objects(**query_filter).order_by('-published', '-created_at')

    # Paginate results
    paginator = NewsPagination()
    paginated_articles = paginator.paginate_queryset(list(articles), request)

    serializer = NewsArticleSerializer(paginated_articles, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
def get_news_by_category(request, category):
    """
    Get news articles by specific category
    """
    articles = NewsArticle.objects(category__icontains=category).order_by('-published', '-created_at')

    paginator = NewsPagination()
    paginated_articles = paginator.paginate_queryset(list(articles), request)

    serializer = NewsArticleSerializer(paginated_articles, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_personalized_news(request):
    """
    Get personalized news for logged-in users based on preferences
    """
    try:
        # Get user profile from MongoDB
        profile = UserProfile.objects(username=request.user.username).first()

        if not profile or not profile.preferred_categories:
            # If no preferences, return general news
            articles = NewsArticle.objects().order_by('-published', '-created_at')
        else:
            # Filter by user preferences
            query_filter = {}
            if profile.preferred_categories:
                query_filter['category__in'] = profile.preferred_categories
            if profile.preferred_sources:
                query_filter['source__in'] = profile.preferred_sources

            articles = NewsArticle.objects(**query_filter).order_by('-published', '-created_at')

        paginator = NewsPagination()
        paginated_articles = paginator.paginate_queryset(list(articles), request)

        serializer = NewsArticleSerializer(paginated_articles, many=True)
        return paginator.get_paginated_response(serializer.data)

    except Exception as e:
        return Response(
            {'error': f'Error fetching personalized news: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def get_article_detail(request, article_id):
    """
    Get single article with Gemini API summary
    """
    try:
        article = NewsArticle.objects(id=article_id).first()
        if not article:
            return Response(
                {'error': 'Article not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )

        # Generate summary using Gemini API
        summary = generate_gemini_summary(article.summary or article.title)

        serializer = NewsArticleSerializer(article)
        data = serializer.data
        data['gemini_summary'] = summary

        return Response(data)

    except Exception as e:
        return Response(
            {'error': f'Error fetching article: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

def generate_gemini_summary(text):
    """
    Generate summary using Gemini API
    """
    try:
        import google.generativeai as genai

        genai.configure(api_key="AIzaSyDcbAO1BuLD2S2EKcNW1m1_srY0VjMU3Xg")
        model = genai.GenerativeModel('models/gemini-1.5-flash-latest')

        prompt = f"Summarize the following news article in 3-4 lines: {text}"
        response = model.generate_content(prompt)

        return response.text
    except Exception as e:
        print(f"❌ Gemini API Error: {e}")
        return "Summary unavailable at the moment."

@api_view(['POST'])
def refresh_news(request):
    """
    Refresh news by fetching from RSS feeds and APIs
    """
    try:
        from .utils import fetch_all_rss_feeds
        fetch_all_rss_feeds()

        return Response({'message': 'News refreshed successfully'})
    except Exception as e:
        return Response(
            {'error': f'Error refreshing news: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def search_news(request):
    """
    Search news articles by keyword
    """
    query = request.GET.get('q', '')
    if not query:
        return Response({'error': 'Search query required'}, status=status.HTTP_400_BAD_REQUEST)

    # Search in title and summary
    articles = NewsArticle.objects(
        title__icontains=query
    ).order_by('-published', '-created_at')

    # Also search in summary if no results in title
    if not articles:
        articles = NewsArticle.objects(
            summary__icontains=query
        ).order_by('-published', '-created_at')

    paginator = NewsPagination()
    paginated_articles = paginator.paginate_queryset(list(articles), request)

    serializer = NewsArticleSerializer(paginated_articles, many=True)
    return paginator.get_paginated_response(serializer.data)
