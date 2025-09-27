# HUMANAI API Documentation

## Overview

HUMANAI provides a RESTful API for transforming AI-generated text into more human-like content using advanced AI paraphrasing technology.

## Base URL

```
http://localhost:5000/api
```

## Authentication

Currently, no authentication is required. All endpoints are publicly accessible.

## Endpoints

### Health Check

**GET** `/api/health`

Returns the health status of the API.

**Response:**
```json
{
  "status": "healthy",
  "service": "HUMANAI",
  "version": "1.0.0"
}
```

### Paraphrase Text

**POST** `/api/paraphrase`

Transforms a single text into human-like format using AI paraphrasing.

**Request Body:**
```json
{
  "text": "I will help you with your request. The system is functioning optimally."
}
```

**Parameters:**
- `text` (string, required): The text to humanize

**Response:**
```json
{
  "original_text": "I will help you with your request. The system is functioning optimally.",
  "humanized_text": "I'd be happy to help you with your request! The system is running smoothly.",
  "method": "transformer",
  "success": true
}
```

**Error Response:**
```json
{
  "error": "Missing 'text' field in request body",
  "success": false
}
```

**Model Loading Error:**
```json
{
  "error": "Transformer model not loaded. Please try again in a few moments.",
  "success": false
}
```

## AI Paraphrasing Features

### Intelligent Rewriting
- **Context Understanding**: AI analyzes the meaning and tone of your text
- **Natural Language**: Produces authentically human-sounding content
- **Maintains Accuracy**: Preserves original meaning while improving readability
- **Flow Optimization**: Creates natural sentence structures and transitions

### Advanced Processing
- **Transformer-based**: Uses state-of-the-art language models
- **Automatic Optimization**: No manual intensity adjustment needed
- **Context Awareness**: Maintains coherence across paragraphs
- **Quality Output**: Produces high-quality, natural-sounding text

## Error Codes

- **400**: Bad Request - Invalid parameters
- **500**: Internal Server Error - Server-side error
- **503**: Service Unavailable - AI model not loaded

## Rate Limiting

Currently, no rate limiting is implemented. For production use, consider implementing rate limiting based on your needs.

## Examples

### cURL Examples

**Text Paraphrasing:**
```bash
curl -X POST http://localhost:5000/api/paraphrase \
  -H "Content-Type: application/json" \
  -d '{"text": "I will help you with your request."}'
```

### JavaScript Examples

**Using Fetch API:**
```javascript
const response = await fetch('/api/paraphrase', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text: 'I will help you with your request.'
  })
});

const data = await response.json();
console.log(data.humanized_text);
```

**Using Axios:**
```javascript
import axios from 'axios';

const response = await axios.post('/api/paraphrase', {
  text: 'I will help you with your request.'
});

console.log(response.data.humanized_text);
```

## Python Examples

**Using requests:**
```python
import requests

response = requests.post('http://localhost:5000/api/paraphrase', json={
    'text': 'I will help you with your request.'
})

data = response.json()
print(data['humanized_text'])
```

## Integration Tips

1. **Provide clear input** with well-structured sentences
2. **Include context** when possible for better results
3. **Review outputs** and make manual adjustments if needed
4. **Test with different content types** to understand capabilities
5. **Wait for model loading** on first startup (may take a few minutes)

## Support

For issues or questions, please check the project repository or create an issue.
