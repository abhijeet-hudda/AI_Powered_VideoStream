import subprocess
import uuid
import os

def extract_audio(video_path: str) -> str:
    audio_path = f"temp_{uuid.uuid4()}.wav"

    command = [
        "ffmpeg", "-y",
        "-i", video_path,
        "-vn",
        "-acodec", "pcm_s16le",
        "-ar", "16000",
        audio_path
    ]

    subprocess.run(command, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    return audio_path
