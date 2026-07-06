from langchain_core.prompts import ChatPromptTemplate

QA_PROMPT = ChatPromptTemplate.from_template(
"""
You are an expert AI assistant.

Answer ONLY using the provided context.

If the answer is not present in the context,
reply exactly:

"I don't know based on the provided video."

Context:
{context}

Question:
{question}

Answer:
"""
)