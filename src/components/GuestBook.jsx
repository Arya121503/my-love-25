// src/components/GuestBook.jsx
import React, { useState, useEffect } from 'react';
import '../styles/GuestBook.css';

const GuestBook = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [guestName, setGuestName] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('guestBookMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Add some default messages
      const defaultMessages = [
        {
          id: 1,
          name: "Teman Baik",
          message: "Selamat ulang tahun! Semoga kalian selalu bahagia bersama 💕",
          timestamp: new Date().toLocaleString('id-ID')
        },
        {
          id: 2,
          name: "Keluarga",
          message: "Happy birthday sayang! Tahun ini pasti lebih indah lagi 🎂✨",
          timestamp: new Date().toLocaleString('id-ID')
        }
      ];
      setMessages(defaultMessages);
      localStorage.setItem('guestBookMessages', JSON.stringify(defaultMessages));
    }
  }, []);

  const addMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && guestName.trim()) {
      const message = {
        id: Date.now(),
        name: guestName.trim(),
        message: newMessage.trim(),
        timestamp: new Date().toLocaleString('id-ID')
      };
      
      const updatedMessages = [message, ...messages];
      setMessages(updatedMessages);
      localStorage.setItem('guestBookMessages', JSON.stringify(updatedMessages));
      
      setNewMessage('');
      setGuestName('');
      setIsFormVisible(false);
      
      // Show confetti when message is added
      if (window.confetti) {
        window.confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 }
        });
      }
    }
  };

  return (
    <section className="guest-book">
      <div className="container">
        <h2>📖 Buku Tamu Digital</h2>
        <p className="section-subtitle">Tinggalkan pesan manis untuk pasangan yang sedang merayakan cinta 💌</p>
        
        <div className="guest-book-content">
          <div className="add-message-section">
            {!isFormVisible ? (
              <button 
                className="add-message-btn"
                onClick={() => setIsFormVisible(true)}
              >
                ✍️ Tulis Pesan Ucapan
              </button>
            ) : (
              <form className="message-form" onSubmit={addMessage}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Nama kamu..."
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    maxLength={50}
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="Tulis pesan ucapan yang manis..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    maxLength={200}
                    rows={4}
                    required
                  />
                </div>
                <div className="form-buttons">
                  <button type="submit" className="submit-btn">
                    💌 Kirim Pesan
                  </button>
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => setIsFormVisible(false)}
                  >
                    ❌ Batal
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="messages-container">
            {messages.length === 0 ? (
              <div className="no-messages">
                <p>Belum ada pesan. Jadilah yang pertama! 🌟</p>
              </div>
            ) : (
              <div className="messages-grid">
                {messages.map((msg) => (
                  <div key={msg.id} className="message-card">
                    <div className="message-header">
                      <span className="message-author">💝 {msg.name}</span>
                      <span className="message-time">{msg.timestamp}</span>
                    </div>
                    <p className="message-text">{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestBook;
