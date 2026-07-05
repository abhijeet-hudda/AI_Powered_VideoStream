from langchain_pinecone import PineconeVectorStore

from config.pinecone import index
from models.embedding_model import embedding_model
from utils.logger import logger

logger.info("Initializing LangChain Pinecone Vector Store...")

vector_store = PineconeVectorStore(
    index=index,
    embedding=embedding_model,
)

logger.info("Vector Store initialized successfully.")