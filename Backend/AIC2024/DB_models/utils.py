import os

class Utils:
    def __init__(self):
        self.KEYFRAME_OUTPUT_PATH = '..\..\..\Dataset\\2024\\KeyFrame(360p)\\'

    def handleRecords(self, records):
        image_path = []
        record_frame_info = []
        record_ocr = []
        record_object_detection = []
        record_color_feature = []    
        record_space_recognition = []
        for record in records:
            image_path.append(os.path.join(self.KEYFRAME_OUTPUT_PATH, record['FrameInfo']['FolderId'], record['FrameInfo']['VideoId'], record['FrameInfo']['FrameId'] + '.webp'))
            record_frame_info.append(record["FrameInfo"])
            record_ocr.append(record['OCR'])
            record_object_detection.append(record["ObjectDetection"])
            record_color_feature.append(record["ColorFeature"])
            record_space_recognition.append(record["SpaceRecognition"])
        return image_path, record_frame_info, record_ocr, record_object_detection, record_color_feature, record_space_recognition
