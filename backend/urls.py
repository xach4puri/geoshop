from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from store.views import ProductViewSet, CategoryViewSet, RegisterView, UserProfileView

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'categories', CategoryViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Auth endpoints
    path('api/auth/register/', RegisterView.as_dict() if hasattr(RegisterView, 'as_dict') else RegisterView.as_view(), name='register'),
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # JWT Login
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),     # JWT Refresh
    path('api/auth/me/', UserProfileView.as_view(), name='user_profile'),

    # API endpoints
    path('api/', include(router.urls)),
]