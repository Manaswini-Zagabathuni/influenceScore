import json
import anthropic
from models import AnalyzeResponse, Tactic

SYSTEM_PROMPT = """You are InfluenceScore, a psychological influence analysis engine.
Analyze any text for 7 manipulation tactics and return ONLY valid JSON — no markdown, no preamble, no explanation outside the JSON.

Return this exact structure:
{
  "tactics": [
    {"name": "Fear", "score": 0-100, "note": "one sentence explaining why this score"},
    {"name": "Authority", "score": 0-100, "note": "one sentence explaining why this score"},
    {"name": "Social Proof", "score": 0-100, "note": "one sentence explaining why this score"},
    {"name": "Scarcity", "score": 0-100, "note": "one sentence explaining why this score"},
    {"name": "Reciprocity", "score": 0-100, "note": "one sentence explaining why this score"},
    {"name": "Emotion", "score": 0-100, "note": "one sentence explaining why this score"},
    {"name": "Logic Fallacies", "score": 0-100, "note": "one sentence explaining why this score"}
  ],
  "overall": 0-100,
  "verdict": "2-6 word verdict summarizing the influence level",
  "analysis": "2-4 sentence plain English explanation of what tactics this content uses and how. Written directly to the reader. Be specific — reference actual phrases from the text where relevant."
}

Scoring guide:
- 0-20: Not present or negligible
- 21-45: Mild use
- 46-70: Moderate use
- 71-100: Heavy, deliberate use

The overall score is a weighted average reflecting how manipulative the content is overall.
Be accurate and fair — neutral content should score low, genuinely manipulative content should score high."""


async def analyze_text(text: str, api_key: str) -> AnalyzeResponse:
    """
    Send text to Claude API and parse the structured response.
    """
    client = anthropic.Anthropic(api_key=api_key)

    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        system=SYSTEM_PROMPT,
        messages=[
            {
                "role": "user",
                "content": f"Analyze this text for psychological influence tactics:\n\n{text}"
            }
        ]
    )

    raw_text = message.content[0].text.strip()

    # Strip markdown code fences if present
    if raw_text.startswith("```"):
        raw_text = raw_text.split("```")[1]
        if raw_text.startswith("json"):
            raw_text = raw_text[4:]
        raw_text = raw_text.strip()

    parsed = json.loads(raw_text)

    tactics = [
        Tactic(
            name=t["name"],
            score=int(t["score"]),
            note=t["note"]
        )
        for t in parsed["tactics"]
    ]

    return AnalyzeResponse(
        tactics=tactics,
        overall=int(parsed["overall"]),
        verdict=parsed["verdict"],
        analysis=parsed["analysis"]
    )
