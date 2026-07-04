from fastapi import APIRouter

from api.health import router as health_router
from api.embedding import router as embedding_router

router = APIRouter()

router.include_router(health_router)
router.include_router(embedding_router)