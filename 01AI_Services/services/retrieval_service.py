from services.vector_store import vector_store
from utils.logger import logger


class RetrievalService:

    def retrieve(
        self,
        question: str,
        video_id: str,
        k: int = 4
    ):

        logger.info(
            f"Retrieving context for video {video_id}"
        )

        retriever = vector_store.as_retriever(
            search_type="similarity",
            search_kwargs={
                "k": k,
                "filter": {
                    "video_id": video_id
                }
            }
        )

        documents = retriever.invoke(question)

        logger.info(
            f"Retrieved {len(documents)} documents."
        )

        return documents


retrieval_service = RetrievalService()