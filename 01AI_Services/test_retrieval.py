from services.retrieval_service import retrieval_service

docs = retrieval_service.retrieve(
    question="give one line summary of the video",
    video_id="6972e6101bcc2d029a54c0c7"
)

print(f"Retrieved {len(docs)} documents\n")

for i, doc in enumerate(docs):
    print("=" * 80)
    print(f"Document {i + 1}")
    print(doc.page_content[:500])
    print(doc.metadata)