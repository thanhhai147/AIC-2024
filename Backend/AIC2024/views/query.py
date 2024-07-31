from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework import status
from django.core.cache import cache
import glob
import os
import json

from ..AI_models.clip_faiss import search_textual_query

FULL_PATH_DATASET = 'D:/AIC 2024/AIC-2024'

class QueryAPIView(GenericAPIView):
    def get(self, request):
        params = request.query_params
        query_search_text = params['text']
        limit = params['limit']

        idx_image, scores = search_textual_query(query_search_text, limit)

        cache.clear()

        with open('D:/AIC 2024/AIC-2024/Dataset/2024/output.json') as json_file:
            output_json = json.load(json_file)

        image_path = [os.path.join("../../..", output_json[f"{idx}"]) for idx in idx_image]
        
        return Response(
            {
                "success": True,
                "imagePath": image_path,
                "scores": scores[0]
            }, 
            status=status.HTTP_200_OK
        )