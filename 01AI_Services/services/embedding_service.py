from langchain_huggingface import HuggingFaceEmbeddings

from config.settings import settings
from utils.logger import logger


class EmbeddingService:
    """
    Service responsible for loading and generating text embeddings.
    """

    def __init__(self):
        logger.info("Loading embedding model...")

        self.embedding_model = HuggingFaceEmbeddings(
            model_name=settings.EMBEDDING_MODEL
        )

        logger.info("Embedding model loaded successfully.")

    def embed_query(self, text: str):
        """
        Generate embedding for a user query.
        """

        return self.embedding_model.embed_query(text)

    def embed_documents(self, documents: list[str]):
        """
        Generate embeddings for multiple documents.
        """

        return self.embedding_model.embed_documents(documents)


embedding_service = EmbeddingService()