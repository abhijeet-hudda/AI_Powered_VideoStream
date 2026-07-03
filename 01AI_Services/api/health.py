from fastapi import APIRouter
from utils.logger import logger

router = APIRouter(tags=["Health"])


@router.get("/")
def root():
    logger.info("Root endpoint called.")
    return {
        "service": "VideoStream AI Service",
        "version": "1.0.0"
    }


@router.get("/health")
def health():
    logger.info("Health endpoint called.")
    return {
        "status": "success",
        "message": "AI Service is Running 🚀"
    }