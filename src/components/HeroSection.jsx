// src/components/HeroSection.jsx
import React, { useEffect, useState } from "react";
import "../styles/HeroSection.css";

const HeroSection = ({ onScrollToNext }) => {
  const [floatingHearts, setFloatingHearts] = useState([]);

  const createFloatingHeart = (x, y) => {
    const newHeart = {
      id: Date.now() + Math.random(),
      x: x,
      y: y,
      emoji: ['💖', '💕', '💗', '💘', '💝'][Math.floor(Math.random() * 5)]
    };
    
    setFloatingHearts(prev => [...prev, newHeart]);
    
    // Remove heart after animation
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
    }, 2000);
  };

  const handleContainerClick = (e) => {
    if (e.target.closest('button')) return; // Don't create hearts when clicking buttons
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    createFloatingHeart(x, y);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
    script.async = true;
    script.onload = () => {
      window.confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="hero-section" onClick={handleContainerClick}>
      {/* Floating hearts */}
      {floatingHearts.map(heart => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: heart.x,
            top: heart.y,
          }}
        >
          {heart.emoji}
        </div>
      ))}
      
      <h1>Selamat Ulang Tahun ke-25, Sayang! 🎂</h1>
      <p>Semoga tahun ini penuh dengan cinta, keberkahan, dan kebahagiaan tak terhingga.</p>
      <p className="interactive-hint">✨ Klik di mana saja untuk menciptakan cinta ✨</p>
      <button onClick={onScrollToNext}>Lihat Cerita Kita 💖</button>
    </div>
  );
};

export default HeroSection;
