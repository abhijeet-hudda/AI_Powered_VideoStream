from models.whisper_model import whisper_model
from utils.logger import logger


class TranscriptService:

    def generate_transcript(self, video_path: str):

        logger.info("Generating transcript...")

        segments, info = whisper_model.transcribe(video_path)

        transcript = ""

        for segment in segments:
            transcript += segment.text + " "

        logger.info("Transcript generated successfully.")

        return {
            "language": info.language,
            "transcript": transcript.strip()
        }


transcript_service = TranscriptService()