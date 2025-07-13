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
        
        {/* Timeline Ending as Regular Item */}
        <div 
          className="timeline-item timeline-ending-item animate-in"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 240, 245, 0.95))',
            borderRadius: '30px',
            padding: '3rem',
            border: '2px solid rgba(214, 51, 132, 0.2)',
            boxShadow: '0 20px 60px rgba(214, 51, 132, 0.1)',
            margin: '4rem auto',
            maxWidth: '800px',
            textAlign: 'center'
          }}
        >
          <div style={{color: '#d63384', fontSize: '4rem', marginBottom: '1rem'}}>
            ∞
          </div>
          <h3 style={{fontSize: '2.5rem', color: '#d63384', marginBottom: '2rem', fontWeight: '700'}}>
            Dan masih banyak lagi...
          </h3>
          <p style={{fontSize: '1.2rem', lineHeight: '1.8', color: '#333', marginBottom: '1.5rem', fontStyle: 'italic'}}>
            Ini hanya sebagian kecil dari ribuan momen indah yang telah kita lalui bersama. 
            Setiap detik bersamamu adalah kenangan yang berharga, setiap tawa dan air mata 
            telah menjadi bagian dari cerita cinta kita yang tak akan pernah berakhir.
          </p>
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 105, 180, 0.1), rgba(255, 182, 193, 0.1))',
            padding: '1.5rem',
            borderRadius: '20px',
            border: '1px solid rgba(255, 105, 180, 0.2)',
            fontWeight: '600',
            color: '#d63384',
            marginBottom: '2rem'
          }}>
            💕 Untuk semua kenangan yang belum tercipta, semua petualangan yang menanti, 
            dan semua mimpi yang akan kita wujudkan bersama... 💕
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            margin: '2rem 0',
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.6)',
            borderRadius: '20px',
            border: '1px solid rgba(214, 51, 132, 0.1)'
          }}>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: '3rem', fontWeight: '700', color: '#d63384', marginBottom: '0.5rem'}}>∞</div>
              <div style={{fontSize: '1rem', color: '#666', fontWeight: '600', textTransform: 'uppercase'}}>Kenangan Indah</div>
            </div>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: '3rem', fontWeight: '700', color: '#d63384', marginBottom: '0.5rem'}}>∞</div>
              <div style={{fontSize: '1rem', color: '#666', fontWeight: '600', textTransform: 'uppercase'}}>Momen Bahagia</div>
            </div>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: '3rem', fontWeight: '700', color: '#d63384', marginBottom: '0.5rem'}}>1</div>
              <div style={{fontSize: '1rem', color: '#666', fontWeight: '600', textTransform: 'uppercase'}}>Cinta Sejati</div>
            </div>
          </div>
          <div style={{marginTop: '2rem'}}>
            <div style={{fontSize: '1.5rem', color: '#d63384', fontWeight: '600', fontStyle: 'italic', marginBottom: '1rem'}}>
              To be continued...
            </div>
            <div style={{display: 'flex', justifyContent: 'center', gap: '1rem'}}>
              <span style={{fontSize: '2rem'}}>💖</span>
              <span style={{fontSize: '2rem'}}>💕</span>
              <span style={{fontSize: '2rem'}}>💗</span>
              <span style={{fontSize: '2rem'}}>💘</span>
              <span style={{fontSize: '2rem'}}>💝</span>
            </div>
          </div>
        </div>
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
