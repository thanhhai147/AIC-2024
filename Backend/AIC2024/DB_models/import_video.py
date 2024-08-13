import os
from frame_DAO import FrameDAO

VIDEO_PATH = 'D:\\Dataset AIC\\2024\\Videos'

FD = FrameDAO()

for folder in os.listdir(VIDEO_PATH):
    folder_path = os.path.join(VIDEO_PATH, folder)
    for video in os.listdir(folder_path):
        video_path = os.path.join(folder_path, video)
        print(folder, video)
        FD.insertVideo(video_path)
            