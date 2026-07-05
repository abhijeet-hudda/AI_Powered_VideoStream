from utils.text_splitter import text_splitter
from utils.document_helper import create_document
from services.vector_store import vector_store
from utils.logger import logger


class IngestionService:

    def ingest(
        self,
        transcript: str,
        metadata: dict
    ):

        logger.info("Splitting transcript into chunks...")

        chunks = text_splitter.split_text(transcript)

        logger.info(f"Created {len(chunks)} chunks.")

        documents = []

        for i, chunk in enumerate(chunks):

            doc = create_document(
                text=chunk,
                metadata={
                    **metadata,
                    "chunk": i
                }
            )

            documents.append(doc)

        logger.info("Uploading documents to Pinecone...")

        vector_store.add_documents(documents)

        logger.info("Documents uploaded successfully.")


ingestion_service = IngestionService()