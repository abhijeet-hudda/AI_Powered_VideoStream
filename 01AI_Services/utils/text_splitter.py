from langchain_text_splitters import RecursiveCharacterTextSplitter

from utils.logger import logger


class TextSplitter:

    def __init__(self):
        logger.info("Initializing Text Splitter...")

        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len,
        )

    def split_text(self, text: str):
        return self.text_splitter.split_text(text)


text_splitter = TextSplitter()