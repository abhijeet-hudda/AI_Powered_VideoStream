from pydantic import BaseModel, Field


class EmbeddingRequest(BaseModel):
    text: str = Field(
        ...,
        min_length=1,
        description="Text to generate embedding for."
    )