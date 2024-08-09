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

class ClipFaiss:
    def __init__(self):
        os.environ["KMP_DUPLICATE_LIB_OK"]="TRUE"
        self.index = faiss.read_index('D:/AIC 2024/AIC-2024/Backend/AIC2024/AI_models/faiss_clipv2_cosine_ViT-B-16-SigLIP-512.bin')
        self.clipv2_tokenizer = open_clip.get_tokenizer('ViT-B-16-SigLIP-512')
        # device = "cuda" if torch.cuda.is_available() else "cpu"
        self.device = "cpu"
        self.feature_shape = 768
        self.clipv2_model, _, _ = open_clip.create_model_and_transforms('ViT-B-16-SigLIP-512', device=self.device, pretrained='webli')
        with open("D:/AIC 2024/AIC-2024/Dataset/2024/outputV2.json") as f:
            data = json.load(f)
        self.outputV2 = data 

    def search_textual_query(self, textual_query, limit):
        start_time = time.time() 
        text = self.clipv2_tokenizer([textual_query]).to(self.device)
        text_features = self.clipv2_model.encode_text(text)
        text_features /= text_features.norm(dim=-1, keepdim=True)
        text_features = text_features.cpu().detach().numpy().astype(np.float32)
        print("--- %s seconds ---" % (time.time() - start_time))
        start_time = time.time()
        scores, idx_image = self.index.search(text_features, k=int(limit))
        idx_image = idx_image.flatten()
        print("--- %s seconds ---" % (time.time() - start_time))
        return idx_image, scores

    def search_textual_image_query(self, textual_query, image_query, text_proportion, image_proportion, limit):
        start_time = time.time()
        text = self.clipv2_tokenizer(textual_query).to(self.device)
        text_features = self.clipv2_model.encode_text(text)
        text_features /= text_features.norm(dim=-1, keepdim=True)
        text_features = text_features.cpu().detach().numpy().astype(np.float32)

        image_features = np.sum([self.index.reconstruct(int(self.outputV2[img])) for img in image_query], axis=0) / len(image_query)

        combined_features = image_proportion * image_features + text_proportion * text_features
        print("--- %s seconds ---" % (time.time() - start_time))
        scores, idx_image = self.index.search(combined_features, k=int(limit))
        idx_image = idx_image.flatten()
        print("--- %s seconds ---" % (time.time() - start_time))
        return idx_image, scores

    def search_textual_image_reranking_query(self, textual_query, image_query, limit):
        start_time = time.time()
        idx_dic = {}
        feature_shape = self.feature_shape
        faiss_idx = faiss.IndexFlatIP(feature_shape)
        faiss_idx_reconstruct = []
        for i, idx in enumerate(image_query):
            idx_dic[i] = int(self.outputV2[idx])
            faiss_idx_reconstruct.append(self.index.reconstruct(int(self.outputV2[idx])))
        faiss_idx.add(np.array(faiss_idx_reconstruct))
        
        text = self.clipv2_tokenizer(textual_query).to(self.device)
        text_features = self.clipv2_model.encode_text(text)
        text_features /= text_features.norm(dim=-1, keepdim=True)
        text_features = text_features.cpu().detach().numpy().astype(np.float32)

        scores, idx_image = faiss_idx.search(text_features, k=int(limit))
        idx_image = idx_image.flatten()
        idx_image = [idx_dic[idx] for idx in idx_image]
        print("--- %s seconds ---" % (time.time() - start_time))
        return idx_image, scores