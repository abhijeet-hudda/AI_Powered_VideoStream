from pinecone_db import semantic_search
from llm import summarize_llm, generate_questions_llm

def video_summary(video_id: str):
    matches = semantic_search(None, video_id, top_k=20)

    context = "\n\n".join(
        m["metadata"]["text"] for m in matches
    )

    return {
        "summary": summarize_llm(context),
        "questions": generate_questions_llm(context)
    }
