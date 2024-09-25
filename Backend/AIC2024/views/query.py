from rest_framework.response import Response
from django.http import FileResponse
from rest_framework.generics import GenericAPIView
from rest_framework import status
import os

from ..AI_models.clip_faiss import ClipFaiss

from ..DB_models.frame_DAO import FrameDAO
from ..DB_models.utils import Utils

FULL_PATH_FRAME_DATASET = "D:/Dataset AIC/2024 - Round 1/KeyFrame(360p)"
FULL_PATH_VIDEO_DATASET = "D:/Dataset AIC/2024 - Round 1/Compressed with audio"

FD = FrameDAO()
DB_utils = Utils()
CF = ClipFaiss()

class QueryAPIView(GenericAPIView):
    def get(self, request):
        params = request.query_params
        query_search_text = params['text']
        limit = params['limit']
        bert_proportion = params['bert']
        clip_proportion = params['clip']
        bert_proportion = int(bert_proportion) / 100
        clip_proportion = int(clip_proportion) / 100

        idx_frame, scores = CF.search_textual_query(query_search_text, limit, bert_proportion, clip_proportion)
        
        records = FD.filterFrameBySyntheticId(idx_frame)
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
            status=status.HTTP_200_OK
        )
    
class QueryRelevanceAPIView(GenericAPIView):
    def post(self, request):
        body = request.data
        relevance_query = body['relevanceQuery']
        limit = body['limit']
        bert_proportion = body['bertProportion']
        clip_proportion = body['clipProportion']

        query_search_text = relevance_query['textual']
        query_search_image = relevance_query['image']
        text_proportion = int(relevance_query['proportion']['text']) / 100
        image_proportion = int(relevance_query['proportion']['image']) / 100
        bert_proportion = int(bert_proportion) / 100
        clip_proportion = int(clip_proportion) / 100

        idx_frame, scores = CF.search_textual_image_query(query_search_text, query_search_image, text_proportion, image_proportion, limit, bert_proportion, clip_proportion)
        
        records = FD.filterFrameBySyntheticId(idx_frame)
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
            status=status.HTTP_200_OK
        )

class QueryRerankingAPIView(GenericAPIView):
    def post(self, request):
        body = request.data
        image_query = body['imageQuery']
        text_query = body['textQuery']
        limit = body['limit']
        bert_proportion = body['bertProportion']
        clip_proportion = body['clipProportion']
        bert_proportion = int(bert_proportion) / 100
        clip_proportion = int(clip_proportion) / 100

        idx_frame, scores = CF.search_textual_image_reranking_query(text_query, image_query, limit, bert_proportion, clip_proportion)
        
        records = FD.filterFrameBySyntheticId(idx_frame)
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
            status=status.HTTP_200_OK
        )

class QueryImageAPIView(GenericAPIView):
    def get(self, request):
        params = request.query_params
        synthetic_id = params['synthetic-id']
        folder_id, video_id, frame_id = synthetic_id.split("_")
        img_path = os.path.join(FULL_PATH_FRAME_DATASET, folder_id, f'{folder_id}_{video_id}', f'{frame_id}.webp')
        return FileResponse(open(img_path, 'rb'), content_type='image/webp')

class QueryVideoAPIView(GenericAPIView):
    def get(self, request):
        params = request.query_params
        synthetic_id = params['synthetic-id']
        start_time = params['start-time']
        end_time = params['end-time']
        folder_id, _, video_id = synthetic_id.split("_")
        video_path = os.path.join(FULL_PATH_VIDEO_DATASET, folder_id, f'{folder_id}_{video_id}.mkv')
        return FileResponse(open(video_path, 'rb'), content_type='video/mkv')