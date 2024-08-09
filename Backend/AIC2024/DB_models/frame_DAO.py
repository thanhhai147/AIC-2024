import pymongo
from django.conf import settings

connect_string = "mongodb://localhost:27017/"
client = pymongo.MongoClient(connect_string)

dbname = client['AIC2024']
frame = dbname['Frame']

class FrameDAO:
    def __init__(self, client=client, db=dbname, collection=frame):
        self.client = client
        self.db = db
        self.collection = collection

    def insertSingleFrame(self, frame):
        inserted_id = self.collection.insert_one(frame)
        return inserted_id
    
    def insertMultipleFrame(self, frame_info_list, ocr_list=[], object_detection_list=[], color_feature_list=[], space_recognition_list=[]):
        insert_frame_list = []
        for frame_info, ocr, object_detection, color_feature, space_recognition in zip(frame_info_list, ocr_list, object_detection_list, color_feature_list, space_recognition_list):
            insert_frame_list.append(self.process_frame(frame_info, ocr, object_detection, color_feature, space_recognition))
        inserted_id = self.collection.insert_many(insert_frame_list)
        return inserted_id
    
    def filterFrameByObjectDetection(self, synthetic_id_list, object_detection):
        object_detection_query = []
        for object in object_detection:

            object_query = {
                "ObjectDetection": {
                    "$elemMatch": {
                        "Label": object["label"],
                        "Quantity": {},
                        "Proportion": {}
                    }
                }
            }

            if object["quantity"]["lower"]: object_query["ObjectDetection"]["$elemMatch"]["Quantity"]["$gte"] = int(object["quantity"]["lower"])
            if object["quantity"]["upper"]: object_query["ObjectDetection"]["$elemMatch"]["Quantity"]["$lte"] = int(object["quantity"]["upper"])
            if object["proportion"]["lower"]: object_query["ObjectDetection"]["$elemMatch"]["Proportion"]["$gte"] = float(object["proportion"]["lower"])
            if object["proportion"]["upper"]: object_query["ObjectDetection"]["$elemMatch"]["Proportion"]["$lte"] = float(object["proportion"]["upper"])

            if not object_query["ObjectDetection"]["$elemMatch"]["Quantity"]: object_query["ObjectDetection"]["$elemMatch"].pop("Quantity")
            if not object_query["ObjectDetection"]["$elemMatch"]["Proportion"]: object_query["ObjectDetection"]["$elemMatch"].pop("Proportion")
            
            object_detection_query.append(object_query) 

        query = {
            "$and": [
                {
                    "SyntheticId": {
                        "$in": synthetic_id_list
                    }
                },
                {
                    "$or": object_detection_query
                }
            ]
        }
        return self.collection.find(query)
    
    def filterFrameBySyntheticId(self, synthetic_id_list):
        query = {
            "SyntheticId": {
                "$in": synthetic_id_list
            }
        }
        return self.collection.find(query)
    
    def filterFrameByOCR(self, synthetic_id_list, ocr):
        query = {
            "$and": [
                {
                    "SyntheticId": {
                        "$in": synthetic_id_list
                    }
                },
                {
                    "$text": {
                        "$search": ocr
                    }
                }
            ]
        }
        return self.collection.find(query).sort( { "score": { "$meta": "textScore" } } )
    
    def filterFrameByColorFeature(self, synthetic_id_list, color_feature):
        query = {
            "$and": [
                {
                    "SyntheticId": {
                        "$in": synthetic_id_list
                    }
                },
                {
                    "ColorFeature": {
                        "$in": color_feature
                    }
                }
            ]
        }
        return self.collection.find(query)
    
    def filterFrameBySpaceRecognition(self, synthetic_id_list, space_recognition):
        query = {
            "$and": [
                {
                    "SyntheticId": {
                        "$in": synthetic_id_list
                    }
                },
                {
                    "SpaceRecognition": {
                        "$in": space_recognition
                    }
                }
            ]
        }
        return self.collection.find(query)