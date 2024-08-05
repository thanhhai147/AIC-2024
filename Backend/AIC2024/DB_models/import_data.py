import os
import glob
import json
from frame_DAO import FrameDAO

OBJECT_DETECTION_PATH = 'D:/AIC 2024/AIC-2024/Dataset/2024/Object Detection'
OCR_FILE_PATH = 'D:/AIC 2024/AIC-2024/Dataset/2024/OCR/output_ocr.json'

FD = FrameDAO()

import_data = {}

for json_file in os.listdir(OBJECT_DETECTION_PATH):
    f = open(os.path.join(OBJECT_DETECTION_PATH, json_file))
    data = json.load(f)
    for folder in data:
        videos = data[folder].keys()
        for video in videos:
            frames = data[folder][video].keys()
            for frame in frames:
                frame_info = {
                    'FolderId': folder,
                    'VideoId': video,
                    'FrameId': frame
                }
                synthetic_id = f'{folder}_{video}_{frame}'

                object_detection_list = []
                for label, statistics in data[folder][video][frame].items():
                    object_detection_list.append({
                        "Label": label,
                        "Quantity": statistics[0],
                        "Proportion": statistics[1]
                    })
                import_data[synthetic_id] = {
                    'FrameInfo': frame_info,
                    'ObjectDetection': object_detection_list
                }
    f.close()

with open(OCR_FILE_PATH) as f:
    data = json.load(f)
    for folder in data:
        for folder_key, video in folder.items():
            for video_key, frame in video.items():
                for frame_id, ocr_paragraphs in frame.items():
                    synthetic_id = f'{folder_key}_{video_key}_{frame_id}'
                    import_data[synthetic_id]['OCR'] = ' '.join(ocr_paragraphs['paragraphs'])
                    # if(synthetic_id in import_data):
                        
                    # else:
                    #     import_data[synthetic_id] = {
                    #         'OCR': ' '.join(ocr_paragraphs['paragraphs'])
                    #     }

for synthetic_id, data in import_data.items():
    data['SyntheticId'] = synthetic_id
    data['ColorFeature'] = []
    data['SpaceRecognition'] = []
    print(synthetic_id)
    FD.insertSingleFrame(data)