import React from "react";
import "./App.css";
import HeroSection from "./components/HeroSection";
import Timeline from "./components/Timeline";
import LoveNotes from "./components/LoveNotes";
import Countdown from "./components/Countdown";
import ParticleBackground from "./components/ParticleBackground";
import AudioManager from "./components/AudioManager";
import GuestBook from "./components/GuestBook";
import MemoryJar from "./components/MemoryJar";
import LoveQuiz from "./components/LoveQuiz";

function App() {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      <ParticleBackground />
      <HeroSection onScrollToNext={scrollToNext} />
      <Timeline />
      <LoveNotes />
      <MemoryJar />
      <LoveQuiz />
      <GuestBook />
      <Countdown />
      <AudioManager />
    </>
  );
}

export default App;
