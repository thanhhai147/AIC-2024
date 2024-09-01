from pymilvus import connections
from pymilvus import FieldSchema, CollectionSchema, DataType, Collection
import numpy as np

connections.connect("default", host="your-milvus-host", port="19530")

# Define the schema
fields = [
    FieldSchema(name="id", dtype=DataType.INT64, is_primary=True),
    FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=768)
]
schema = CollectionSchema(fields, description="example collection")
collection = Collection(name="example_collection", schema=schema)

# Insert data
dim = 768
ids = [i for i in range(num_vectors)]
entities = [ids, vectors]
collection.insert(entities)