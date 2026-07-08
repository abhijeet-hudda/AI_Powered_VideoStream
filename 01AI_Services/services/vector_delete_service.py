from services.vector_store import vector_store
from utils.logger import logger


class VectorDeleteService:

    def delete_video(self, video_id: str):

        try:
            logger.info(
                f"Deleting vectors for video: {video_id}"
            )
            vector_store.index.delete(
                filter={
                    "video_id": video_id
                }
            )
            logger.info(
                "Vectors deleted successfully."
            )
            return {
                "success": True,
                "message": "Vectors deleted successfully."
            }

        except Exception as e:

            logger.exception(
                "Vector deletion failed."
            )

            return {
                "success": False,
                "message": str(e)
            }


vector_delete_service = VectorDeleteService()