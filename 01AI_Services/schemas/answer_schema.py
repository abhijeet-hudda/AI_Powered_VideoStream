from pydantic import BaseModel


class AnswerResponse(BaseModel):

    success: bool

    answer: str