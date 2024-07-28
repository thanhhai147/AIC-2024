from django.urls import path

from ..views.query import QueryAPIView

urlpatterns = [
    path('query', QueryAPIView.as_view(), name='query'),
]