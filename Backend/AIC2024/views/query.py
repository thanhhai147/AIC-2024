from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework import status
from django.core.cache import cache
import glob
import os
import json

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

        idx_image, scores = CF.search_textual_query(translate(query_search_text), limit)

        with open('D:/AIC 2024/AIC-2024/Dataset/2024/output.json') as json_file:
            output_json = json.load(json_file)

        synthetic_id_list = []
        for idx in idx_image:
            path = output_json[f"{idx}"]
            path_split = path.split("\\")
            folder_id = path_split[-3]
            video_id = path_split[-2]
            frame_id = path_split[-1].split(".")[0]
            synthetic_id_list.append(f'{folder_id}_{video_id}_{frame_id}')
        
        records = FD.filterFrameBySyntheticId(synthetic_id_list)
        synthetic_id, image_path, record_frame_info, record_ocr, record_object_detection, record_color_feature, record_space_recognition, record_summary =  DB_utils.handleRecords(records)
        
        cache.clear()
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

        idx_image, scores = CF.search_textual_image_query(translate(query_search_text), query_search_image, text_proportion, image_proportion, limit)

        with open('D:/AIC 2024/AIC-2024/Dataset/2024/output.json') as json_file:
            output_json = json.load(json_file)

        synthetic_id_list = []
        for idx in idx_image:
            path = output_json[f"{idx}"]
            path_split = path.split("\\")
            folder_id = path_split[-3]
            video_id = path_split[-2]
            frame_id = path_split[-1].split(".")[0]
            synthetic_id_list.append(f'{folder_id}_{video_id}_{frame_id}')
        
        records = FD.filterFrameBySyntheticId(synthetic_id_list)
        synthetic_id, image_path, record_frame_info, record_ocr, record_object_detection, record_color_feature, record_space_recognition, record_summary =  DB_utils.handleRecords(records)
        
        cache.clear()
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

        idx_image, scores = CF.search_textual_image_reranking_query(translate(text_query), image_query, limit)

        with open('D:/AIC 2024/AIC-2024/Dataset/2024/output.json') as json_file:
            output_json = json.load(json_file)

        synthetic_id_list = []
        for idx in idx_image:
            path = output_json[f"{idx}"]
            path_split = path.split("\\")
            folder_id = path_split[-3]
            video_id = path_split[-2]
            frame_id = path_split[-1].split(".")[0]
            synthetic_id_list.append(f'{folder_id}_{video_id}_{frame_id}')
        
        records = FD.filterFrameBySyntheticId(synthetic_id_list)
        synthetic_id, image_path, record_frame_info, record_ocr, record_object_detection, record_color_feature, record_space_recognition, record_summary =  DB_utils.handleRecords(records)
        
        cache.clear()
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