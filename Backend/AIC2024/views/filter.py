from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework import status
from django.core.cache import cache
import glob
import os
import json

from ..DB_models.frame_DAO import FrameDAO
FD = FrameDAO()

from ..DB_models.utils import Utils
DB_utils = Utils()

class FilterByObjectDetectionAPIView(GenericAPIView):
    def post(self, request):
        body = request.data
        synthetic_id_list = body['syntheticId']
        object_detection = body['objectDetection']

        records = FD.filterFrameByObjectDetection(synthetic_id_list, object_detection)

        cache.clear()
        
        image_path, record_frame_info, record_ocr, record_object_detection, record_color_feature, record_space_recognition =  DB_utils.handleRecords(records)
        
        return Response(
            {
                "success": True,
                "imagePath": image_path,
                "frameInfo": record_frame_info,
                "ocr": record_ocr,
                "objectDetection": record_object_detection,
                "colorFeature": record_color_feature,
                "spaceRecognition": record_space_recognition
            }, 
            status=status.HTTP_200_OK,
            content_type="application/json"
        )