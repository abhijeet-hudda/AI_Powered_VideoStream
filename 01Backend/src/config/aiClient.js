import axios from "axios";

const aiClient = axios.create({
    baseURL: process.env.AI_SERVICE_URL,
    timeout: 1200000,
    headers: {
        "Content-Type": "application/json"
    }
});

export default aiClient;