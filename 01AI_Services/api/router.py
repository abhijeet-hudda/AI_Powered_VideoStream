from fastapi import APIRouter

from api.health import router as health_router
from api.embedding import router as embedding_router
from api.transcript import router as transcript_router
from api.process_video import router as process_video_router
from api.ask import router as ask_router
from api.delete_video import router as delete_video_router


router = APIRouter()

router.include_router(health_router)
router.include_router(embedding_router)
router.include_router(transcript_router)
router.include_router(process_video_router)
router.include_router(ask_router)
router.include_router(delete_video_router)