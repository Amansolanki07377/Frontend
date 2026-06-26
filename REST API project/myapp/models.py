from django.db import models

# Create your models here.
class book(models.Model):
    title = models.CharField(max_length=100,blank=True)
    author = models.CharField(max_length=100,blank=True)
    isbn = models.CharField(max_length=100,blank=True)
    published_date = models.DateField()
    def __str__(self):
        return self.title