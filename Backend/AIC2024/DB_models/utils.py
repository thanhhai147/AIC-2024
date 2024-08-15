import os
import tempfile
from moviepy.editor import VideoFileClip

class Utils:
    def __init__(self):
        self.KEYFRAME_OUTPUT_PATH = '..\..\..\Dataset\\2024\\KeyFrame(360p)\\'

    def handleRecords(self, records):
        synthetic_id = []
        image_path = []
        record_frame_info = []
        record_ocr = []
        record_object_detection = []
        record_color_feature = []    
        record_space_recognition = []
        record_summary = []
        for record in records:
            synthetic_id.append(record['SyntheticId'])
            image_path.append(os.path.join(record['FrameInfo']['FolderId'], record['FrameInfo']['VideoId'], record['FrameInfo']['FrameId'] + '.webp'))
            record_frame_info.append(record["FrameInfo"])
            record_ocr.append(record['OCR'])
            record_object_detection.append(record["ObjectDetection"])
            record_color_feature.append(record["ColorFeature"])
            record_space_recognition.append(record["SpaceRecognition"])
            # record_summary.append(record["Summary"])  
        return synthetic_id, image_path, record_frame_info, record_ocr, record_object_detection, record_color_feature, record_space_recognition, record_summary
    
    def cutVideo(self, gridfs_video, start_time, end_time):
        with tempfile.NamedTemporaryFile(suffix='.mp4', delete=False) as temp_video_file:
            temp_video_file.write(gridfs_video.read())
            temp_video_path = temp_video_file.name
        video = VideoFileClip(temp_video_path)
        cut_video = video.subclip(start_time, end_time)
        return temp_video_path, cut_video