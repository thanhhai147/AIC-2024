import os
import json

class Utils:
    def __init__(self):
        self.KEYFRAME_OUTPUT_PATH = '..\..\..\Dataset\\2024\\KeyFrame(360p)\\'
        self.FPS_PATH = 'E:\AIC2024\Dataset AIC\\2024 - round 1\\fps'

    def handleRecords(self, records):
        synthetic_id = []
        image_path = []
        record_frame_info = []
        record_ocr = []
        record_object_detection = []
        record_color_feature = []    
        record_space_recognition = []
        record_summary = []
        fps = []
        for record in records:
            record_keys = record.keys()
            synthetic_id.append(record['SyntheticId']) 
            image_path.append(os.path.join(record['FrameInfo']['FolderId'], record['FrameInfo']['VideoId'], record['FrameInfo']['FrameId'] + '.webp'))
            record_frame_info.append(record["FrameInfo"])
            record_ocr.append(record['OCR']) if 'OCR' in record_keys else record_ocr.append('')
            record_object_detection.append(record["ObjectDetection"]) if 'ObjectDetection' in record_keys else record_object_detection.append([])
            record_color_feature.append(record["ColorFeature"]) if 'ColorFeature' in record_keys else record_color_feature.append([])
            record_space_recognition.append(record["SpaceRecognition"]) if 'SpaceRecognition' in record_keys else record_space_recognition.append([])
            record_summary.append(record["Summary"]) if 'Summary' in record_keys else record_summary.append([])
            fps_file = record['FrameInfo']['FolderId']
            with open(os.path.join(self.FPS_PATH, f'{fps_file}.json')) as f:
                data = json.load(f)
                fps.append(data[f"{record['FrameInfo']['FolderId']}_{record['FrameInfo']['VideoId']}"])

        return synthetic_id, fps, image_path, record_frame_info, record_ocr, record_object_detection, record_color_feature, record_space_recognition, record_summary