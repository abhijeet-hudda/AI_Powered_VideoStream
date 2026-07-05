import os
import uuid
import requests

from utils.logger import logger


class DownloadService:

    def download_video(
        self,
        video_url: str
    ) -> str:

        logger.info("Downloading video...")

        os.makedirs("storage/temp", exist_ok=True)

        filename = f"{uuid.uuid4()}.mp4"

        filepath = os.path.join(
            "storage",
            "temp",
            filename
        )

        response = requests.get(
            video_url,
            stream=True,
            timeout=60
        )

        response.raise_for_status()

        with open(filepath, "wb") as file:

            for chunk in response.iter_content(
                chunk_size=8192
            ):

                file.write(chunk)

        logger.info("Video downloaded successfully.")

        return filepath


download_service = DownloadService()