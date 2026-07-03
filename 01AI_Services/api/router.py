from fastapi import APIRouter

from api.health import router as health_router


router = APIRouter()

router.include_router(health_router)