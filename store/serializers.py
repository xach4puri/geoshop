from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Product, Category

User = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'role')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            role=validated_data.get('role', 'buyer')
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'role')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    category_name = serializers.ReadOnlyField(source='category.name')

    class Meta:
        model = Product
        fields = ('id', 'title', 'description', 'price', 'category', 'owner', 'is_active', 'created_at', 'updated_at','category_name',)