from models.llm_model import model
from utils.logger import logger

class LLMService:
    """
    Service responsible for generating responses using the LLM.
    """

    def generate(self, prompt: str):

        logger.info("Generating response from LLM...")

        response = model.invoke(prompt)

        logger.info("LLM response generated successfully.")

        return response


llm_service = LLMService()