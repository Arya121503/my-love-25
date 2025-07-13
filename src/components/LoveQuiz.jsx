// src/components/LoveQuiz.jsx
import React, { useState } from 'react';
import '../styles/LoveQuiz.css';

const LoveQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);

  const questions = [
    {
      question: "Apa makanan favorit pacar kamu?",
      options: [
        "Nasi Goreng",
        "Pizza",
        "Soto Ayam",
        "Bakso"
      ],
      correct: 0,
      explanation: "Nasi goreng memang favorit banget! 🍳"
    },
    {
      question: "Kapan hari anniversar kita?",
      options: [
        "14 Februari 2023",
        "25 September 2024", 
        "25 Juli 2023",
        "12 Desember 2023"
      ],
      correct: 1,
      explanation: "Tanggal yang tak akan pernah terlupa! 💕"
    },
    {
      question: "Apa film pertama yang kita tonton bersama?",
      options: [
        "guardians of the galaxy",
        "Moom lovers scarlet heart Ryeo",
        "Aang Avatar",
        "Perfect World"
      ],
      correct: 3,
      explanation: "first time nonton movie donghua pertama kali !!"
    },
    {
      question: "Game Pertama main bareng?",
      options: [
        "Valorant",
        "Once Human",
        "Palia",
        "Genshin Impact",
      ],
      correct: 3,
      explanation: "pertama kali main bareng di genshin impact, kamu yang ngajakin main"
    },
    {
      question: "pacar kamu yang sekarang siapa?",
      options: [
        "Aku",
        "Arya",
        "Bocil",
        "Arya Firmansyah"
      ],
      correct: 2,
      explanation: "pacara kamu yang sekarang masih bocil, tapi aku sayang kamu kok"
    }
  ];

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    
    if (percentage === 100) {
      return {
        title: "Perfect Love! 💯",
        message: "Wah, kamu benar-benar tahu semua tentang pasanganmu! Hubungan kalian pasti sangat solid dan penuh perhatian. Keep it up! 🥰",
        color: "#28a745"
      };
    } else if (percentage >= 80) {
      return {
        title: "Almost Perfect! 💕",
        message: "Sangat bagus! Kamu tahu banyak hal tentang pasanganmu. Sedikit lagi perfect nih! 😊",
        color: "#17a2b8"
      };
    } else if (percentage >= 60) {
      return {
        title: "Good Job! 👍",
        message: "Lumayan banget! Tapi masih bisa lebih mengenal pasangan lebih dalam lagi. Yuk, lebih banyak ngobrol! 💬",
        color: "#ffc107"
      };
    } else {
      return {
        title: "Need More Quality Time! 🤗",
        message: "Sepertinya kalian perlu lebih banyak quality time bersama. Yuk, lebih sering ngobrol dan sharing! 💝",
        color: "#dc3545"
      };
    }
  };

  if (!quizStarted) {
    return (
      <section className="love-quiz-section">
        <div className="container">
          <h2>💘 Love Quiz Challenge</h2>
          <p className="section-subtitle">
            Seberapa baik kamu mengenal pasanganmu? Ayo tes pengetahuanmu! 🤔💕
          </p>
          
          <div className="quiz-intro">
            <div className="quiz-preview">
              <div className="quiz-features">
                <div className="feature-item">
                  <span className="feature-icon">📝</span>
                  <span>5 Pertanyaan Seru</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">⏱️</span>
                  <span>No Time Limit</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🏆</span>
                  <span>Score & Tips</span>
                </div>
              </div>
              
              <button className="start-quiz-btn" onClick={startQuiz}>
                🚀 Mulai Quiz
              </button>
              
              <p className="quiz-hint">
                *Jawab dengan jujur ya! Ini bukan ujian, tapi cara seru untuk lebih mengenal satu sama lain 😉
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (showResult) {
    const result = getScoreMessage();
    
    return (
      <section className="love-quiz-section">
        <div className="container">
          <div className="quiz-result">
            <div className="result-header">
              <h2 style={{color: result.color}}>{result.title}</h2>
              <div className="score-display">
                <span className="score-number">{score}</span>
                <span className="score-total">/ {questions.length}</span>
              </div>
            </div>
            
            <p className="result-message">{result.message}</p>
            
            <div className="result-actions">
              <button className="retry-btn" onClick={startQuiz}>
                🔄 Coba Lagi
              </button>
              <button className="finish-btn" onClick={resetQuiz}>
                ✨ Selesai
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <section className="love-quiz-section">
      <div className="container">
        <div className="quiz-container">
          <div className="quiz-header">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{width: `${progress}%`}}
              ></div>
            </div>
            <span className="question-counter">
              Pertanyaan {currentQuestion + 1} dari {questions.length}
            </span>
          </div>
          
          <div className="question-card">
            <h3 className="question-text">{question.question}</h3>
            
            <div className="answers-grid">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  className={`answer-option ${selectedAnswer === index ? 'selected' : ''}`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="option-text">{option}</span>
                </button>
              ))}
            </div>
            
            <div className="question-actions">
              <button 
                className="next-btn"
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
              >
                {currentQuestion === questions.length - 1 ? '🏁 Lihat Hasil' : '➡️ Lanjut'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoveQuiz;
