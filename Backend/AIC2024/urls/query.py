from django.urls import path

from ..views.query import QueryAPIView, QueryRelevanceAPIView, QueryRerankingAPIView, QueryImageAPIView, QueryVideoAPIView

urlpatterns = [
    path('query', QueryAPIView.as_view(), name='query'),
    path('query-image', QueryImageAPIView.as_view(), name='query-image'),
    path('query-video', QueryVideoAPIView.as_view(), name='query-video'),
    path('query-relevance', QueryRelevanceAPIView.as_view(), name='query-relevance'),
    path('query-reranking', QueryRerankingAPIView.as_view(), name='query-reranking'),
]