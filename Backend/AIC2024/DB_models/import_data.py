import os
import glob
import json
from frame_DAO import FrameDAO

object_detection_path = 'D:/AIC 2024/AIC-2024/Dataset/2024/Object Detection'

FD = FrameDAO()

for json_file in os.listdir(object_detection_path):
    f = open(os.path.join(object_detection_path, json_file))
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
                print(f'{folder}_{video}_{frame}')
                FD.insertSingleFrame(frame_info, object_detection=data[folder][video][frame])
    f.close()