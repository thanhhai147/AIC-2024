from django.urls import path

from ..views.query import QueryAPIView, QueryRelevanceAPIView

urlpatterns = [
    path('query', QueryAPIView.as_view(), name='query'),
    path('query-relevance', QueryRelevanceAPIView.as_view(), name='query-relevance'),
]