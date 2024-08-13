import os
from frame_DAO import FrameDAO

IMAGE_FRAME_PATH = 'D:\\Dataset AIC\\2024\\KeyFrame(360p)'

FD = FrameDAO()

for folder in os.listdir(IMAGE_FRAME_PATH):
    folder_path = os.path.join(IMAGE_FRAME_PATH, folder)
    for video in os.listdir(folder_path):
        video_path = os.path.join(folder_path, video)
        for frame in os.listdir(video_path):
            frame_path = os.path.join(video_path, frame)
            print(folder, video, frame)
            FD.insertImageFrame(frame_path)