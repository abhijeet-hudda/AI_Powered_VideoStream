import api from "./axios.instance.js";

export const processAI = async (videoId) => {
    console.log("proces Ai videoid:",videoId)
    const response = await api.post(
        `/videos/${videoId}/process-ai`
    );

    return response.data.data;
};

export const askAI = async ({
    videoId,
    question,
}) => {
    console.log("question:",question);
    const response = await api.post(
        `/videos/${videoId}/ask`,
        {
            question,
        }
    );

    return response.data.data;
};