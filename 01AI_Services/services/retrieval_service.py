from services.vector_store import vector_store
from utils.logger import logger


class RetrievalService:

    def __init__(self):

        logger.info("Initializing Retriever...")

        self.retriever = vector_store.as_retriever(
            search_type="similarity",
            search_kwargs={
                "k": 4
            }
        )

        logger.info("Retriever initialized successfully.")

    def retrieve(self, question: str):

        logger.info(f"Retrieving context for: {question}")

        documents = self.retriever.invoke(question)

        logger.info(f"Retrieved {len(documents)} documents.")

        return documents


retrieval_service = RetrievalService()