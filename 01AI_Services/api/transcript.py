from fastapi import APIRouter, HTTPException

from schemas.transcript_schema import TranscriptRequest
from services.transcript_service import transcript_service
from utils.logger import logger

router = APIRouter(
    prefix="/transcript",
    tags=["Transcript"]
)


@router.post("/")
def transcribe(request: TranscriptRequest):

    try:
        logger.info("Transcript API called.")

        result = transcript_service.generate_transcript(
            request.video_path
        )

        return result

    except Exception as e:

        logger.exception("Transcript generation failed.")

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )