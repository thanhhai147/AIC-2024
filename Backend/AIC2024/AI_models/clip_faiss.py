import os
import faiss
import numpy as np
import open_clip
import torch.nn as nn
from transformers import BertModel, BertTokenizer
import json
import time
import warnings
import torch

# Suppress all warnings
warnings.filterwarnings("ignore")

class ExtendedBert(nn.Module):
    def __init__(self, bert_model_name='bert-base-uncased'):
        super(ExtendedBert, self).__init__()
        self.bert = BertModel.from_pretrained(bert_model_name)
        self.linear = nn.Linear(self.bert.config.hidden_size, 768)  # Adjust output size as needed

    def forward(self, input_ids, attention_mask):
        last_hidden_state = self.bert(input_ids=input_ids, attention_mask=attention_mask).last_hidden_state
        feature_vector = self.linear(last_hidden_state[:, 0, :])  # Use the [CLS] token representation
        return feature_vector

class ClipFaiss:
    def __init__(self):
        os.environ["KMP_DUPLICATE_LIB_OK"]="TRUE"
        self.index = faiss.read_index("D:/Dataset AIC/2024 - Round 1/Faiss/faiss_clipv2_cosine.bin")
        self.clipv2_tokenizer = open_clip.get_tokenizer('ViT-B-16-SigLIP-512')
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        print(self.device)
        self.feature_shape = 768
        self.clipv2_model, _, _ = open_clip.create_model_and_transforms('ViT-B-16-SigLIP-512', device=self.device, pretrained='webli')
        with open("D:/Dataset AIC/2024 - Round 1/Faiss/output.json") as f:
            data = json.load(f)
        self.output = data
        with open("D:/Dataset AIC/2024 - Round 1/Faiss/outputV2.json") as f:
            data = json.load(f)
        self.outputV2 = data 
        self.tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
        self.model = ExtendedBert().to(self.device)

    def extract_features_single(self, text):
        input_ids = self.tokenizer.encode_plus(
            text, 
            add_special_tokens=True, 
            padding=True, 
            truncation=True, 
            return_tensors="pt"
        ).to(self.device)
        feature_vector = self.model(input_ids['input_ids'], input_ids['attention_mask'])
        return feature_vector
    
    def embedding(self, textual_query, bert_proportion, clip_proportion):
        text_clip = self.clipv2_tokenizer([textual_query]).to(self.device)
        text_clip_feature = self.clipv2_model.encode_text(text_clip)
        text_clip_feature /= text_clip_feature.norm(dim=-1, keepdim=True)
        text_clip_feature = text_clip_feature.cpu().detach().numpy().astype(np.float32)

        text_bert_feature = self.extract_features_single(textual_query)
        text_bert_feature /= text_bert_feature.norm(dim=-1, keepdim=True)
        text_bert_feature = text_bert_feature.cpu().detach().numpy().astype(np.float32)

        return bert_proportion * text_bert_feature + clip_proportion * text_clip_feature

    def search_textual_query(self, textual_query, limit, bert_proportion, clip_proportion):
        start_time = time.time() 
        combined_features = self.embedding(textual_query, bert_proportion, clip_proportion)
        print("--- %s seconds ---" % (time.time() - start_time))
        scores, idx_image = self.index.search(combined_features, k=int(limit))
        idx_image = idx_image.flatten()
        idx_frame = [self.output[f"{idx}"] for idx in idx_image ]
        print("--- %s seconds ---" % (time.time() - start_time))
        return idx_frame, scores

    def search_textual_image_query(self, textual_query, image_query, text_proportion, image_proportion, limit, bert_proportion, clip_proportion):
        start_time = time.time()
        text_features = self.embedding(textual_query, bert_proportion, clip_proportion)

        image_features = np.sum([self.index.reconstruct(int(self.outputV2[img])) for img in image_query], axis=0) / len(image_query)

        combined_features = image_proportion * image_features + text_proportion * text_features
        print("--- %s seconds ---" % (time.time() - start_time))
        scores, idx_image = self.index.search(combined_features, k=int(limit))
        idx_image = idx_image.flatten()
        idx_frame = [self.output[f"{idx}"] for idx in idx_image ]
        print("--- %s seconds ---" % (time.time() - start_time))
        return idx_frame, scores

    def search_textual_image_reranking_query(self, textual_query, image_query, limit, bert_proportion, clip_proportion):
        start_time = time.time()
        idx_dic = {}
        feature_shape = self.feature_shape
        faiss_idx = faiss.IndexFlatIP(feature_shape)
        faiss_idx_reconstruct = []
        for i, idx in enumerate(image_query):
            idx_dic[i] = int(self.outputV2[idx])
            faiss_idx_reconstruct.append(self.index.reconstruct(int(self.outputV2[idx])))
        faiss_idx.add(np.array(faiss_idx_reconstruct))
        
        text_features = self.embedding(textual_query, bert_proportion, clip_proportion)

        scores, idx_image = faiss_idx.search(text_features, k=int(limit))
        idx_image = idx_image.flatten()
        idx_image = [idx_dic[idx] for idx in idx_image]
        idx_frame = [self.output[f"{idx}"] for idx in idx_image ]
        print("--- %s seconds ---" % (time.time() - start_time))
        return idx_frame, scores