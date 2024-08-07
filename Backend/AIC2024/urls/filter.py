from django.urls import path

from ..views.filter import FilterByObjectDetectionAPIView, FilterByOCRAPIView, FilterByIdAPIView, FilterByColorFeatureAPIView

urlpatterns = [
    path('filter-by-object-detection', FilterByObjectDetectionAPIView.as_view(), name='filter-object-detection'),
    path('filter-by-ocr', FilterByOCRAPIView.as_view(), name='filter-ocr'),
    path('filter-by-synthetic-id', FilterByIdAPIView.as_view(), name='filter-id'),
    path('filter-by-color-feature', FilterByColorFeatureAPIView.as_view(), name='filter-color-feature'),
]