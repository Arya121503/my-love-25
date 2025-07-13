// src/components/Timeline.jsx
import React, { useState, useEffect } from "react";
import "../styles/Timeline.css";
import ImageModal from "./ImageModal";
import firstTimeChatting from "../assets/images/firsttime-chatting.png";
import jadian from "../assets/images/jadian.png";
import vcnugas from "../assets/images/vcnugas.jpg";
import sharenomor from "../assets/images/sharenomor.jpg";
import vchabisbelanja from "../assets/images/vchabisbelanja.jpg";

const timelineData = [
  {
    date: "04 September 2024",
    title: "Hari Pertama chattingan",
    description: "perkenalan yang sangat absurd, berawal setelah join voice gimob, dan bahas tentang hubungan ilyas dan missya",
    image: firstTimeChatting,
  },
  {
    date: "25 September 2024",
    title: "Jadian! 💖",
    description: "Hari itu kejadian yang sangat diluar ekspektasi, dan awkward banget",
    image: jadian,
  },
  {
    date: "29 September 2024",
    title: "Hari Pertama save nomor wa",
    description: "Momen bersejarah saat kita saling menyimpan nomor WA",
    image: sharenomor,
  },
  {
    date: "19 Oktober  2024",
    title: "Nemenin ngerjain tugas",
    description: "Pertama kali nemenin kamu ngerjain tugas",
    image: vcnugas,
  },
  {
    date: "12 Oktober 2024",
    title: "VC habis belanja",
    description: "Kita VC bareng setelah kamu belanja, lagi ngeluarin mie tuh wkwkwk",
    image: vchabisbelanja
  }
];

const Timeline = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [modalImage, setModalImage] = useState({ src: '', alt: '', isOpen: false });

  const openModal = (src, alt) => {
    setModalImage({ src, alt, isOpen: true });
  };

  const closeModal = () => {
    setModalImage({ src: '', alt: '', isOpen: false });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleItems(prev => [...new Set([...prev, index])]);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const handleImageError = (e) => {
    console.error("Error loading image:", e.target.src);
    e.target.style.display = 'none';
  };

  return (
    <div className="timeline-container">
      <h2>Cerita Kita</h2>
      <div className="timeline">
        {timelineData.map((item, index) => (
          <div 
            key={index} 
            className={`timeline-item ${visibleItems.includes(index) ? 'animate-in' : ''}`}
            data-index={index}
          >
            <div 
              className="timeline-img-container"
              onClick={() => openModal(item.image, item.title)}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="timeline-img"
                onError={handleImageError}
                onLoad={() => console.log(`Image loaded: ${item.title}`)}
              />
              <div className="image-overlay">
                <span className="zoom-icon">🔍</span>
                <span className="zoom-text">Klik untuk memperbesar</span>
              </div>
            </div>
            <div className="timeline-content">
              <h3>{item.title}</h3>
              <span className="timeline-date">{item.date}</span>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <ImageModal 
        src={modalImage.src}
        alt={modalImage.alt}
        isOpen={modalImage.isOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default Timeline;
