from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch
import time
import threading


app = Flask(__name__)
CORS(app)

# Global variables for transformer model
tokenizer = None
model = None
device = None

def load_transformer_model():
    """Load the transformer model for paraphrasing"""
    global tokenizer, model, device
    try:
        print("Loading transformer model...")
        tokenizer = AutoTokenizer.from_pretrained("prithivida/parrot_paraphraser_on_T5")
        model = AutoModelForSeq2SeqLM.from_pretrained("prithivida/parrot_paraphraser_on_T5")
        device = "cuda" if torch.cuda.is_available() else "cpu"
        model = model.to(device)
        print(f"Model loaded successfully on {device}")
        return True
    except Exception as e:
        print(f"Error loading transformer model: {e}")
        return False

def paraphrase_paragraph(text, tokenizer, model, device, intensity=0.5):
    """Paraphrase a single paragraph using the transformer model"""
    try:
        # Calculate parameters based on intensity (0.0 = minimal, 1.0 = maximum)
        # Higher intensity = more creative/random output
        temperature = 0.7 + (intensity * 0.8)  # 0.7 to 1.5
        top_k = max(20, int(150 - (intensity * 100)))  # 150 to 20
        top_p = 0.9 - (intensity * 0.15)  # 0.9 to 0.75
        num_sequences = 1 if intensity < 0.7 else 3  # Multiple results for high intensity
        
        prompt = f"paraphrase: {text} </s>"
        inputs = tokenizer.encode_plus(prompt, return_tensors="pt", padding="longest", truncation=True, max_length=512)
        input_ids = inputs["input_ids"].to(device)
        attention_mask = inputs["attention_mask"].to(device)

        output = model.generate(
            input_ids=input_ids,
            attention_mask=attention_mask,
            max_length=512,
            do_sample=True,
            top_k=top_k,
            top_p=top_p,
            temperature=temperature,
            early_stopping=True,
            num_return_sequences=num_sequences
        )
        
        # If multiple sequences, choose the most different one
        if num_sequences > 1:
            results = [tokenizer.decode(seq, skip_special_tokens=True) for seq in output]
            # Simple heuristic: choose the longest result (usually more creative)
            return max(results, key=len)
        else:
            return tokenizer.decode(output[0], skip_special_tokens=True)
    except Exception as e:
        print(f"Error in paraphrasing: {e}")
        return text  # Return original text if paraphrasing fails

def preprocess_text(text):
    """Preprocess text by removing em dashes and other manual cleanup"""
    # Remove em dashes (—) and replace with regular dashes or spaces
    text = text.replace('—', ' - ')
    # Also handle en dashes (–) for completeness
    text = text.replace('–', ' - ')
    return text

def humanize_text_transformer(full_text, intensity=0.5):
    """Humanize text using transformer-based paraphrasing"""
    global tokenizer, model, device
    
    if tokenizer is None or model is None:
        return {"error": "Transformer model not loaded"}
    
    try:
        # Preprocess the text first
        preprocessed_text = preprocess_text(full_text)
        
        paragraphs = [p.strip() for p in preprocessed_text.split("\n") if p.strip()]
        paraphrased = []
        
        for paragraph in paragraphs:
            if paragraph:
                paraphrased_text = paraphrase_paragraph(paragraph, tokenizer, model, device, intensity)
                paraphrased.append(paraphrased_text)
        
        return "\n\n".join(paraphrased)
    except Exception as e:
        return {"error": f"Error in transformer humanization: {str(e)}"}

