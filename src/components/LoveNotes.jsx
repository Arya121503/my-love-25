// src/components/LoveNotes.jsx
import React, { useState, useEffect } from "react";
import "../styles/LoveNotes.css";

const LoveNotes = () => {
  const loveNotes = [
    {
      title: "Untuk Cinta Hatiku 💖",
      message: "Setiap hari bersamamu adalah hadiah yang tak ternilai. Terima kasih telah menjadi alasan senyumku setiap pagi.",
      date: "Setiap Hari"
    },
    {
      title: "Kenangan Terindah 🌟",
      message: "Dari percakapan pertama hingga detik ini, setiap momen bersamamu adalah kenangan yang ingin kuingat selamanya.",
      date: "Abadi"
    },
    {
      title: "Janji Cinta 💍",
      message: "Aku berjanji akan selalu ada untukmu, dalam suka dan duka, tertawa dan tangis, sekarang dan selamanya.",
      date: "Untuk Selamanya"
    },
    {
      title: "Harapan Masa Depan 🌈",
      message: "Bersama denganmu, aku bermimpi tentang masa depan yang penuh warna, petualangan baru, dan cinta yang terus bertumbuh.",
      date: "Menuju Masa Depan"
    }
  ];

  const [currentNote, setCurrentNote] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentNote((prev) => (prev + 1) % loveNotes.length);
        setIsVisible(true);
      }, 500);
    }, 8000);

    return () => clearInterval(timer);
  }, [loveNotes.length]);

  const handlePrevious = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentNote((prev) => (prev - 1 + loveNotes.length) % loveNotes.length);
      setIsVisible(true);
    }, 300);
  };

  const handleNext = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentNote((prev) => (prev + 1) % loveNotes.length);
      setIsVisible(true);
    }, 300);
  };

  return (
    <div className="love-notes-container">
      <h2>Surat Cinta Kecil 💌</h2>
      <div className={`love-note ${isVisible ? 'visible' : 'hidden'}`}>
        <div className="note-header">
          <h3>{loveNotes[currentNote].title}</h3>
          <span className="note-date">{loveNotes[currentNote].date}</span>
        </div>
        <p className="note-message">{loveNotes[currentNote].message}</p>
        <div className="note-signature">
          <span>Dengan Cinta,</span>
          <span className="signature">Hati yang Mencintaimu ❤️</span>
        </div>
      </div>
      
      <div className="note-controls">
        <button onClick={handlePrevious} className="note-btn">
          ❮ Sebelumnya
        </button>
        <div className="note-indicators">
          {loveNotes.map((_, index) => (
            <span 
              key={index} 
              className={`indicator ${index === currentNote ? 'active' : ''}`}
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => {
                  setCurrentNote(index);
                  setIsVisible(true);
                }, 300);
              }}
            >
              💖
            </span>
          ))}
        </div>
        <button onClick={handleNext} className="note-btn">
          Selanjutnya ❯
        </button>
      </div>
    </div>
  );
};

export default LoveNotes;
