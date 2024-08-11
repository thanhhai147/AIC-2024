from django.urls import path

from ..views.filter import FilterByObjectDetectionAPIView, FilterByOCRAPIView, FilterByIdAPIView, FilterByColorFeatureAPIView, FilterBySpaceRecognitionAPIView, FilterBySummaryAPIView, FilterByAllModelsAPIView

urlpatterns = [
    path('filter-by-object-detection', FilterByObjectDetectionAPIView.as_view(), name='filter-object-detection'),
    path('filter-by-ocr', FilterByOCRAPIView.as_view(), name='filter-ocr'),
    path('filter-by-synthetic-id', FilterByIdAPIView.as_view(), name='filter-id'),
    path('filter-by-color-feature', FilterByColorFeatureAPIView.as_view(), name='filter-color-feature'),
    path('filter-by-space-recognition', FilterBySpaceRecognitionAPIView.as_view(), name='filter-space-recognition'),
    path('filter-by-summary', FilterBySummaryAPIView.as_view(), name='filter-summary'),
    path('filter-by-all-models', FilterByAllModelsAPIView.as_view(), name='filter-all-models'),
]