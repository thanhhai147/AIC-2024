import os
import glob
import faiss
import numpy as np
from tqdm import tqdm
import open_clip
import torch
import json
import cv2 
import matplotlib.pyplot as plt
from PIL import Image 
import time


# with open('output.json') as json_file:
#     data_json = json.load(json_file)

def search_textual_query(textual_query, limit):
    start_time = time.time()
    os.environ["KMP_DUPLICATE_LIB_OK"]="TRUE"

    index = faiss.read_index('D:/AIC 2024/AIC-2024/Backend/AIC2024/AI_models/faiss_clipv2_cosine_ViT-B-16.bin')
    clipv2_tokenizer = open_clip.get_tokenizer('ViT-B-16')

    # device = "cuda" if torch.cuda.is_available() else "cpu"
    device = "cpu"
    clipv2_model, _, _ = open_clip.create_model_and_transforms('ViT-B-16', device=device, pretrained='datacomp_xl_s13b_b90k')

    text = clipv2_tokenizer([textual_query]).to(device)
    text_features = clipv2_model.encode_text(text)
    text_features /= text_features.norm(dim=-1, keepdim=True)
    text_features = text_features.cpu().detach().numpy().astype(np.float32)
    print("--- %s seconds ---" % (time.time() - start_time))
    start_time = time.time()
    scores, idx_image = index.search(text_features, k=int(limit))
    idx_image = idx_image.flatten()
    print("--- %s seconds ---" % (time.time() - start_time))
    return idx_image, scores