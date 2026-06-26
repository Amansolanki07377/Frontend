from django.shortcuts import render
from rest_framework import generics
from .models import book
from .serializers import BookSerializer


# Create your views here.
class BookListCreate(generics.ListCreateAPIView):
    queryset = book.objects.all()
    serializer_class = BookSerializer

class BookDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = book.objects.all()
    seriazlizer_class =  rest_framework
