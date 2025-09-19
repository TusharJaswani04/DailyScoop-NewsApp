from mongoengine import Document, StringField, DateTimeField, URLField, ListField
from datetime import datetime

class NewsArticle(Document):
    title = StringField(required=True, max_length=500)
    summary = StringField(max_length=2000)
    link = URLField(required=True, unique=True)
    source = StringField(max_length=200)
    category = StringField(max_length=100)
    published = DateTimeField(required=False, null=True)
    image_url = URLField()
    author = StringField(max_length=200)
    tags = ListField(StringField(max_length=50))
    rss_url = URLField()
    created_at = DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'news_articles',
        'indexes': [
            'link',
            'category', 
            'source',
            '-published',
            '-created_at',
            ('title', 'summary')  # Text index for search
        ],
        'ordering': ['-published', '-created_at']
    }
    
    def __str__(self):
        return f"{self.title} - {self.source}"

class UserProfile(Document):
    username = StringField(required=True, unique=True, max_length=150)
    email = StringField(max_length=254)
    preferred_categories = ListField(StringField(max_length=100))
    preferred_sources = ListField(StringField(max_length=200))
    avatar_url = StringField()
    created_at = DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'user_profiles',
        'indexes': ['username']
    }
    
    def __str__(self):
        return f"{self.username} Profile"