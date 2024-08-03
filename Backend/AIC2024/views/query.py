from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework import status
from django.core.cache import cache
import glob
import os
import json

from ..AI_models.clip_faiss import search_textual_query
from ..AI_models.query_processing import Translation

from ..DB_models.frame_DAO import FrameDAO
from ..DB_models.utils import Utils

FULL_PATH_DATASET = 'D:/AIC 2024/AIC-2024'
translate = Translation()

FD = FrameDAO()
DB_utils = Utils()

class QueryAPIView(GenericAPIView):
    def get(self, request):
        params = request.query_params
        query_search_text = params['text']
        limit = params['limit']

        idx_image, scores = search_textual_query(translate(query_search_text), limit)

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
        image_path, record_frame_info, record_ocr, record_object_detection, record_color_feature, record_space_recognition =  DB_utils.handleRecords(records)
        
        cache.clear()
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
            status=status.HTTP_200_OK
        )