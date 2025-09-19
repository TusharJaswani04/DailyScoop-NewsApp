from django.core.management.base import BaseCommand
from news.utils import fetch_all_rss_feeds

class Command(BaseCommand):
    help = 'Fetch news from RSS feeds and store in MongoDB'
    
    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('🔄 Starting news fetch...'))
        
        try:
            fetch_all_rss_feeds()
            self.stdout.write(self.style.SUCCESS('✅ News fetch completed successfully'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'❌ Error fetching news: {e}'))