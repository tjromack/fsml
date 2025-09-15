from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="fullstack-ml API", version="0.1.0")

class PredictIn(BaseModel):
    x: float

class PredictOut(BaseModel):
    y: float

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict", response_model=PredictOut)
def predict(payload: PredictIn):
    # trivial model; we’ll swap in the real thing later
    return PredictOut(y=2.0 * payload.x + 1.0)
