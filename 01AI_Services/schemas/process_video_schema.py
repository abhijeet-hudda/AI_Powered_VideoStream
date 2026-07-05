from pydantic import BaseModel, HttpUrl


class ProcessVideoRequest(BaseModel):
    video_id: str

    videofile: HttpUrl

    thumbnail: HttpUrl

    title: str

    description: str

    duration: float

    owner: str

    views: int

    isPublished: bool

    createdAt: str