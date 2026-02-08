from fastapi import FastAPI
from qa import ask_video
from summary import video_summary

app = FastAPI()

@app.post("/videos/{video_id}/ask")
def ask(video_id: str, body: dict):
    question = body.get("question")
    return {
        "success": True,
        "answer": ask_video(video_id, question)
    }

@app.get("/videos/{video_id}/summary")
def summary(video_id: str):
    return {
        "success": True,
        **video_summary(video_id)
    }
