

# Register your models here.
from django.contrib import admin
from .models import  Question,Player,User

admin.site.register(Question)
admin.site.register(Player)
admin.site.register(User)