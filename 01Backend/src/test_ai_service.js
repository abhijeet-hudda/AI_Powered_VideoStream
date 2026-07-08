import "dotenv/config";

import aiService from "./services/ai.service.js";

const result = await aiService.askQuestion({
    video_id: "6984570ef4c65460cbe67bd5",
    question: "What is this video about?"
});

console.log(result);