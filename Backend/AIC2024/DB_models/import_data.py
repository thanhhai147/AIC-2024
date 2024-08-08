import os
import json
from frame_DAO import FrameDAO

OBJECT_DETECTION_PATH = 'D:/AIC 2024/AIC-2024/Dataset/2024/Object Detection'
OCR_PATH = 'D:/AIC 2024/AIC-2024/Dataset/2024/OCR'
COLOR_PATH = 'D:/AIC 2024/AIC-2024/Dataset/2024/Color Features'
SPACE_PATH = 'D:/AIC 2024/AIC-2024/Dataset/2024/Space Recognition'

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

for json_file in os.listdir(COLOR_PATH):
    f = open(os.path.join(COLOR_PATH, json_file))
    data = json.load(f)
    for folder in data:
        videos = data[folder].keys()
        for video in videos:
            frames = data[folder][video].keys()
            for frame in frames:
                synthetic_id = f'{folder}_{video}_{frame}'

                color_feature_list = set()
                for cell, color_list in data[folder][video][frame].items():
                    for color in color_list:
                        color_feature_list.add(color)
                import_data[synthetic_id]['ColorFeature'] = list(color_feature_list)
    f.close()

for json_file in os.listdir(OCR_PATH):
    f = open(os.path.join(OCR_PATH, json_file), encoding='utf-8')
    data = json.load(f)
    for folder in data:
        videos = data[folder].keys()
        for video in videos:
            frames = data[folder][video].keys()
            for frame in frames:
                synthetic_id = f'{folder}_{video}_{frame}'

                color_feature_list = set()
                for key, paragraphs in data[folder][video][frame].items():
                    import_data[synthetic_id]['OCR'] = " ".join(paragraphs)
    f.close()

for json_file in os.listdir(SPACE_PATH):
    f = open(os.path.join(SPACE_PATH, json_file))
    data = json.load(f)
    for folder in data:
        videos = data[folder].keys()
        for video in videos:
            frames = data[folder][video].keys()
            for frame in frames:
                synthetic_id = f'{folder}_{video}_{frame}'

                space_reg_list = data[folder][video][frame]
                import_data[synthetic_id]['SpaceRecognition'] = list(space_reg_list)
    f.close()

for synthetic_id, data in import_data.items():
    data['SyntheticId'] = synthetic_id
    print(synthetic_id)
    FD.insertSingleFrame(data)