
import React, { useState, useEffect } from 'react';
import './App.css';
import WelcomeScreen from './features/welcome/WelcomeScreen';
import LessonScreen from './features/lesson/LessonScreen';
import ProgressScreen from './features/progress/ProgressScreen';
import { persistence } from './utils/persistence';

interface ProgressData {
  completedLessons: number[];
  currentLesson: number;
  stats: {
    totalKeystrokes: number;
    correctKeystrokes: number;
    lessonsCompleted: number;
  };
}

const App: React.FC = () => {
  const [screen, setScreen] = useState<'welcome' | 'lesson' | 'progress'>('welcome');
  const [progress, setProgress] = useState<ProgressData>({
    completedLessons: [],
    currentLesson: 0,
    stats: {
      totalKeystrokes: 0,
      correctKeystrokes: 0,
      lessonsCompleted: 0,
    },
  });

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const saved = await persistence.getItem('typingProgress');
        if (saved) {
          setProgress(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Failed to load progress:', error);
      }
    };
    loadProgress();
  }, []);

  useEffect(() => {
    const saveProgress = async () => {
      try {
        await persistence.setItem('typingProgress', JSON.stringify(progress));
      } catch (error) {
        console.error('Failed to save progress:', error);
      }
    };
    if (screen !== 'welcome') {
      saveProgress();
    }
  }, [progress, screen]);

  const updateProgress = (newProgress: Partial<ProgressData>) => {
    setProgress(prev => ({ ...prev, ...newProgress }));
  };

  const startLesson = (lessonIndex: number) => {
    updateProgress({ currentLesson: lessonIndex });
    setScreen('lesson');
  };

  const completeLesson = (lessonIndex: number, keystrokes: number, correct: number) => {
    const newCompleted = [...progress.completedLessons, lessonIndex];
    const newStats = {
      ...progress.stats,
      totalKeystrokes: progress.stats.totalKeystrokes + keystrokes,
      correctKeystrokes: progress.stats.correctKeystrokes + correct,
      lessonsCompleted: progress.stats.lessonsCompleted + 1,
    };
    updateProgress({ completedLessons: newCompleted, stats: newStats });
    setScreen('progress');
  };

  const goToWelcome = () => setScreen('welcome');

  return (
    <div className="app">
      {screen === 'welcome' && (
        <WelcomeScreen
          onStartLesson={startLesson}
          completedLessons={progress.completedLessons}
          goToProgress={() => setScreen('progress')}
        />
      )}
      {screen === 'lesson' && (
        <LessonScreen
          lessonIndex={progress.currentLesson}
          onComplete={completeLesson}
          onBack={goToWelcome}
        />
      )}
      {screen === 'progress' && (
        <ProgressScreen
          progress={progress}
          onStartLesson={startLesson}
          onBack={goToWelcome}
        />
      )}
    </div>
  );
};

export default App;
