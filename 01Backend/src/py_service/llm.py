from transformers import pipeline

generator = pipeline(
    "text-generation",
    model="distilgpt2"
)

def ask_llm(context: str, question: str) -> str:
    prompt = f"""
Answer ONLY from the context.
If not found say: Not found in this video.

Context:
{context}

Question:
{question}

Answer:
"""
    out = generator(prompt, max_new_tokens=200, temperature=0.2)
    return out[0]["generated_text"].replace(prompt, "").strip()


def summarize_llm(context: str) -> str:
    prompt = f"""
Summarize the following video clearly:

{context}

Summary:
"""
    out = generator(prompt, max_new_tokens=200, temperature=0.3)
    return out[0]["generated_text"].replace(prompt, "").strip()


def generate_questions_llm(context: str) -> list:
    prompt = f"""
Generate 5 student questions from this video:

{context}

Questions:
"""
    out = generator(prompt, max_new_tokens=150, temperature=0.4)
    return [
        q.strip()
        for q in out[0]["generated_text"].split("\n")
        if q.strip()
    ]
