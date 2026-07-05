import os

from services.download_service import download_service
from services.transcript_service import transcript_service
from services.ingestion_service import ingestion_service
from utils.logger import logger


class VideoProcessingService:

    def process(self, request):

        video_path = None

        try:
            logger.info(f"Processing video: {request.video_id}")

            # Step 1: Download Video
            video_path = download_service.download_video(
                str(request.videofile)
            )

            # Step 2: Generate Transcript
            transcript_result = transcript_service.generate_transcript(
                video_path
            )

            transcript = transcript_result["transcript"]
            language = transcript_result["language"]

            # Step 3: Prepare Metadata
            metadata = {
                "video_id": request.video_id,
                "title": request.title,
                "description": request.description,
                "owner": request.owner,
                "videofile": str(request.videofile),
                "thumbnail": str(request.thumbnail),
                "duration": request.duration,
                "views": request.views,
                "isPublished": request.isPublished,
                "createdAt": request.createdAt,
                "language": language,
            }

            # Step 4: Store in Pinecone
            ingestion_service.ingest(
                transcript=transcript,
                metadata=metadata,
            )

            logger.info("Video processing completed successfully.")

            return {
                "success": True,
                "video_id": request.video_id,
                "language": language,
                "message": "Video processed successfully."
            }

        except Exception:
            logger.exception("Video processing failed.")
            raise

        finally:
            # Step 5: Delete Temporary File
            if video_path and os.path.exists(video_path):
                os.remove(video_path)
                logger.info("Temporary video deleted.")


video_processing_service = VideoProcessingService()