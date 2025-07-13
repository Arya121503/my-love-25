// src/components/AuthLogin.jsx
import React, { useState } from 'react';
import '../styles/AuthLogin.css';

const AuthLogin = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    partnerName: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  // Valid credentials
  const validCredentials = {
    names: ['amilah zahiroh', 'amilah zahiro'],
    birthDate: '2000-07-23', // Format YYYY-MM-DD for input type="date"
    partnerNames: ['arya firmansyah']
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate name
    const nameInput = formData.name.toLowerCase().trim();
    if (!nameInput) {
      newErrors.name = 'Nama harus diisi';
    } else if (!validCredentials.names.includes(nameInput)) {
      newErrors.name = 'Nama tidak valid. Coba lagi sayang! 💕';
    }
    
    // Validate birth date
    if (!formData.birthDate) {
      newErrors.birthDate = 'Tanggal lahir harus diisi';
    } else if (formData.birthDate !== validCredentials.birthDate) {
      newErrors.birthDate = 'Tanggal lahir tidak sesuai. Ingat tanggal special kita! 🎂';
    }
    
    // Validate partner name
    const partnerNameInput = formData.partnerName.toLowerCase().trim();
    if (!partnerNameInput) {
      newErrors.partnerName = 'Nama pacar harus diisi';
    } else if (!validCredentials.partnerNames.includes(partnerNameInput)) {
      newErrors.partnerName = 'Nama pacar tidak valid. Siapa nama lengkap pacarmu? 😊';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setShowHearts(true);
    
    // Simulate loading and create beautiful entrance effect
    setTimeout(() => {
      // Confetti effect
      if (window.confetti) {
        window.confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1']
        });
      }
      
      setTimeout(() => {
        onLoginSuccess();
      }, 1000);
    }, 2000);
  };

  const createFloatingHeart = (e) => {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.className = 'floating-heart-click';
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    heart.style.position = 'fixed';
    heart.style.fontSize = '2rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '10000';
    heart.style.animation = 'floatUpClick 2s ease-out forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
      document.body.removeChild(heart);
    }, 2000);
  };

  if (showHearts) {
    return (
      <div className="login-success">
        <div className="success-content">
          <div className="success-hearts">
            <span>💖</span>
            <span>💕</span>
            <span>💗</span>
            <span>💘</span>
            <span>💝</span>
          </div>
          <h2>Selamat Datang, Sayang! 🎉</h2>
          <p>Masuk ke dunia kenangan indah kita...</p>
          <div className="loading-hearts">
            <div className="heart-loader">💖</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container" onClick={createFloatingHeart}>
      <div className="auth-background">
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}>
              {['💕', '💖', '💗', '💘', '💝'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      </div>
      
      <div className="auth-card">
        <div className="auth-header">
          <h1>💖 Welcome to Our Love Story 💖</h1>
          <p>Masukkan informasi untuk mengakses kenangan indah kita</p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nama Lengkap 💕</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Masukkan nama lengkap kamu..."
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="birthDate">Tanggal Lahir 🎂</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              className={errors.birthDate ? 'error' : ''}
            />
            {errors.birthDate && <span className="error-message">{errors.birthDate}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="partnerName">Nama Lengkap Pacar 💘</label>
            <input
              type="text"
              id="partnerName"
              name="partnerName"
              value={formData.partnerName}
              onChange={handleInputChange}
              placeholder="Masukkan nama lengkap pacarmu..."
              className={errors.partnerName ? 'error' : ''}
            />
            {errors.partnerName && <span className="error-message">{errors.partnerName}</span>}
          </div>
          
          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Memuat Kenangan...
              </>
            ) : (
              <>
                ✨ Masuk ke Dunia Cinta Kita ✨
              </>
            )}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>✨ Klik di mana saja untuk menciptakan cinta ✨</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
