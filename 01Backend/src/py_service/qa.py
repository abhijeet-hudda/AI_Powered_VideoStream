from embeddings import embed
from pinecone_db import semantic_search
from llm import ask_llm

def ask_video(video_id: str, question: str) -> str:
    q_embedding = embed(question)

    matches = semantic_search(q_embedding, video_id)

    context = "\n\n".join(
        m["metadata"]["text"] for m in matches
    )

    return ask_llm(context, question)
