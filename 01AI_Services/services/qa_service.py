from chains.rag_chain import rag_chain
from utils.logger import logger


class QAService:
    """
    Service responsible for answering user questions.
    """

    def ask(
        self,
        video_id: str,
        question: str,
    ):

        logger.info(
            f"Question received for video {video_id}"
        )

        answer = rag_chain.invoke(
            {
                "video_id": video_id,
                "question": question,
            }
        )

        logger.info("Answer generated successfully.")

        return answer


qa_service = QAService()