from pydantic import BaseModel, Field
from typing import List


class AnalyzeRequest(BaseModel):
    text: str = Field(..., min_length=5, max_length=10000, description="Text to analyze")


class Tactic(BaseModel):
    name: str
    score: int = Field(..., ge=0, le=100)
    note: str


class AnalyzeResponse(BaseModel):
    tactics: List[Tactic]
    overall: int = Field(..., ge=0, le=100)
    verdict: str
    analysis: str


class HealthResponse(BaseModel):
    status: str
    version: str
