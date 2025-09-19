from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from news.models import UserProfile

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """
    Automatically create a UserProfile in MongoDB when a Django User is created
    """
    if created:
        try:
            UserProfile.objects.create(
                username=instance.username,
                email=instance.email,
                preferred_categories=[],
                preferred_sources=[]
            )
            print(f"✅ MongoDB UserProfile created for {instance.username}")
        except Exception as e:
            print(f"❌ Error creating UserProfile: {e}")

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    """
    Update MongoDB profile when Django User is updated
    """
    try:
        profile = UserProfile.objects(username=instance.username).first()
        if profile:
            profile.email = instance.email
            profile.save()
            print(f"✅ MongoDB UserProfile updated for {instance.username}")
    except Exception as e:
        print(f"❌ Error updating UserProfile: {e}")