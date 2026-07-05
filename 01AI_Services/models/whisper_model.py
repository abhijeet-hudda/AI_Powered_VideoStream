from faster_whisper import WhisperModel

from config.settings import settings
from utils.logger import logger


logger.info("Loading Whisper model...")

whisper_model = WhisperModel(
    model_size_or_path=settings.WHISPER_MODEL,
    device=settings.WHISPER_DEVICE,
    compute_type=settings.WHISPER_COMPUTE_TYPE,
)

logger.info("Whisper model loaded successfully.")