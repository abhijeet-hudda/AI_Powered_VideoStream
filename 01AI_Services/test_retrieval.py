from services.retrieval_service import retrieval_service

docs = retrieval_service.retrieve(
    question="What is this video about?",
    video_id="6984570ef4c65460cbe67bd5"
)

print(f"Retrieved {len(docs)} documents\n")

for i, doc in enumerate(docs):
    print("=" * 80)
    print(f"Document {i + 1}")
    print(doc.page_content[:500])
    print(doc.metadata)