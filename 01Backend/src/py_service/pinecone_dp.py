import os
from pinecone import Pinecone

# Initialize Pinecone
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
index = pc.Index(os.getenv("PINECONE_INDEX"))

EMBEDDING_DIM = 384


def upsert_video_vector(
    id: str,
    embedding: list,
    metadata: dict | None = None
):
    if not id:
        raise ValueError("Missing id")

    if not isinstance(embedding, list) or len(embedding) != EMBEDDING_DIM:
        raise ValueError("Invalid embedding")

    index.upsert(
        records=[
            {
                "id": str(id),
                "values": embedding,
                "metadata": metadata or {},
            }
        ]
    )


def semantic_search(
    vector: list,
    video_id: str | None = None,
    top_k: int = 10
):
    if not isinstance(vector, list) or len(vector) != EMBEDDING_DIM:
        raise ValueError("Invalid search vector")

    query = {
        "vector": vector,
        "top_k": top_k,
        "include_metadata": True,
    }

    if video_id:
        query["filter"] = {"videoId": video_id}

    result = index.query(**query)

    return result.get("matches", [])


def delete_video_vector(video_id: str):
    if not video_id:
        return

    index.delete(ids=[str(video_id)])
