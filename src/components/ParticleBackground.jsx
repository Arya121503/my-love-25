// src/components/ParticleBackground.jsx
import React, { useEffect, useRef } from 'react';
import '../styles/ParticleBackground.css';

const ParticleBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles = [];
    const particleCount = 50;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random particle types
      const types = ['💖', '💕', '✨', '💗', '🌟', '💘', '💝'];
      particle.textContent = types[Math.floor(Math.random() * types.length)];
      
      // Random initial position
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      
      // Random animation delay
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      
      // Random size
      const size = Math.random() * 0.5 + 0.5;
      particle.style.fontSize = size + 'rem';
      particle.style.opacity = Math.random() * 0.6 + 0.2;
      
      container.appendChild(particle);
      particles.push(particle);
    }

    // Cleanup function
    return () => {
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, []);

  return <div ref={containerRef} className="particle-background"></div>;
};

export default ParticleBackground;
