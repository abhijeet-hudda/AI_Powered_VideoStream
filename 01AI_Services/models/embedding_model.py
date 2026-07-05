from langchain_huggingface import HuggingFaceEmbeddings

from config.settings import settings
from utils.logger import logger

logger.info("Loading embedding model...")

embedding_model = HuggingFaceEmbeddings(
    model_name=settings.EMBEDDING_MODEL
)

logger.info("Embedding model loaded successfully.")