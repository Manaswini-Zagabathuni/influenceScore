"""
Basic tests for the InfluenceScore API.
Run with: pytest tests/ -v
"""
import pytest
from fastapi.testclient import TestClient
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

# Set a dummy key so the app loads without error
os.environ.setdefault("ANTHROPIC_API_KEY", "test-key")

from main import app

client = TestClient(app)


def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert "version" in data


def test_analyze_missing_text():
    response = client.post("/analyze", json={})
    assert response.status_code == 422


def test_analyze_text_too_short():
    response = client.post("/analyze", json={"text": "hi"})
    assert response.status_code == 422


def test_analyze_text_too_long():
    response = client.post("/analyze", json={"text": "x" * 10001})
    assert response.status_code == 422
