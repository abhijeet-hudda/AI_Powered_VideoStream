from langchain_huggingface import HuggingFaceEndpoint
from langchain_huggingface import ChatHuggingFace

from config.settings import settings
from utils.logger import logger

logger.info("Loading Hugging Face LLM...")
logger.info(f"Model: {settings.LLM_MODEL}")

try:
    llm = HuggingFaceEndpoint(
        repo_id=settings.LLM_MODEL,
        huggingfacehub_api_token=settings.HF_TOKEN,
        task="text-generation",
        temperature=0.2,
        max_new_tokens=512,
    )
    
    model = ChatHuggingFace(llm=llm)

    logger.info("Hugging Face LLM loaded successfully.")

except Exception:
    logger.exception("Failed to load Hugging Face LLM.")
    raise