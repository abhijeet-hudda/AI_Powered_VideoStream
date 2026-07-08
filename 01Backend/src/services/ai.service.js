import aiClient from "../config/aiClient.js";

class AIService {

    async processVideo(videoData) {

        const response = await aiClient.post(
            "/process-video",
            videoData
        );

        return response.data;
    }

    async askQuestion(questionData) {

        const response = await aiClient.post(
            "/ask",
            questionData
        );

        return response.data;
    }
}

export default new AIService();