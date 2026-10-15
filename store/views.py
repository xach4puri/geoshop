from django.shortcuts import render
from rest_framework import viewsets, generics, filters, permissions
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import get_user_model
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer, UserRegisterSerializer, UserSerializer
from .permissions import IsOwnerOrAdminOrReadOnly
from django_filters import rest_framework as django_filters



User = get_user_model()


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [permissions.AllowAny]


class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ProductFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(
        field_name='category__name',
        lookup_expr='exact'
    )

    class Meta:
        model = Product
        fields = ['category', 'is_active']

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer

    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerOrAdminOrReadOnly
    ]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_class = ProductFilter

    search_fields = ['title', 'description']
    ordering_fields = ['price', 'created_at']

    def perform_create(self, serializer):
        product = serializer.save(owner=self.request.user)

        user = self.request.user
        if user.role == 'buyer':
            user.role = 'seller'
            user.save()