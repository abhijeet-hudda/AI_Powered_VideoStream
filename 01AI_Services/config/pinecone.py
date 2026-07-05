from pinecone import Pinecone

from config.settings import settings
from utils.logger import logger

logger.info("Connecting to Pinecone...")

pc = Pinecone(
    api_key=settings.PINECONE_API_KEY
)

index = pc.Index(settings.PINECONE_INDEX)

logger.info(f"Connected to Pinecone index: {settings.PINECONE_INDEX}")