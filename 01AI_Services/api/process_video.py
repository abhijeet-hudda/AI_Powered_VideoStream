from fastapi import APIRouter, HTTPException

from schemas.process_video_schema import ProcessVideoRequest
from services.video_processing_service import video_processing_service
from utils.logger import logger

router = APIRouter(
    prefix="/process-video",
    tags=["Video Processing"]
)


@router.post("/")
def process_video(request: ProcessVideoRequest):

    try:

        logger.info(
            f"Processing video: {request.video_id}"
        )

        result = video_processing_service.process(request)

        return result

    except Exception:

        logger.exception("Video processing failed.")

        raise HTTPException(
            status_code=500,
            detail="Failed to process video."
        )