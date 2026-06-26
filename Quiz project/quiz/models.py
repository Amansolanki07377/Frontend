from django.db import models

# Create your models here.
from django.db import models

class Question(models.Model):
    question = models.CharField(max_length=200)
    option1 = models.CharField(max_length=100)
    option2 = models.CharField(max_length=100)
    option3 = models.CharField(max_length=100)
    option4 = models.CharField(max_length=100)
    answer = models.CharField(max_length=100)

    def __str__(self):
        return self.question
    
class Player(models.Model):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    score = models.IntegerField(default=0)

    def __str__(self):
        return self.name
    
class User(models.Model):
    fname = models.CharField(max_length=100)
    lname = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100) 
    usertype = models.CharField(max_length=50, default='player')

    def __str__(self):
        return self.fname + " " + self.email

