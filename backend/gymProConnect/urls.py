from django.contrib import admin
from django.urls import include, path

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path("__debug__/", include("debug_toolbar.urls")),
    
    path("admin/", admin.site.urls),
    
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),
    
    path('accounts/', include('accounts.urls')),
    path('', include('equipment.urls')),
]