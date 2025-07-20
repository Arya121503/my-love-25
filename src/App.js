import React, { useState, useEffect } from "react";
import "./App.css";
import AuthLogin from "./components/AuthLogin";
import HeroSection from "./components/HeroSection";
import Timeline from "./components/Timeline";
import Roadmap from "./components/Roadmap";
import LoveNotes from "./components/LoveNotes";
import Countdown from "./components/Countdown";
import ParticleBackground from "./components/ParticleBackground";
import AudioManager from "./components/AudioManager";
import MemoryJar from "./components/MemoryJar";
import LoveQuiz from "./components/LoveQuiz";
import LDRDashboard from "./components/LDRDashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);

  // Check if user is already authenticated (using localStorage)
  useEffect(() => {
    const authStatus = localStorage.getItem('loveStoryAuth');
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
      setShowMainContent(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('loveStoryAuth', 'authenticated');
    
    // Add a beautiful transition delay
    setTimeout(() => {
      setShowMainContent(true);
    }, 500);
  };

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <AuthLogin onLoginSuccess={handleLoginSuccess} />;
  }

  // Show loading transition
  if (!showMainContent) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ff69b4, #ff1493)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '2rem',
        fontWeight: '600'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💖</div>
          <p>Memuat Dunia Cinta Kita...</p>
        </div>
      </div>
    );
  }

  // Show main content
  return (
    <>
      <ParticleBackground />
      <HeroSection onScrollToNext={scrollToNext} />
      <LDRDashboard />
      <Timeline />
      <Roadmap />
      <LoveNotes />
      <MemoryJar />
      <LoveQuiz />
      <Countdown />
      <AudioManager />
    </>
  );
}

export default App;
