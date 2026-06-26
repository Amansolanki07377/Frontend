from rest_framework import serializers
from .models import book

class Bookserializer(serializers.ModelSerializer):
    class Meta:
        model = book
        fields = ("id","title","author","isbn","published_date")