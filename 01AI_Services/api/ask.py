from fastapi import APIRouter, HTTPException

from schemas.question_schema import QuestionRequest
from schemas.answer_schema import AnswerResponse

from services.qa_service import qa_service

router = APIRouter(tags=["Ask AI"])

@router.post(
    "/ask",
    response_model=AnswerResponse
)
def ask_question(request: QuestionRequest):

    try:

        answer = qa_service.ask(
            video_id=request.video_id,
            question=request.question,
        )

        return AnswerResponse(
            success=True,
            answer=answer,
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )