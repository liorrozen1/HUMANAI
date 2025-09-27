import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function ExamplesModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);
  const isHoveringRef = useRef(false);

  // Example data
  const examples = [
    {
      category: "Business Email",
      aiText: "I am writing to inform you that the meeting has been scheduled for tomorrow at 2:00 PM. Please confirm your attendance.",
      humanText: "Hi there! Just wanted to give you a heads up that we've got the meeting set for tomorrow at 2 PM. Let me know if you can make it!"
    },
    {
      category: "Product Description",
      aiText: "This product is designed to provide optimal performance and efficiency. It features advanced technology and user-friendly interface.",
      humanText: "This thing is a game-changer! It's built to deliver top-notch performance without any hassle. The tech is cutting-edge, and honestly, it's so easy to use you'll wonder how you ever managed without it."
    },
    {
      category: "Social Media Post",
      aiText: "The weather is beautiful today. I recommend going outside and enjoying the sunshine. It is good for your health.",
      humanText: "What a gorgeous day! 🌞 You should totally get outside and soak up some vitamin D. Trust me, your body (and mood) will thank you for it!"
    },
    {
      category: "Academic Writing",
      aiText: "The research indicates that regular exercise has numerous benefits for physical and mental health. Studies show that individuals who exercise regularly experience improved mood and reduced stress levels.",
      humanText: "The science is pretty clear on this one – hitting the gym (or just moving your body) does wonders for both your physical and mental wellbeing. People who make exercise a regular thing consistently report feeling happier and way less stressed out."
    },
    {
      category: "Customer Support",
      aiText: "I apologize for the inconvenience. We are working to resolve this issue as quickly as possible. Please allow 24-48 hours for the resolution.",
      humanText: "Sorry about the trouble! We're on it and doing everything we can to get this sorted ASAP. You should see things back to normal within a day or two."
    },
    {
      category: "Creative Writing",
      aiText: "The sunset was beautiful. The sky was filled with orange and pink colors. It was a peaceful moment.",
      humanText: "The sky was absolutely breathtaking – a canvas of fiery oranges and soft pinks that made everything feel so still and perfect. One of those moments you just want to bottle up and keep forever."
    }
  ];

  // Custom cursor functionality
  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle click outside
  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  const handleTryItYourself = () => {
    onClose();
    navigate('/app');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" ref={modalRef} onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Text Transformation Examples</h2>
          <button onClick={onClose} className="modal-close-btn">
            ×
          </button>
        </div>
        
        <div className="modal-body">
          <p className="modal-description">
            See how HUMANAI transforms AI-generated text into natural, human-like writing across different contexts.
          </p>
          
          <div className="examples-grid">
            {examples.map((example, index) => (
              <div key={index} className="example-card">
                <div className="example-category">
                  {example.category}
                </div>
                
                <div className="example-transformation">
                  <div className="example-input">
                    <div className="example-label">AI Generated</div>
                    <div className="example-text ai-text">
                      "{example.aiText}"
                    </div>
                  </div>
                  
                  <div className="example-arrow">→</div>
                  
                  <div className="example-output">
                    <div className="example-label">Humanized</div>
                    <div className="example-text human-text">
                      "{example.humanText}"
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="modal-footer">
          <button onClick={handleTryItYourself} className="btn-primary">
            Try It Yourself
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExamplesModal;
