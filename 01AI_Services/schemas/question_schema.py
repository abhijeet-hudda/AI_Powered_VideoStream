from pydantic import BaseModel


class QuestionRequest(BaseModel):

    video_id: str

    question: str