import os
import json
from frame_DAO import FrameDAO

OBJECT_DETECTION_PATH = 'D:/Dataset AIC/2024 - Round 1/Object Detection'
OCR_PATH = 'D:/Dataset AIC/2024 - Round 1/OCR'
COLOR_PATH = 'D:/Dataset AIC/2024 - Round 1/Color Feature'
SPACE_PATH = 'D:/Dataset AIC/2024 - Round 1/Semantic Concept'

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
                video_id = video.split("_")[1]
                frame_info = {
                    'FolderId': folder,
                    'VideoId': video_id,
                    'FrameId': frame
                }
                synthetic_id = f'{folder}_{video_id}_{frame}'

                object_detection_list = []
                for detected_objects in data[folder][video][frame].values():
                    for object_label, object_detection_data in detected_objects.items():
                        object_detection_list.append({
                            "Label": object_label.lower(),
                            "Quantity": int(object_detection_data["quantity"]),
                            "Proportion": float(object_detection_data["area_ratio"]),
                            "Color": [color.lower() for color in object_detection_data["colors"]]
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
                        color_feature_list.add(color.lower())
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

                for key, paragraphs in data[folder][video][frame].items():
                    import_data[synthetic_id]['OCR'] = " ".join(paragraphs).lower()
                    print(" ".join(paragraphs).lower())
    f.close()

# for json_file in os.listdir(SPACE_PATH):
#     f = open(os.path.join(SPACE_PATH, json_file))
#     data = json.load(f)
#     for folder in data:
#         videos = data[folder].keys()
#         for video in videos:
#             frames = data[folder][video].keys()
#             for frame in frames:
#                 synthetic_id = f'{folder}_{video}_{frame}'

#                 space_reg_list = data[folder][video][frame]
#                 import_data[synthetic_id]['SpaceRecognition'] = list(space_reg_list)
#     f.close()

# for synthetic_id, data in import_data.items():
#     data['SyntheticId'] = synthetic_id
#     print(synthetic_id)
#     FD.insertSingleFrame(data)