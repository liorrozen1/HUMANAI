# HUMANAI - Human-like AI Text Generator

HUMANAI is a powerful tool that transforms AI-generated text to sound more human-like using two advanced methods: rule-based humanization and AI-powered paraphrasing.

## Features

- **Dual Humanization Methods**: 
  - **Rule-based**: Fast, customizable humanization with typos, filler words, and casual language patterns
  - **AI Paraphrasing**: Advanced transformer-based paraphrasing for natural text rewriting
- **Natural Language Patterns**: Converts formal AI text to casual, conversational tone
- **Human Imperfections**: Adds realistic typos, pauses, and informal expressions
- **Real-time Processing**: Instant text transformation
- **Customizable Settings**: Adjust humanization levels with rule-based method
- **Web Interface**: Easy-to-use React frontend with method selection
- **API Integration**: RESTful API for programmatic access

## Project Structure

```
HUMANAI/
├── frontend/          # React + Vite frontend
├── backend/           # Python Flask backend
├── docs/             # Documentation
└── README.md         # This file
```

## Quick Start

1. **Backend Setup**:
   ```bash
   cd backend
   pip install -r requirements.txt
   python app.py
   ```

2. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Access the application**: http://localhost:3000

## How It Works

HUMANAI offers two powerful humanization methods:

### Rule-based Method (Fast)
- **Casual Language Conversion**: "I will help you" → "I'll help you out"
- **Natural Pauses**: Adding "um", "like", "you know"
- **Realistic Typos**: Occasional spelling mistakes
- **Conversational Tone**: More personal and engaging language
- **Human Expressions**: Adding emotions and personality
- **Customizable Intensity**: Control how human-like the text becomes

### AI Paraphrasing Method (Advanced)
- **Transformer-based Rewriting**: Uses state-of-the-art language models
- **Natural Paraphrasing**: Completely rewrites text while maintaining meaning
- **Context-aware**: Understands and preserves the original intent
- **High-quality Output**: Produces more natural, human-like text

## API Endpoints

- `POST /api/humanize` - Rule-based text humanization (with intensity control)
- `POST /api/paraphrase` - AI-powered paraphrasing
- `GET /api/health` - Health check

## Contributing

Feel free to contribute to make HUMANAI even more human-like!
