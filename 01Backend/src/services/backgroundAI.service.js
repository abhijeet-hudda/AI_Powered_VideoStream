import { Video } from "../models/video.model.js";
import aiService from "./ai.service.js";

class BackgroundAIService {

    async processVideo(videoId) {
        try {
            const video = await Video.findById(videoId);
            if (!video) {
                console.log("Video not found");
                return;
            }
            if (video.aiProcessed) {
                console.log("Already processed");
                return;
            }
            const response = await aiService.processVideo({
                video_id: video._id.toString(),
                videofile: video.videofile,
                thumbnail: video.thumbnail,
                title: video.title,
                description: video.description,
                duration: video.duration,
                owner: video.owner.toString(),
                views: video.views,
                isPublished: video.isPublished,
                createdAt: video.createdAt,
            });
            if (response.success) {
                video.aiProcessed = true;
                await video.save({
                    validateBeforeSave: false,
                });
                console.log(`AI processed ${video._id}`);
            }

        }catch (err) {
            console.error("Background AI Error:", err.message);
        }

    }
    async deleteVideo(videoId) {
        const response = await aiClient.delete(
            `/delete-video/${videoId}`
        );
        return response.data;
    }
}

export default new BackgroundAIService();