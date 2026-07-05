from pydantic import BaseModel, Field


class TranscriptRequest(BaseModel):
    video_path: str = Field(
        ...,
        min_length=1,
        description="Absolute path of video/audio file."
    )