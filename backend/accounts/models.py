from datetime import date
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    phone_number = models.CharField(blank=True, unique=True, null=True, max_length=20)
    dob = models.DateField(blank=False, default=date(2000, 1, 1))
    address = models.TextField(max_length=50, default="")
    
    ROLE_CHOICES = (
        ('s_manager', 'Sales Manager'),
        ('receptionist', 'Receptionist'),
        ('manager', 'Manager'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, null=False, )
    
    profile_picture = models.ImageField(upload_to="images/profile_picture/", default="images/profile_picture/fallback.png")
    
    def __str__(self):
        return self.username
    
    def get_full_name(self) -> str:
        return f"{self.first_name} {self.last_name}"