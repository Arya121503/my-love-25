// src/components/ImageModal.jsx
import React, { useEffect, useCallback } from "react";
import "../styles/ImageModal.css";

const ImageModal = ({ src, alt, isOpen, onClose }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="image-modal-overlay" onClick={handleBackdropClick}>
      <div className="image-modal-content">
        <button className="image-modal-close" onClick={onClose}>
          ✕
        </button>
        <img src={src} alt={alt} className="image-modal-img" />
        <div className="image-modal-caption">
          <p>{alt}</p>
          <span className="modal-hint">Klik di luar gambar atau tekan ESC untuk menutup</span>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
