import whisper
import os
from utils.audio import extract_audio

model = whisper.load_model("base")

def transcribe_video(video_path: str) -> str:
    audio_path = extract_audio(video_path)

    try:
        result = model.transcribe(audio_path)
        return result["text"]
    finally:
        if os.path.exists(audio_path):
            os.remove(audio_path)
