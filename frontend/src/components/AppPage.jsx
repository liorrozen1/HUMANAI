import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function AppPage() {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [intensity] = useState(0.7);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // Custom cursor refs
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);
  const isHoveringRef = useRef(false);

  // Custom cursor functionality
  useEffect(() => {
    // Create cursor elements
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');

    cursorDot.className = 'cursor-dot';
    cursorOutline.className = 'cursor-outline';

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    // Store references
    cursorDotRef.current = cursorDot;
    cursorOutlineRef.current = cursorOutline;

    // Mouse move handler
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${x}px`;
        cursorDotRef.current.style.top = `${y}px`;
      }

      if (cursorOutlineRef.current) {
        cursorOutlineRef.current.style.left = `${x}px`;
        cursorOutlineRef.current.style.top = `${y}px`;
      }
    };

    // Mouse enter/leave handlers for interactive elements
    const handleMouseEnter = () => {
      isHoveringRef.current = true;
      document.body.classList.add('cursor-hover');
    };

    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      document.body.classList.remove('cursor-hover');
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('button, textarea, input, a, [role="button"]');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    // Cleanup function
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });

      if (cursorDotRef.current) {
        document.body.removeChild(cursorDotRef.current);
      }
      if (cursorOutlineRef.current) {
        document.body.removeChild(cursorOutlineRef.current);
      }
    };
  }, []);

  const handleSubmit = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setError('');
    setOutputText('');
    setIsCopied(false);

    try {
      const response = await fetch(`http://localhost:5000/api/paraphrase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          intensity: intensity
        }),
      });

      const data = await response.json();

      if (data.success) {
        setOutputText(data.humanized_text);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Connection failed. Make sure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setIsCopied(true);
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <header className="header">
          <button onClick={handleBackToHome} className="back-btn">
            ← Back to Home
          </button>
          <h1 className="title"><span className="robot-emoji">🤖</span> HUMANAI</h1>
          <p className="subtitle">Transform AI text into human-like writing</p>
        </header>

        {/* Main Interface */}
        <div className="main-interface">
          {/* Input Section */}
          <div className="input-section">
            <label className="section-label">Input Text</label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your AI-generated text here..."
              className="text-area"
            />
          </div>

          {/* Output Section */}
          <div className="output-section">
            <div className="output-header">
              <label className="section-label">Humanized Output</label>
              <div className="copy-btn-container">
                {outputText && (
                  <button onClick={handleCopy} className={`copy-btn ${isCopied ? 'copied' : ''}`}>
                    {isCopied ? 'Copied!' : 'Copy'}
                  </button>
                )}
              </div>
            </div>
            <textarea
              value={outputText}
              readOnly
              placeholder="Your humanized text will appear here..."
              className="text-area output"
            />
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="action-buttons">
          <button
            onClick={handleSubmit}
            disabled={!inputText.trim() || isLoading}
            className="btn-primary"
          >
            {isLoading ? 'Processing...' : 'Humanize Text'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppPage;
