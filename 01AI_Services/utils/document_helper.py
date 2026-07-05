from langchain_core.documents import Document


def create_document(
    text: str,
    metadata: dict
) -> Document:

    return Document(
        page_content=text,
        metadata=metadata
    )