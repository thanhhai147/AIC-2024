from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.generics import GenericAPIView
from rest_framework import status
import glob
import os
import json
from PIL import Image
import io

from ..AI_models.clip_faiss import ClipFaiss
from ..AI_models.query_processing import Translation

from ..DB_models.frame_DAO import FrameDAO
from ..DB_models.utils import Utils

FULL_PATH_DATASET = 'D:/AIC 2024/AIC-2024'
translate = Translation()

FD = FrameDAO()
DB_utils = Utils()
CF = ClipFaiss()

class QueryAPIView(GenericAPIView):
    def get(self, request):
        params = request.query_params
        query_search_text = params['text']
        limit = params['limit']

        idx_frame, scores = CF.search_textual_query(translate(query_search_text), limit)

        synthetic_id_list = []
        for idx in idx_frame:
            idx_split = idx.split("_")
            folder_id = idx_split[-3]
            video_id = idx_split[-2]
            frame_id = idx_split[-1]
            synthetic_id_list.append(f'{folder_id}_{video_id}_{frame_id}')
        
        records = FD.filterFrameBySyntheticId(synthetic_id_list)
        synthetic_id, image_path, record_frame_info, record_ocr, record_object_detection, record_color_feature, record_space_recognition, record_summary =  DB_utils.handleRecords(records)

        return Response(
            {
                "success": True,
                "syntheticId": synthetic_id,
                "imagePath": image_path,
                "frameInfo": record_frame_info,
                "ocr": record_ocr,
                "objectDetection": record_object_detection,
                "colorFeature": record_color_feature,
                "spaceRecognition": record_space_recognition,
                "summary": record_summary
            }, 
            status=status.HTTP_200_OK
        )
    
class QueryRelevanceAPIView(GenericAPIView):
    def post(self, request):
        body = request.data
        relevance_query = body['relevanceQuery']
        limit = body['limit']

        query_search_text = relevance_query['textual']
        query_search_image = relevance_query['image']
        text_proportion = int(relevance_query['proportion']['text']) / 100
        image_proportion = int(relevance_query['proportion']['image']) / 100

        idx_frame, scores = CF.search_textual_image_query(translate(query_search_text), query_search_image, text_proportion, image_proportion, limit)

        synthetic_id_list = []
        for idx in idx_frame:
            idx_split = idx.split("_")
            folder_id = idx_split[-3]
            video_id = idx_split[-2]
            frame_id = idx_split[-1]
            synthetic_id_list.append(f'{folder_id}_{video_id}_{frame_id}')
        
        records = FD.filterFrameBySyntheticId(synthetic_id_list)
        synthetic_id, image_path, record_frame_info, record_ocr, record_object_detection, record_color_feature, record_space_recognition, record_summary =  DB_utils.handleRecords(records)

        return Response(
            {
                "success": True,
                "syntheticId": synthetic_id,
                "imagePath": image_path,
                "frameInfo": record_frame_info,
                "ocr": record_ocr,
                "objectDetection": record_object_detection,
                "colorFeature": record_color_feature,
                "spaceRecognition": record_space_recognition,
                "summary": record_summary
            }, 
            status=status.HTTP_200_OK
        )

class QueryRerankingAPIView(GenericAPIView):
    def post(self, request):
        body = request.data
        image_query = body['imageQuery']
        text_query = body['textQuery']
        limit = body['limit']

        idx_frame, scores = CF.search_textual_image_reranking_query(translate(text_query), image_query, limit)

        synthetic_id_list = []
        for idx in idx_frame:
            idx_split = idx.split("_")
            folder_id = idx_split[-3]
            video_id = idx_split[-2]
            frame_id = idx_split[-1]
            synthetic_id_list.append(f'{folder_id}_{video_id}_{frame_id}')
        
        records = FD.filterFrameBySyntheticId(synthetic_id_list)
        synthetic_id, image_path, record_frame_info, record_ocr, record_object_detection, record_color_feature, record_space_recognition, record_summary =  DB_utils.handleRecords(records)

        return Response(
            {
                "success": True,
                "syntheticId": synthetic_id,
                "imagePath": image_path,
                "frameInfo": record_frame_info,
                "ocr": record_ocr,
                "objectDetection": record_object_detection,
                "colorFeature": record_color_feature,
                "spaceRecognition": record_space_recognition,
                "summary": record_summary
            }, 
            status=status.HTTP_200_OK
        )

class QueryImageAPIView(GenericAPIView):
    def get(self, request):
        params = request.query_params
        synthetic_id = params['synthetic-id']

        image_record = FD.getSingleImageFrame(synthetic_id)
 
        return HttpResponse(
            image_record.read(),
            status=status.HTTP_200_OK,
            content_type=image_record.content_type
        )

class QueryVideoAPIView(GenericAPIView):
    def get(self, request):
        params = request.query_params
        synthetic_id = params['synthetic-id']

        video_record = FD.getSingleVideo(synthetic_id)
 
        return HttpResponse(
            video_record.read(),
            status=status.HTTP_200_OK,
            content_type='video/mp4'
        ) 