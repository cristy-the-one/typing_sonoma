
import React, { useState } from 'react';
import './WelcomeScreen.css';
import LessonCard from './LessonCard';

interface WelcomeScreenProps {
  onStartLesson: (index: number) => void;
  completedLessons: number[];
  goToProgress: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStartLesson,
  completedLessons,
  goToProgress,
}) => {
  const [showAnimation] = useState(true);

  const lessons = [
    {
      id: 0,
      title: "Let's Meet the Keys!",
      description: "Learn where all the letters live on your keyboard",
      emoji: "🎹",
      preview: "a s d f",
    },
    {
      id: 1,
      title: "Happy Home Row",
      description: "Practice the home row keys that your fingers love",
      emoji: "🏠",
      preview: "asdf jkl;",
    },
    {
      id: 2,
      title: "Top Row Adventure",
      description: "Climb up to the top row with q w e r t y",
      emoji: "⛰️",
      preview: "qwer tyui",
    },
    {
      id: 3,
      title: "Bottom Row Quest",
      description: "Explore the bottom row with z x c v b",
      emoji: "🕳️",
      preview: "zxcv bn m",
    },
    {
      id: 4,
      title: "Number Party!",
      description: "Celebrate with numbers 1-0",
      emoji: "🎉",
      preview: "1234 5678",
    },
    {
      id: 5,
      title: "Super Sentences",
      description: "Put it all together with fun sentences",
      emoji: "💬",
      preview: "the cat sat",
    },
  ];

  return (
    <div className={`welcome-screen ${showAnimation ? 'animate-in' : ''}`}>
      <div className="stars-container">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="star" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1.5 + Math.random() * 1}s`,
          }}>
            ⭐
          </div>
        ))}
      </div>
      
      <h1>✨ Keyboard Friends Adventure! ✨</h1>
      
      <div className="welcome-text">
        <p>🌟 Hello, young typist! Welcome to your magical keyboard journey!</p>
        <p>🎮 You'll meet friendly letters, learn where they live, and have fun typing adventures!</p>
        <p>👆 Just follow the colorful guides and press the keys that light up. You're going to be amazing!</p>
      </div>

      <div className="lessons-grid">
        {lessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            isCompleted={completedLessons.includes(lesson.id)}
            onStart={() => onStartLesson(lesson.id)}
          />
        ))}
      </div>

      <div className="welcome-actions">
        <button onClick={goToProgress} className="progress-button">
          🏆 See My Progress
        </button>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          ⬆️ Back to Top
        </button>
      </div>

      <div className="floating-hint">
        💡 <strong>Tip:</strong> Use your fingers on the home row (asdf jkl;) and let them dance to the right keys!
      </div>
    </div>
  );
};

export default WelcomeScreen;
