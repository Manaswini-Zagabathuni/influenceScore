import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from models import AnalyzeRequest, AnalyzeResponse, HealthResponse
from analyzer import analyze_text

load_dotenv()

app = FastAPI(
    title="InfluenceScore API",
    description="AI-powered psychological influence detector",
    version="1.0.0"
)

# CORS — allow frontend origins
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in allowed_origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")


@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    return HealthResponse(status="ok", version="1.0.0")


@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze(request: AnalyzeRequest):
    """
    Analyze text for psychological influence tactics.

    Returns scores (0-100) for 7 tactics, an overall influence score,
    a short verdict, and a plain-English breakdown.
    """
    if not ANTHROPIC_API_KEY:
        raise HTTPException(
            status_code=500,
            detail="ANTHROPIC_API_KEY not configured on server."
        )

    if len(request.text.strip()) < 5:
        raise HTTPException(
            status_code=422,
            detail="Text is too short to analyze."
        )

    try:
        result = await analyze_text(request.text, ANTHROPIC_API_KEY)
        return result
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {str(e)}"
        )
