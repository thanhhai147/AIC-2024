from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework import status

class QueryAPIView(GenericAPIView):
    def get(self, request):

        params = request.query_params
        query_search_text = params["query"]

        

        return Response({
            "success": True,
            "query_search_text": query_search_text
        }, status=status.HTTP_200_OK)