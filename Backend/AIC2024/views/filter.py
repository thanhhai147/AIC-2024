from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework import status
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
         
        synthetic_id, fps, image_path, record_frame_info, record_ocr, record_object_detection, record_color_feature, record_space_recognition, record_summary =  DB_utils.handleRecords(records)
        
        return Response(
            {
                "success": True,
                "syntheticId": synthetic_id,
                "fps": fps,
                "imagePath": image_path,
                "frameInfo": record_frame_info,
                "ocr": record_ocr,
                "objectDetection": record_object_detection,
                "colorFeature": record_color_feature,
                "spaceRecognition": record_space_recognition,
                "summary": record_summary
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

        synthetic_id, fps, image_path, record_frame_info, record_ocr, record_object_detection, record_color_feature, record_space_recognition, record_summary =  DB_utils.handleRecords(records)
        
        return Response(
            {
                "success": True,
                "syntheticId": synthetic_id,
                "fps": fps,
                "imagePath": image_path,
                "frameInfo": record_frame_info,
                "ocr": record_ocr,
                "objectDetection": record_object_detection,
                "colorFeature": record_color_feature,
                "spaceRecognition": record_space_recognition,
                "summary": record_summary
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

        synthetic_id, fps, image_path, record_frame_info, record_ocr, record_object_detection, record_color_feature, record_space_recognition, record_summary =  DB_utils.handleRecords(records)
        
        return Response(
            {
                "success": True,
                "syntheticId": synthetic_id,
                "fps": fps,
                "imagePath": image_path,
                "frameInfo": record_frame_info,
                "ocr": record_ocr,
                "objectDetection": record_object_detection,
                "colorFeature": record_color_feature,
                "spaceRecognition": record_space_recognition,
                "summary": record_summary
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
  
        synthetic_id, fps, image_path, record_frame_info, record_ocr, record_object_detection, record_color_feature, record_space_recognition, record_summary =  DB_utils.handleRecords(records)
        
        return Response(
            {
                "success": True,
                "syntheticId": synthetic_id,
                "fps": fps,
                "imagePath": image_path,
                "frameInfo": record_frame_info,
                "ocr": record_ocr,
                "objectDetection": record_object_detection,
                "colorFeature": record_color_feature,
                "spaceRecognition": record_space_recognition,
                "summary": record_summary
            }, 
            status=status.HTTP_200_OK,
            content_type="application/json"
        )
    
class FilterBySpaceRecognitionAPIView(GenericAPIView):
    def post(self, request):
        body = request.data
        synthetic_id_list = body['syntheticId']
        space_recognition = body['spaceRecognition']

        if(len(synthetic_id_list) == 0 or len(space_recognition) == 0):
            return Response(
                {
                    "success": False
                },
                status=status.HTTP_200_OK,
                content_type="application/json"
            )

        records = FD.filterFrameBySpaceRecognition(synthetic_id_list, space_recognition)

        synthetic_id, fps, image_path, record_frame_info, record_ocr, record_object_detection, record_color_feature, record_space_recognition, record_summary =  DB_utils.handleRecords(records)
        
        return Response(
            {
                "success": True,
                "syntheticId": synthetic_id,
                "fps": fps,
                "imagePath": image_path,
                "frameInfo": record_frame_info,
                "ocr": record_ocr,
                "objectDetection": record_object_detection,
                "colorFeature": record_color_feature,
                "spaceRecognition": record_space_recognition,
                "summary": record_summary
            }, 
            status=status.HTTP_200_OK,
            content_type="application/json"
        )
    
class FilterBySummaryAPIView(GenericAPIView):
    def post(self, request):
        body = request.data
        synthetic_id_list = body['syntheticId']
        summary_topic = body['summaryTopic']

        if(len(synthetic_id_list) == 0 or len(summary_topic) == 0):
            return Response(
                {
                    "success": False
                },
                status=status.HTTP_200_OK,
                content_type="application/json"
            )

        records = FD.filterFrameBySummary(synthetic_id_list, summary_topic)
        
        synthetic_id, fps, image_path, record_frame_info, record_ocr, record_object_detection, record_color_feature, record_space_recognition, record_summary =  DB_utils.handleRecords(records)
        
        return Response(
            {
                "success": True,
                "syntheticId": synthetic_id,
                "fps": fps,
                "imagePath": image_path,
                "frameInfo": record_frame_info,
                "ocr": record_ocr,
                "objectDetection": record_object_detection,
                "colorFeature": record_color_feature,
                "spaceRecognition": record_space_recognition,
                "summary": record_summary
            }, 
            status=status.HTTP_200_OK,
            content_type="application/json"
        )
    
class FilterByAllModelsAPIView(GenericAPIView):
    def post(self, request):
        body = request.data
        synthetic_id_list = body['syntheticId']
        ocr = body['ocr']
        object_detection = body['objectDetection']
        color_feature = body['colorFeature']
        space_recognition = body['spaceRecognition']
        summary_topic = body['summaryTopic']
        
        records = FD.filterFrameByAllModels(synthetic_id_list, ocr,object_detection, color_feature, space_recognition, summary_topic)
        synthetic_id, fps, image_path, record_frame_info, record_ocr, record_object_detection, record_color_feature, record_space_recognition, record_summary =  DB_utils.handleRecords(records)

        return Response(
            {
                "success": True,
                "syntheticId": synthetic_id,
                "fps": fps,
                "imagePath": image_path,
                "frameInfo": record_frame_info,
                "ocr": record_ocr,
                "objectDetection": record_object_detection,
                "colorFeature": record_color_feature,
                "spaceRecognition": record_space_recognition,
                "summary": record_summary
            }, 
            status=status.HTTP_200_OK,
            content_type="application/json"
        )
    
class FilterAllByAllModelsAPIView(GenericAPIView):
    def post(self, request):
        body = request.data
        ocr = body['ocr']
        object_detection = body['objectDetection']
        color_feature = body['colorFeature']
        space_recognition = body['spaceRecognition']
        summary_topic = body['summaryTopic']
        
        records = FD.filterAllFrameByAllModels(ocr, object_detection, color_feature, space_recognition, summary_topic)
        synthetic_id, fps, image_path, record_frame_info, record_ocr, record_object_detection, record_color_feature, record_space_recognition, record_summary =  DB_utils.handleRecords(records)

        return Response(
            {
                "success": True,
                "syntheticId": synthetic_id,
                "fps": fps,
                "imagePath": image_path,
                "frameInfo": record_frame_info,
                "ocr": record_ocr,
                "objectDetection": record_object_detection,
                "colorFeature": record_color_feature,
                "spaceRecognition": record_space_recognition,
                "summary": record_summary
            }, 
            status=status.HTTP_200_OK,
            content_type="application/json"
        )