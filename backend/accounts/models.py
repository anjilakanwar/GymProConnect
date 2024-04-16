from datetime import date
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    phone_number = models.IntegerField(blank=False, unique=True, default="0000000000")
    dob = models.DateField(blank=False, default=date(2000, 1, 1))
    address = models.TextField(max_length=50, default="")
    
    def __str__(self):
        return self.username