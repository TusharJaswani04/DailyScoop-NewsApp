import feedparser
import time
from datetime import datetime
from .models import NewsArticle

def safe_parse_published(entry):
    try:
        if hasattr(entry, 'published_parsed') and entry.published_parsed:
            return datetime.fromtimestamp(time.mktime(entry.published_parsed))
    except Exception as e:
        print(f"ERROR: Invalid date {e}")
    return None

def extract_image(entry):
    if 'media_content' in entry:
        return entry.media_content[0].get('url', '')
    elif 'media_thumbnail' in entry:
        return entry.media_thumbnail[0].get('url', '')
    return ''

def extract_tags(entry):
    return [tag['term'] for tag in getattr(entry, 'tags', []) if hasattr(entry, 'tags')]

def fetch_and_store_rss_feed(feed_url, source_name="Unknown", category_name="General"):
    """
    Fetch and store RSS feed data using the logic from 2.txt
    """
    feed = feedparser.parse(feed_url)
    
    for entry in feed.entries:
        try:
            title = getattr(entry, 'title', '').strip()
            link = getattr(entry, 'link', '').strip()
            summary = getattr(entry, 'summary', '')[:500]
            author = getattr(entry, 'author', '')
            published = safe_parse_published(entry)
            image_url = extract_image(entry)
            tags = extract_tags(entry)
            
            if not title or not link:
                continue
                
            # Check if article already exists
            if NewsArticle.objects(link=link).first():
                continue
                
            # Create new article
            article = NewsArticle(
                title=title,
                summary=summary,
                link=link,
                source=source_name,
                category=category_name,
                published=published,
                image_url=image_url,
                author=author,
                tags=tags,
                rss_url=feed_url
            )
            article.save()
            print(f"✅ SAVED: {source_name} - {category_name}: {title}")
            
        except Exception as e:
            print(f"❌ ERROR: Failed saving article {title}: {e}")

# RSS Feed URLs for Indian news sources
RSS_FEEDS = {
    'Times of India': {
        'General': 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',
        'India': 'https://timesofindia.indiatimes.com/rssfeeds/296589292.cms',
        'Sports': 'https://timesofindia.indiatimes.com/rssfeeds/4719148.cms',
        'Technology': 'https://timesofindia.indiatimes.com/rssfeeds/66949542.cms',
        'Business': 'https://timesofindia.indiatimes.com/rssfeeds/1898055.cms',
        'Entertainment': 'https://timesofindia.indiatimes.com/rssfeeds/1081479906.cms',
        'world': 'https://timesofindia.indiatimes.com/rssfeeds/296589292.cms',
        'politics': 'https://timesofindia.indiatimes.com/rssfeeds/296589292.cms',
        'Health': 'https://timesofindia.indiatimes.com/rssfeeds/296589292.cms',
    },
    'NDTV': {
        'General': 'https://feeds.feedburner.com/NDTV-LatestNews',
        'India': 'https://feeds.feedburner.com/ndtvnews-india',
        'Sports': 'https://feeds.feedburner.com/ndtvsports',
        'Technology': 'https://feeds.feedburner.com/gadgets360-latest',
        'Business': 'https://feeds.feedburner.com/ndtvprofit-latest',
        'Entertainment': 'https://feeds.feedburner.com/ndtv-entertainment',
        'World': 'https://feeds.feedburner.com/ndtvnews-world',
        'Politics': 'https://feeds.feedburner.com/ndtvnews-politics',
        'Health': 'https://feeds.feedburner.com/ndtvnews-health',
    },
    'Indian Express': {
        'General': 'https://indianexpress.com/feed/',
        'Technology': 'https://indianexpress.com/section/technology/feed/',
        'Sports': 'https://indianexpress.com/section/sports/feed/',
        'Business': 'https://indianexpress.com/section/business/feed/',
        'Entertainment': 'https://indianexpress.com/section/entertainment/feed/',
        'World': 'https://indianexpress.com/section/world/feed/',
        'Politics': 'https://indianexpress.com/section/politics/feed/',
        'India': 'https://indianexpress.com/section/india/feed/',
        'Health': 'https://indianexpress.com/section/lifestyle/health/feed/',
        
        
    }
}

def fetch_all_rss_feeds():
    """
    Fetch news from all configured RSS feeds
    """
    for source, categories in RSS_FEEDS.items():
        for category, feed_url in categories.items():
            print(f"🔄 Fetching {source} - {category}...")
            fetch_and_store_rss_feed(feed_url, source, category)