from fastapi import FastAPI
from api.router import router
from utils.logger import logger
# from contextlib import asynccontextmanager

app = FastAPI(
    title="VideoStream AI Service",
    description="AI Service for VideoStream (RAG + LangChain + Pinecone)",
    version="1.0.0",
)
logger.info("Starting VideoStream AI Service...")
# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     logger.info("Starting VideoStream AI Service...")
#     yield
#     logger.info("Shutting down VideoStream AI Service...")



app.include_router(router)