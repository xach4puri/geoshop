from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.text import slugify

class User(AbstractUser):
    class Role(models.TextChoices):
        USER = 'user', 'User'
        SELLER = 'seller', 'Seller'
        MODERATOR = 'moderator', 'Moderator'
        ADMIN = 'admin', 'Admin'

    role = models.CharField(
        max_length=20, 
        choices=Role.choices, 
        default=Role.USER
    )

    def __str__(self):
        return f"{self.username} ({self.role})"


class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(blank=True)
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    def __str__(self):
        return self.name


class Product(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products', null=True, blank=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
