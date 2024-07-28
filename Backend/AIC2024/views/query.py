from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework import status

class QueryAPIView(GenericAPIView):
    def get(self, request):
        params = request.query_params
        query_search_text = params['text']
        folder_id = params['folder']
        video_id = params['video']
        keyframe_id = params['keyframe']
        limit_id = params['limit']
        
        return Response(
            {
                "success": True,
            }, 
            status=status.HTTP_200_OK
        )