from rest_framework import permissions


class IsOwnerOrAdminOrReadOnly(permissions.BasePermission):
  """Позволяет редактировать/удалять товар только его владельцу или администратору."""

  def has_object_permission(self, request, view, obj):
    
    if request.method in permissions.SAFE_METHODS:
      return True

    
    if request.user.is_staff or request.user.is_superuser:
      return True

  
    if hasattr(request.user, 'profile') and request.user.profile.role == 'admin':
      return True
    if getattr(request.user, 'role', '') == 'admin':
      return True

    
    return obj.owner == request.user