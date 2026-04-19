# InfluenceScore 

> **Paste any text. See exactly how it's trying to manipulate you.**

InfluenceScore is an AI-powered psychological influence detector. It analyzes any piece of content — news headlines, political speeches, WhatsApp forwards, ads — and maps out which manipulation tactics are being used and how intensely.

Built for **InfluenceHacks** hackathon.

---

## What it does

You paste text. The AI reads it and gives you back:

- **A radar chart** with 7 spokes — one per psychological tactic
- **Scored bars** showing intensity (0–100) for each tactic
- **An overall InfluenceScore** with a color-coded verdict
- **A plain-English breakdown** explaining exactly what's being done to you

### The 7 tactics detected

| Tactic | What it detects |
|--------|----------------|
| **Fear** | Language designed to scare or threaten |
| **Authority** | Name-dropping experts, institutions, credentials |
| **Social Proof** | "Everyone believes this" pressure |
| **Scarcity** | Fake urgency — "limited time", "last chance" |
| **Reciprocity** | Making you feel obligated |
| **Emotion** | Emotionally charged or manipulative language |
| **Logic Fallacies** | Flawed reasoning used to trick you |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Python 3.11 + FastAPI |
| AI Analysis | Claude API (claude-sonnet) |
| Charts | Chart.js |
| Hosting | AWS EC2 (backend) + Vercel/Netlify (frontend) |

---

## Project Structure

```
influencescore/
├── frontend/               # React + Vite app
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.jsx         # Root component
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Global styles
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── backend/                # FastAPI server
│   ├── main.py             # API routes
│   ├── analyzer.py         # Claude AI logic
│   ├── models.py           # Pydantic schemas
│   ├── requirements.txt
│   └── .env.example
├── docs/
│   └── demo-examples.md    # Example texts for demo
├── .gitignore
└── README.md
```

---

## Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/influencescore.git
cd influencescore
```

### 2. Backend setup

```bash
cd backend
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env

uvicorn main:app --reload --port 8000
```

### 3. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env.local
# Set VITE_API_URL=http://localhost:8000

npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Demo Script (for judges)

1. Paste: *"I made coffee this morning. It tasted good."*
   → Radar is flat. Score near zero. Nothing lights up.

2. Paste: *"ACT NOW — experts warn this is your LAST CHANCE before everything changes forever."*
   → Fear, Scarcity, Authority all spike at once.

3. Say: **"We're not telling you what to believe. We're showing you the exact tools being used to make you believe it."**

---

## Environment Variables

**Backend (`backend/.env`)**
```
ANTHROPIC_API_KEY=your_key_here
ALLOWED_ORIGINS=http://localhost:5173,https://yourdomain.com
```

**Frontend (`frontend/.env.local`)**
```
VITE_API_URL=http://localhost:8000
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/analyze` | Analyze text for influence tactics |
| `GET` | `/health` | Health check |

### POST /analyze

**Request:**
```json
{
  "text": "Your text to analyze here"
}
```

**Response:**
```json
{
  "tactics": [
    { "name": "Fear", "score": 85, "note": "Uses imminent threat language" },
    ...
  ],
  "overall": 72,
  "verdict": "Highly manipulative content",
  "analysis": "This content heavily relies on Fear and Scarcity..."
}
```

---
