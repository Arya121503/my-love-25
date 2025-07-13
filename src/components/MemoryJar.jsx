// src/components/MemoryJar.jsx
import React, { useState } from 'react';
import '../styles/MemoryJar.css';

const MemoryJar = () => {
  const [currentMemory, setCurrentMemory] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const [showMemory, setShowMemory] = useState(false);

  const memories = [
    {
      id: 1,
      text: "Pertama kali kita chatting sampai lupa waktu, dari sore sampai pagi 💕",
      emoji: "💬",
      color: "#ff69b4"
    },
    {
      id: 2,
      text: "Saat kamu bilang 'I love you' untuk pertama kalinya dengan muka merah 😊",
      emoji: "❤️",
      color: "#ff1493"
    },
    {
      id: 3,
      text: "Kencan pertama kita yang awkward tapi manis banget 🥰",
      emoji: "🌹",
      color: "#ff6b9d"
    },
    {
      id: 4,
      text: "Waktu kita jadian dan kamu nangis bahagia sampai mata bengkak 😭💕",
      emoji: "🎉",
      color: "#c44569"
    },
    {
      id: 5,
      text: "Momen kita masak bareng dan dapur jadi berantakan tapi ketawa terus 😂",
      emoji: "👨‍🍳",
      color: "#f8b500"
    },
    {
      id: 6,
      text: "Saat kamu tidur di pangkuanku sambil nonton film dan aku gak berani gerak 😴",
      emoji: "🎬",
      color: "#6c5ce7"
    },
    {
      id: 7,
      text: "Trip pertama kita berdua yang penuh drama tapi jadi cerita lucu sekarang 🗺️",
      emoji: "✈️",
      color: "#00b894"
    },
    {
      id: 8,
      text: "Waktu kamu sakit dan aku jaga seharian, rasanya jadi superhero 💪",
      emoji: "🩺",
      color: "#00cec9"
    },
    {
      id: 9,
      text: "Momen kita dance di kamar dengan musik kenceng dan tetangga complain 💃",
      emoji: "🎵",
      color: "#a29bfe"
    },
    {
      id: 10,
      text: "Setiap kali kamu senyum dan dunia rasanya jadi lebih cerah ✨",
      emoji: "😊",
      color: "#fd79a8"
    },
    {
      id: 11,
      text: "Waktu kita berantem kecil tapi langsung pelukan dan minta maaf 🤗",
      emoji: "🤝",
      color: "#fdcb6e"
    },
    {
      id: 12,
      text: "Malam-malam ngobrol sampai pagi tentang mimpi dan masa depan 🌙",
      emoji: "🌟",
      color: "#6c5ce7"
    }
  ];

  const openMemoryJar = () => {
    setIsShaking(true);
    
    // Shake animation
    setTimeout(() => {
      setIsShaking(false);
      
      // Show random memory
      const randomIndex = Math.floor(Math.random() * memories.length);
      setCurrentMemory(memories[randomIndex]);
      setShowMemory(true);
      
      // Confetti effect
      if (window.confetti) {
        window.confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1']
        });
      }
    }, 1000);
  };

  const closeMemory = () => {
    setShowMemory(false);
    setCurrentMemory(null);
  };

  return (
    <section className="memory-jar-section">
      <div className="container">
        <h2>🫙 Memory Jar</h2>
        <p className="section-subtitle">
          Klik toples ajaib ini untuk membuka kenangan manis yang tersimpan 💖
        </p>
        
        <div className="memory-jar-container">
          <div 
            className={`memory-jar ${isShaking ? 'shake' : ''}`}
            onClick={openMemoryJar}
          >
            <div className="jar-lid">
              <div className="lid-shine"></div>
            </div>
            <div className="jar-body">
              <div className="jar-content">
                {/* Floating memory particles */}
                <div className="memory-particle" style={{animationDelay: '0s'}}>💕</div>
                <div className="memory-particle" style={{animationDelay: '0.5s'}}>✨</div>
                <div className="memory-particle" style={{animationDelay: '1s'}}>💖</div>
                <div className="memory-particle" style={{animationDelay: '1.5s'}}>🌟</div>
                <div className="memory-particle" style={{animationDelay: '2s'}}>💝</div>
              </div>
              <div className="jar-reflection"></div>
            </div>
            <div className="jar-label">
              <span>Memories ♥</span>
            </div>
          </div>
          
          <div className="jar-instructions">
            <p>✨ Klik toples untuk membuka kenangan acak ✨</p>
          </div>
        </div>

        {/* Memory Modal */}
        {showMemory && currentMemory && (
          <div className="memory-modal-overlay" onClick={closeMemory}>
            <div className="memory-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-memory" onClick={closeMemory}>✕</button>
              <div className="memory-content">
                <div 
                  className="memory-emoji"
                  style={{ color: currentMemory.color }}
                >
                  {currentMemory.emoji}
                </div>
                <div className="memory-text">
                  {currentMemory.text}
                </div>
                <div className="memory-footer">
                  <span>Kenangan #{currentMemory.id}</span>
                  <button className="new-memory-btn" onClick={openMemoryJar}>
                    🎲 Kenangan Lain
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MemoryJar;
