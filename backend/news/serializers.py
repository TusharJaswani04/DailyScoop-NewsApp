from rest_framework import serializers
from .models import NewsArticle, UserProfile

class NewsArticleSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    title = serializers.CharField()
    summary = serializers.CharField()
    link = serializers.URLField()
    source = serializers.CharField()
    category = serializers.CharField()
    published = serializers.DateTimeField()
    image_url = serializers.URLField()
    author = serializers.CharField()
    tags = serializers.ListField(child=serializers.CharField())
    created_at = serializers.DateTimeField()

class UserProfileSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    preferred_categories = serializers.ListField(child=serializers.CharField())
    preferred_sources = serializers.ListField(child=serializers.CharField())
    avatar_url = serializers.URLField(required=False)