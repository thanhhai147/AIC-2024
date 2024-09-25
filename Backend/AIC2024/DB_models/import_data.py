import os
import json
from tqdm import tqdm
from frame_DAO import FrameDAO

OBJECT_DETECTION_PATH = "D:/AIC2024/Dataset AIC/2024 - round 1/Object Detection"
OCR_PATH = "D:/AIC2024/Dataset AIC/2024 - round 1/OCR"
COLOR_PATH = "D:/AIC2024/Dataset AIC/2024 - round 1/Color Feature"
SPACE_PATH = "D:/AIC2024/Dataset AIC/2024 - round 1/Semantic Concept"
SUMMARY_PATH = "D:/AIC2024/Dataset AIC/2024 - round 1/Summary"

FD = FrameDAO()

import_data = {}

summary_data = {}

# for json_file in tqdm(os.listdir(SUMMARY_PATH)):
#     f = open(os.path.join(SUMMARY_PATH, json_file))
#     data = json.load(f)
#     folder_id = json_file.split(".")[0]
#     summary_data[folder_id] = data[folder_id]
#     f.close()

for json_file in tqdm(os.listdir(OBJECT_DETECTION_PATH)):
    f = open(os.path.join(OBJECT_DETECTION_PATH, json_file))
    data = json.load(f)
    folder_name = json_file.split(".")[0]
    for folder_data in data:
        folder = folder_data[folder_name]
        for video in folder:
            frames = folder[video].keys()
            for frame in frames:
                video_id = video.split("_")[1]
                frame_info = {
                    'FolderId': folder_name,
                    'VideoId': video_id,
                    'FrameId': frame
                }
                synthetic_id = f'{folder_name}_{video_id}_{frame}'

                object_detection_list = []
                for object_label, object_detection_data in folder[video][frame].items():
                    object_detection_list.append({
                        "Label": object_label.lower(),
                        "Quantity": int(object_detection_data["quantity"]),
                        "Proportion": float(object_detection_data["area_ratio"]),
                        "Color": [color.lower() for color in object_detection_data["colors"]]
                    })
                import_data[synthetic_id] = {
                    'FrameInfo': frame_info,
                    'ObjectDetection': object_detection_list,
                    # 'Summary': summary_data[folder_name][f'{folder_name}_{video_id}']
                }
    f.close()

for json_file in tqdm(os.listdir(COLOR_PATH)):
    f = open(os.path.join(COLOR_PATH, json_file))
    data = json.load(f)
    folder_name = json_file.split(".")[0]
    folder = data[folder_name]
    for video in folder:
        frames = folder[video].keys()
        for frame in frames:
            synthetic_id = f'{folder_name}_{video}_{frame}'

            color_feature_list = set()
            for cell, color_list in folder[video][frame].items():
                for color in color_list:
                    color_feature_list.add(color.lower())
            if synthetic_id not in import_data:
                import_data[synthetic_id] = {}
            import_data[synthetic_id]['ColorFeature'] = list(color_feature_list)
    f.close()
        
for json_file in tqdm(os.listdir(OCR_PATH)):
    f = open(os.path.join(OCR_PATH, json_file), encoding='utf-8')
    data = json.load(f)
    folder_name = json_file.split(".")[0]
    folder = data[folder_name]
    for video in folder:
        video_id = video.split("_")[1]
        frames = folder[video].keys()
        for frame in frames:
            synthetic_id = f'{folder_name}_{video_id}_{frame}'
            if synthetic_id not in import_data:
                import_data[synthetic_id] = {}
            import_data[synthetic_id]['OCR'] = " ".join(folder[video][frame]).lower()
    f.close()

for json_file in tqdm(os.listdir(SPACE_PATH)):
    f = open(os.path.join(SPACE_PATH, json_file))
    data = json.load(f)
    folder_name = json_file.split(".")[0]
    folder = data[folder_name]
    for video in folder:
        frames = folder[video].keys()
        for frame in frames:
            synthetic_id = f'{folder_name}_{video}_{frame}'

            space_reg_list = folder[video][frame]
            if synthetic_id not in import_data:
                import_data[synthetic_id] = {}
            import_data[synthetic_id]['SpaceRecognition'] = list(space_reg_list)
    f.close()

for synthetic_id, data in tqdm(import_data.items()):
    data['SyntheticId'] = synthetic_id
    FD.insertSingleFrame(data)