def humanize_text_rules(text, intensity=0.5):
    """Humanize text using rule-based patterns"""
    import re
    import random
    
    # Casual contractions
    contractions = {
        r'\bI am\b': "I'm",
        r'\byou are\b': "you're", 
        r'\bhe is\b': "he's",
        r'\bshe is\b': "she's",
        r'\bit is\b': "it's",
        r'\bwe are\b': "we're",
        r'\bthey are\b': "they're",
        r'\bI will\b': "I'll",
        r'\byou will\b': "you'll",
        r'\bhe will\b': "he'll",
        r'\bshe will\b': "she'll",
        r'\bwe will\b': "we'll",
        r'\bthey will\b': "they'll",
        r'\bcannot\b': "can't",
        r'\bdo not\b': "don't",
        r'\bdoes not\b': "doesn't",
        r'\bdid not\b': "didn't",
        r'\bwill not\b': "won't",
        r'\bwould not\b': "wouldn't",
        r'\bshould not\b': "shouldn't",
        r'\bcould not\b': "couldn't",
        r'\bmight not\b': "mightn't",
        r'\bmust not\b': "mustn't",
        r'\bhave not\b': "haven't",
        r'\bhas not\b': "hasn't",
        r'\bhad not\b': "hadn't",
    }
    
    # Casual phrases
    formal_to_casual = {
        r'\bHowever,\b': "But",
        r'\bTherefore,\b': "So",
        r'\bFurthermore,\b': "Plus",
        r'\bMoreover,\b': "Also",
        r'\bNevertheless,\b': "Still",
        r'\bConsequently,\b': "So",
        r'\bAdditionally,\b': "Also",
        r'\bIn conclusion,\b': "So",
        r'\bTo summarize,\b': "In short",
        r'\bIt is important to note that\b': "Just remember that",
        r'\bIt should be noted that\b': "Worth noting that",
        r'\bOne must consider\b': "You should think about",
        r'\bIt is recommended that\b': "You should",
        r'\bIt is advisable to\b': "You might want to",
        r'\bI would like to\b': "I want to",
        r'\bI would recommend\b': "I'd suggest",
        r'\bI would suggest\b': "I'd say",
        r'\bpurchase\b': "buy",
        r'\butilize\b': "use",
        r'\bassist\b': "help",
        r'\bobtain\b': "get",
        r'\bcommence\b': "start",
        r'\bcomplete\b': "finish",
        r'\bdemonstrate\b': "show",
        r'\binformation\b': "info",
        r'\bopportunity\b': "chance",
        r'\brequirement\b': "need",
    }
    
    # Filler words and expressions
    fillers = ["um", "like", "you know", "I mean", "well", "actually", "basically", "honestly", "literally"]
    casual_starters = ["Look,", "Listen,", "Hey,", "So,", "Okay,", "Right,", "Well,"]
    
    result = text
    
    # Apply contractions
    for formal, casual in contractions.items():
        if random.random() < intensity:
            result = re.sub(formal, casual, result, flags=re.IGNORECASE)
    
    # Apply casual phrases
    for formal, casual in formal_to_casual.items():
        if random.random() < intensity:
            result = re.sub(formal, casual, result, flags=re.IGNORECASE)
    
    # Add filler words occasionally
    if intensity > 0.3:
        sentences = re.split(r'[.!?]+', result)
        new_sentences = []
        
        for sentence in sentences:
            sentence = sentence.strip()
            if sentence:
                # Add casual starters
                if random.random() < intensity * 0.3:
                    starter = random.choice(casual_starters)
                    sentence = f"{starter} {sentence.lower()}"
                
                # Add filler words
                if random.random() < intensity * 0.4:
                    filler = random.choice(fillers)
                    words = sentence.split()
                    if len(words) > 3:
                        insert_pos = random.randint(1, len(words) - 1)
                        words.insert(insert_pos, f"{filler},")
                        sentence = " ".join(words)
                
                new_sentences.append(sentence)
        
        result = ". ".join(new_sentences)
        if not result.endswith(('.', '!', '?')):
            result += "."
    
    # Add minor typos based on intensity
    if intensity > 0.7:
        typo_patterns = [
            (r'\bthe\b', 'teh'),
            (r'\band\b', 'adn'),
            (r'\byou\b', 'u'),
            (r'\byour\b', 'ur'),
            (r'\bto\b', '2'),
            (r'\bfor\b', '4'),
        ]
        
        for pattern, typo in typo_patterns:
            if random.random() < intensity * 0.1:  # Low chance for typos
                result = re.sub(pattern, typo, result, count=1, flags=re.IGNORECASE)
    
    return result


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "service": "HUMANAI",
        "version": "1.0.0"
    })


@app.route('/api/humanize', methods=['POST'])
def humanize():
    """Endpoint to humanize text using rule-based method"""
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({
                "error": "Missing 'text' field in request body"
            }), 400
        
        text = data['text']
        intensity = data.get('intensity', 0.7)  # Default intensity
        
        # Validate intensity range
        if not isinstance(intensity, (int, float)) or intensity < 0 or intensity > 1:
            return jsonify({
                "error": "Intensity must be a number between 0.0 and 1.0"
            }), 400
        
        # Humanize the text using rule-based approach
        result = humanize_text_rules(text, intensity)
        
        return jsonify({
            "original_text": text,
            "humanized_text": result,
            "method": "rule-based",
            "intensity": intensity,
            "success": True
        })
        
    except Exception as e:
        return jsonify({
            "error": f"Internal server error: {str(e)}",
            "success": False
        }), 500


@app.route('/api/paraphrase', methods=['POST'])
def paraphrase():
    """Endpoint to humanize text using transformer-based paraphrasing"""
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({
                "error": "Missing 'text' field in request body"
            }), 400
        
        text = data['text']
        intensity = data.get('intensity', 1.0)  # Default to maximum intensity
        
        # Validate intensity range
        if not isinstance(intensity, (int, float)) or intensity < 0 or intensity > 1:
            return jsonify({
                "error": "Intensity must be a number between 0.0 and 1.0"
            }), 400
        
        # Check if transformer model is loaded
        if tokenizer is None or model is None:
            return jsonify({
                "error": "Transformer model not loaded. Please try again in a few moments.",
                "success": False
            }), 503
        
        # Humanize the text using transformer approach
        result = humanize_text_transformer(text, intensity)
        
        if isinstance(result, dict) and "error" in result:
            return jsonify({
                "error": result["error"],
                "success": False
            }), 500
        
        return jsonify({
            "original_text": text,
            "humanized_text": result,
            "method": "transformer",
            "intensity": intensity,
            "success": True
        })
        
    except Exception as e:
        return jsonify({
            "error": f"Internal server error: {str(e)}",
            "success": False
        }), 500


# Load transformer model on startup
print("Starting HUMANAI backend...")
print("Loading transformer model (this may take a few minutes on first run)...")
model_loaded = load_transformer_model()

if model_loaded:
    print("✅ Transformer model loaded successfully!")
else:
    print("⚠️  Transformer model failed to load. Paraphrase endpoint will not be available.")

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    print(f"🚀 Starting Flask server on port {port}...")
    app.run(debug=False, host='0.0.0.0', port=port)
