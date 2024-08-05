from django.urls import path

from ..views.filter import FilterByObjectDetectionAPIView, FilterByOCRAPIView, FilterByIdAPIView

urlpatterns = [
    path('filter-by-object-detection', FilterByObjectDetectionAPIView.as_view(), name='filter-object-detection'),
    path('filter-by-ocr', FilterByOCRAPIView.as_view(), name='filter-ocr'),
    path('filter-by-synthetic-id', FilterByIdAPIView.as_view(), name='filter-id'),
]