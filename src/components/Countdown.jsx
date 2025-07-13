// src/components/Countdown.jsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import "../styles/Countdown.css";

const Countdown = () => {
  // Ulang tahun ke-26 (set sesuai tanggal aslinya)
  const nextBirthday = useMemo(() => new Date("2026-07-23T00:00:00"), []);

  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const difference = nextBirthday - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isSpecialDay: true
      };
    }

    const timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isSpecialDay: false
    };

    return timeLeft;
  }, [nextBirthday]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const getRandomLoveMessage = () => {
    const messages = [
      "Setiap detik denganmu adalah kebahagiaan 💕",
      "Waktu berlalu, cinta kita semakin kuat 💖",
      "Menuju cerita baru yang indah bersama 🌟",
      "Setiap hari denganmu adalah hadiah 🎁",
      "Cinta kita abadi seperti waktu ⏰💝"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const [currentMessage, setCurrentMessage] = useState(getRandomLoveMessage());

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const messageTimer = setInterval(() => {
      setCurrentMessage(getRandomLoveMessage());
    }, 5000);
    return () => clearInterval(messageTimer);
  }, []);

  if (timeLeft.isSpecialDay) {
    return (
      <div className="countdown-container">
        <h2>🎉 Selamat Ulang Tahun Sayang! 🎉</h2>
        <div className="special-message">
          Hari istimewa telah tiba! Semoga tahun ini membawa lebih banyak kebahagiaan, cinta, dan momen indah untuk kita berdua. Happy Birthday, My Love! 💕🎂
        </div>
        <div className="countdown-hearts">💖✨🎈🎉💖</div>
      </div>
    );
  }

  return (
    <div className="countdown-container">
      <h2>Menuju Usia 26 🎉</h2>
      <div className="countdown-display">
        <p>
          <strong>{timeLeft.days}</strong> hari{" "}
          <strong>{timeLeft.hours}</strong> jam{" "}
          <strong>{timeLeft.minutes}</strong> menit{" "}
          <strong>{timeLeft.seconds}</strong> detik
        </p>
      </div>
      <div className="countdown-hearts">💕 💖 💕</div>
      <span className="countdown-note">
        {currentMessage}
      </span>
      <button className="scroll-to-top-btn" onClick={scrollToTop}>
        ⬆️ Kembali ke Atas
      </button>
    </div>
  );
};

export default Countdown;
