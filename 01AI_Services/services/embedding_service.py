from models.embedding_model import embedding_model

class EmbeddingService:
    """
    Service responsible for generating text embeddings.
    """

    def embed_query(self, text: str):
        return embedding_model.embed_query(text)

    def embed_documents(self, documents: list[str]):
        return embedding_model.embed_documents(documents)


embedding_service = EmbeddingService()