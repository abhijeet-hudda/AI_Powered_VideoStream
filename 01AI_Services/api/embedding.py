from fastapi import APIRouter, HTTPException

from schemas.embedding_schema import EmbeddingRequest
from services.embedding_service import embedding_service
from utils.logger import logger

router = APIRouter(
    prefix="/embedding",
    tags=["Embedding"]
)


@router.post("/")
def generate_embedding(request: EmbeddingRequest):
    try:
        logger.info("Generating embedding...")

        embedding = embedding_service.embed_query(request.text)

        logger.info("Embedding generated successfully.")

        return {
            "dimension": len(embedding),
            "embedding": embedding
        }

    except Exception as e:
        logger.exception("Failed to generate embedding.")

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )