import React, { useEffect, useRef, useState } from 'react';
import '../App.css';

function TransitionOverlay({ isVisible, onComplete }) {
  const overlayRef = useRef(null);
  const progressRef = useRef(null);
  const [dots, setDots] = useState('');
  const [duration, setDuration] = useState(3000);

  useEffect(() => {
    if (isVisible) {
      // Generate random duration between 1-5 seconds
      const randomDuration = Math.floor(Math.random() * 4000) + 1000; // 1000-5000ms
      setDuration(randomDuration);
      
      // Prevent scrolling during transition
      document.body.style.overflow = 'hidden';
      
      // Show overlay
      const overlay = overlayRef.current;
      const progress = progressRef.current;
      
      if (overlay && progress) {
        overlay.style.display = 'flex';
        
        // Animate progress bar with random duration
        setTimeout(() => {
          progress.style.width = '100%';
          progress.style.transition = `width ${randomDuration - 200}ms ease`;
        }, 100);
      }

      // Complete transition after random duration
      setTimeout(() => {
        onComplete();
      }, randomDuration);
    } else {
      // Restore scrolling
      document.body.style.overflow = 'unset';
      
      // Hide overlay and reset progress
      const overlay = overlayRef.current;
      const progress = progressRef.current;
      
      if (overlay) {
        overlay.style.display = 'none';
      }
      
      if (progress) {
        progress.style.width = '0%';
        progress.style.transition = 'width 0.3s ease';
      }
    }
  }, [isVisible, onComplete]);

  // Animate dots
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="transition-overlay" ref={overlayRef}>
      <div className="transition-content">
        <h1 className="loading-text">
          Loading{dots}
        </h1>
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill" ref={progressRef}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransitionOverlay;
