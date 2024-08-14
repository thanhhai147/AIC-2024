import pymongo
import gridfs

connect_string = "mongodb://localhost:27017/"
client = pymongo.MongoClient(connect_string)

dbname = client['AIC2024']
image_dbname = client['AIC2024-Image']
video_dbname = client['AIC2024-Video']
frame = dbname['Frame']

class FrameDAO:
    def __init__(self, client=client, db=dbname, image_db = image_dbname, video_db = video_dbname, collection=frame):
        self.client = client
        self.db = db
        self.image_db = image_db
        self.video_db = video_db
        self.collection = collection
        self.image_fs = gridfs.GridFS(self.image_db)
        self.video_fs = gridfs.GridFS(self.video_db)

    def insertImageFrame(self, img_path):
        with open(img_path, 'rb') as image_file:
            path_split = img_path.split("\\")
            folder_id = path_split[-3]
            video_id = path_split[-2]
            frame_split = path_split[-1].split(".")
            frame_id = frame_split[0]
            frame_extension = frame_split[1]
            metadata = {
                "SyntheticId": f'{folder_id}_{video_id}_{frame_id}',
                "FrameInfo": {
                    "FolderId": folder_id,
                    "VideoId": video_id,
                    "FrameId": frame_id
                }
            }
            file_id = self.image_fs.put(image_file, filename=f'{folder_id}_{video_id}_{frame_id}.{frame_extension}', metadata=metadata, content_type=f"image/{frame_extension}")
        return file_id
    
    def getImageFrame(self, synthetic_id_list):
        query = {
            "metadata.SyntheticId": {
                "$in": synthetic_id_list
            }
        }
        return self.image_fs.find(query)

    def getSingleImageFrame(self, synthetic_id):
        query = {
            "metadata.SyntheticId": synthetic_id
        }
        data = self.image_fs.find_one(query)
        return data
    
    def insertVideo(self, video_path):
        with open(video_path, 'rb') as video_file:
            path_split = video_path.split("\\")
            folder_id = path_split[-2]
            video_split = path_split[-1].split(".")
            video_id = video_split[0].split("_")[-1]
            video_extention = video_split[1]
            metadata = {
                "SyntheticId": f'{folder_id}_{video_id}',
                "FrameInfo": {
                    "FolderId": folder_id,
                    "VideoId": video_id
                }
            }
            file_id = self.video_fs.put(video_file, filename=f'{folder_id}_{video_id}.{video_extention}', metadata=metadata, content_type=f"video/{video_extention}")
        return file_id

    def getVideo(self, synthetic_id_list):
        query = {
            "metadata.SyntheticId": {
                "$in": synthetic_id_list
            }
        }
        return self.video_fs.find(query)
    
    def getSingleVideo(self, synthetic_id):
        query = {
            "metadata.SyntheticId": synthetic_id
        }
        data = self.video_fs.find_one(query)
        return data

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
                    "$and": object_detection_query
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
                        "$all": color_feature
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
                        "$all": space_recognition
                    }
                }
            ]
        }
        return self.collection.find(query)
    
    def filterFrameBySummary(self, synthetic_id_list, summary_topic):
        query = {
            "$and": [
                {
                    "SyntheticId": {
                        "$in": synthetic_id_list
                    }
                },
                {
                    "Summary": {
                        "$all": summary_topic
                    }
                }
            ]
        }
        return self.collection.find(query)
    
    def filterFrameByAllModels(self, synthetic_id_list, ocr, object_detection, color_feature, space_recognition, summary_topic):

        and_query_list = []

        and_query_list.append({
            "SyntheticId": {
                "$in": synthetic_id_list
            }
        })

        if (ocr and ocr != ""):
            and_query_list.append({
                "$text": {
                    "$search": ocr
                }
            })

        if (object_detection and len(object_detection) > 0):
            object_detection_query = []
            for object in object_detection:

                object_query = {
                    "ObjectDetection": {
                        "$elemMatch": {
                            "Label": object["label"],
                            "Quantity": {},
                            "Proportion": {},
                            "Color": {}
                        }
                    }
                }

                if object["quantity"]["lower"]: object_query["ObjectDetection"]["$elemMatch"]["Quantity"]["$gte"] = int(object["quantity"]["lower"])
                if object["quantity"]["upper"]: object_query["ObjectDetection"]["$elemMatch"]["Quantity"]["$lte"] = int(object["quantity"]["upper"])
                if object["proportion"]["lower"]: object_query["ObjectDetection"]["$elemMatch"]["Proportion"]["$gte"] = float(object["proportion"]["lower"])
                if object["proportion"]["upper"]: object_query["ObjectDetection"]["$elemMatch"]["Proportion"]["$lte"] = float(object["proportion"]["upper"])
                if object["color"]: object_query["ObjectDetection"]["$elemMatch"]["Color"]["$in"] = list(object["color"])

                if not object_query["ObjectDetection"]["$elemMatch"]["Quantity"]: object_query["ObjectDetection"]["$elemMatch"].pop("Quantity")
                if not object_query["ObjectDetection"]["$elemMatch"]["Proportion"]: object_query["ObjectDetection"]["$elemMatch"].pop("Proportion")
                if not object_query["ObjectDetection"]["$elemMatch"]["Color"]: object_query["ObjectDetection"]["$elemMatch"].pop("Color")
                
                object_detection_query.append(object_query) 
            and_query_list.append({
                "$and": object_detection_query
            })
        
        if (color_feature and len(color_feature) > 0):
            and_query_list.append({
                "ColorFeature": {
                    "$all": color_feature
                }
            })
        
        if (space_recognition and len(space_recognition) > 0):
            and_query_list.append({
                "SpaceRecognition": {
                    "$all": space_recognition
                }
            })
        
        if (summary_topic and len(summary_topic) > 0):
            and_query_list.append({
                "Summary": {
                    "$all": summary_topic
                }
            })

        query = {
            "$and": and_query_list
        }

        query_records = self.collection.find(query)
        if (ocr and ocr != ""): query_records.sort( { "score": { "$meta": "textScore" } } )
        return query_records