# HUMANAI Usage Guide

## Getting Started

HUMANAI is a tool that transforms AI-generated text to sound more human-like using advanced AI paraphrasing technology.

## Quick Start

### 1. Install Dependencies

**Backend (Python):**
```bash
cd backend
pip install -r requirements.txt
```

**Frontend (Node.js):**
```bash
cd frontend
npm install
```

### 2. Start the Services

**Start Backend:**
```bash
cd backend
python app.py
```
The backend will run on http://localhost:5000

**Start Frontend:**
```bash
cd frontend
npm run dev
```
The frontend will run on http://localhost:3000

### 3. Use the Application

1. Open http://localhost:3000 in your browser
2. Enter your AI-generated text
3. Click "Humanize Text"
4. Copy the result

## Features

### 🎯 AI-Powered Humanization
- **Advanced Paraphrasing**: Uses transformer-based AI to rewrite text naturally
- **Intelligent Processing**: Automatically detects and improves text flow
- **Natural Language**: Produces authentically human-sounding content
- **Context Awareness**: Maintains meaning while improving readability

### ⚡ Real-time Processing
- Instant text transformation
- AI-powered paraphrasing
- Copy-to-clipboard functionality
- Responsive design

### 🎨 Intelligent & Advanced
- Multiple example texts
- Clear and reset options
- No manual intensity adjustment needed
- AI automatically optimizes for naturalness

## How It Works

HUMANAI uses advanced transformer-based AI models to intelligently paraphrase your text. The AI automatically:

- **Analyzes Context**: Understands the meaning and tone of your text
- **Natural Rewriting**: Rewrites content to sound more human and conversational
- **Maintains Accuracy**: Preserves the original meaning while improving readability
- **Optimizes Flow**: Creates natural sentence structures and transitions

## Examples

### Before (AI Text):
```
I will help you with your request. The system is functioning optimally and all parameters are within acceptable ranges. Thank you for your inquiry.
```

### After (AI Humanized):
```
I'd be happy to help you with your request! The system is running smoothly and everything looks good. Thanks for reaching out!
```

## Use Cases

### 1. Social Media Posts
Transform corporate announcements into engaging social media content.

### 2. Customer Support
Make AI responses sound more friendly and human-like.

### 3. Creative Writing
Add personality to AI-generated stories or content.

### 4. Chatbots
Make chatbot responses feel more natural and conversational.

### 5. Content Creation
Transform formal content into casual, engaging material.

## Tips for Best Results

### 1. Provide Clear Input
- Use well-structured sentences
- Include context when possible
- Avoid extremely short phrases

### 2. Review the Results
- Always review the AI-generated output
- Make manual adjustments if needed
- Use as a starting point, not final copy

### 3. Experiment with Different Content
- Try various types of text
- Use the example texts to test
- Test with different tones and styles

## API Usage

### Single Text Humanization
```javascript
const response = await fetch('/api/paraphrase', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: 'Your AI text here'
  })
});
```

## Troubleshooting

### Common Issues

**1. Backend not starting:**
- Check if Python is installed
- Install dependencies: `pip install -r requirements.txt`
- Check if port 5000 is available

**2. Frontend not starting:**
- Check if Node.js is installed
- Install dependencies: `npm install`
- Check if port 3000 is available

**3. API connection errors:**
- Ensure backend is running on port 5000
- Check CORS settings
- Verify API endpoints

**4. Text not humanizing:**
- Check if text is not empty
- Ensure AI model is loaded (wait a moment if first startup)
- Check browser console for errors

### Getting Help

1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure both services are running
4. Check the API documentation
5. Review the setup instructions

## Advanced Usage

### Custom Integration
You can integrate HUMANAI into your own applications using the API endpoints.

### AI Model Loading
The transformer model loads automatically on startup. The first run may take a few minutes to download and initialize the model.

## Contributing

Feel free to contribute to HUMANAI by:
- Reporting bugs
- Suggesting new features
- Improving the AI paraphrasing models
- Enhancing the user interface
- Adding new features

## License

HUMANAI is open source and available under the MIT License.

