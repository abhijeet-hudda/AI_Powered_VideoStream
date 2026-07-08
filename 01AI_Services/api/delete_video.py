from fastapi import APIRouter

from services.vector_delete_service import (
    vector_delete_service
)

router = APIRouter()


@router.delete("/delete-video/{video_id}")
async def delete_video(video_id: str):

    return vector_delete_service.delete_video(
        video_id
    )