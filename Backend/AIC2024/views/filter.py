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

        if(len(synthetic_id_list) == 0 or len(object_detection) == 0):
            return Response(
                {
                    "success": False
                },
                status=status.HTTP_200_OK,
                content_type="application/json"
            )

        records = FD.filterFrameByObjectDetection(synthetic_id_list, object_detection)

        cache.clear()
        
        synthetic_id, image_path, record_frame_info, record_ocr, record_object_detection, record_color_feature, record_space_recognition =  DB_utils.handleRecords(records)
        
        return Response(
            {
                "success": True,
                "syntheticId": synthetic_id,
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
    
class FilterByOCRAPIView(GenericAPIView):
    def post(self, request):
        body = request.data
        synthetic_id_list = body['syntheticId']
        ocr = body['ocr']

        if(len(synthetic_id_list) == 0 or len(ocr) == 0):
            return Response(
                {
                    "success": False
                },
                status=status.HTTP_200_OK,
                content_type="application/json"
            )

        records = FD.filterFrameByOCR(synthetic_id_list, ocr)

        cache.clear()
        
        synthetic_id, image_path, record_frame_info, record_ocr, record_object_detection, record_color_feature, record_space_recognition =  DB_utils.handleRecords(records)
        
        return Response(
            {
                "success": True,
                "syntheticId": synthetic_id,
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

class FilterByIdAPIView(GenericAPIView):
    def post(self, request):
        body = request.data
        synthetic_id_list = body['syntheticId']

        if(len(synthetic_id_list) == 0):
            return Response(
                {
                    "success": False
                },
                status=status.HTTP_200_OK,
                content_type="application/json"
            )

        records = FD.filterFrameBySyntheticId(synthetic_id_list)

        cache.clear()
        
        synthetic_id, image_path, record_frame_info, record_ocr, record_object_detection, record_color_feature, record_space_recognition =  DB_utils.handleRecords(records)
        
        return Response(
            {
                "success": True,
                "syntheticId": synthetic_id,
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
    
class FilterByColorFeatureAPIView(GenericAPIView):
    def post(self, request):
        body = request.data
        synthetic_id_list = body['syntheticId']
        color_feature = body['colorFeature']

        if(len(synthetic_id_list) == 0 or len(color_feature) == 0):
            return Response(
                {
                    "success": False
                },
                status=status.HTTP_200_OK,
                content_type="application/json"
            )

        records = FD.filterFrameByColorFeature(synthetic_id_list, color_feature)

        cache.clear()
        
        synthetic_id, image_path, record_frame_info, record_ocr, record_object_detection, record_color_feature, record_space_recognition =  DB_utils.handleRecords(records)
        
        return Response(
            {
                "success": True,
                "syntheticId": synthetic_id,
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