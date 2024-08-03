from django.urls import path

from ..views.filter import FilterByObjectDetectionAPIView

urlpatterns = [
    path('filter-by-object-detection', FilterByObjectDetectionAPIView.as_view(), name='filter'),
]