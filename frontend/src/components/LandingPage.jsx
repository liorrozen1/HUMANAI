import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExamplesModal from './ExamplesModal';
import TransitionOverlay from './TransitionOverlay';
import '../App.css';

function LandingPage() {
  const navigate = useNavigate();
  const [isExamplesModalOpen, setIsExamplesModalOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
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

  const handleGetStarted = () => {
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    navigate('/app');
  };

  const handleViewExamples = () => {
    setIsExamplesModalOpen(true);
  };

  const handleCloseExamples = () => {
    setIsExamplesModalOpen(false);
  };

  return (
    <div className="landing-page">
      <div className="landing-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="robot-emoji">🤖</span>
              <span>AI Text Humanizer</span>
            </div>
            
            <h1 className="hero-title">
              Transform <span className="gradient-text">AI Text</span><br />
              into <span className="gradient-text">Human Writing</span>
            </h1>
            
            <p className="hero-description">
              Make your AI-generated content sound natural, engaging, and undetectable. 
              Our advanced algorithm preserves meaning while adding human-like variations.
            </p>
            
            <div className="hero-actions">
              <button onClick={handleGetStarted} className="btn-primary btn-large">
                Get Started Free
              </button>
              <button onClick={handleViewExamples} className="btn-secondary btn-large">
                View Examples
              </button>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="text-transformation-demo">
              <div className="demo-input">
                <div className="demo-label">AI Generated</div>
                <div className="demo-text ai-text">
                  "The weather is nice today. I recommend going outside for a walk."
                </div>
              </div>
              <div className="demo-arrow">→</div>
              <div className="demo-output">
                <div className="demo-label">Humanized</div>
                <div className="demo-text human-text">
                  "What a gorgeous day! You should definitely get some fresh air and take a stroll."
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="section-header">
            <h2>Why Choose HUMANAI?</h2>
            <p>Advanced technology meets intuitive design</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Precision</h3>
              <p>Maintains original meaning while adding natural human variations</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Speed</h3>
              <p>Process large amounts of text in seconds with our optimized engine</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Privacy</h3>
              <p>Your content is processed securely and never stored on our servers</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Quality</h3>
              <p>Advanced algorithms ensure natural, readable output every time</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Humanize Your AI Text?</h2>
            <p>Join thousands of users who trust HUMANAI for their content needs</p>
            <button onClick={handleGetStarted} className="btn-primary btn-large">
              Start Humanizing Now
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="landing-footer">
          <p>Made by <a href="https:/instagram.com/liorrozen1" target="_blank" rel="noopener noreferrer" className="footer-name">LIOR ROZEN</a> with ❤️</p>
        </footer>
      </div>
      
      {/* Examples Modal */}
      <ExamplesModal 
        isOpen={isExamplesModalOpen} 
        onClose={handleCloseExamples} 
      />
      
      {/* Transition Overlay */}
      <TransitionOverlay 
        isVisible={isTransitioning} 
        onComplete={handleTransitionComplete} 
      />
    </div>
  );
}

export default LandingPage;
