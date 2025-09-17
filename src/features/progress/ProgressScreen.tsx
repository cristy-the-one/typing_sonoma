
import React, { useState } from 'react';
import './ProgressScreen.css';
import ProgressCard from './ProgressCard';

interface Stats {
  totalKeystrokes: number;
  correctKeystrokes: number;
  lessonsCompleted: number;
}

interface ProgressData {
  completedLessons: number[];
  currentLesson: number;
  stats: Stats;
}

interface ProgressScreenProps {
  progress: ProgressData;
  onStartLesson: (index: number) => void;
  onBack: () => void;
}

const ProgressScreen: React.FC<ProgressScreenProps> = ({
  progress,
  onStartLesson,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed'>('overview');

  const lessons = [
    { id: 0, title: "Meet the Keys", emoji: "🎹", maxStars: 3 },
    { id: 1, title: "Home Row", emoji: "🏠", maxStars: 3 },
    { id: 2, title: "Top Row", emoji: "⛰️", maxStars: 3 },
    { id: 3, title: "Bottom Row", emoji: "🕳️", maxStars: 3 },
    { id: 4, title: "Numbers", emoji: "🎉", maxStars: 3 },
    { id: 5, title: "Sentences", emoji: "💬", maxStars: 3 },
  ];

  const totalAccuracy = progress.stats.totalKeystrokes > 0 
    ? Math.round((progress.stats.correctKeystrokes / progress.stats.totalKeystrokes) * 100)
    : 0;

  const getStarsForLesson = (lessonId: number) => {
    // Simple calculation based on completion and overall accuracy
    if (!progress.completedLessons.includes(lessonId)) return 0;
    
    if (totalAccuracy >= 90) return 3;
    if (totalAccuracy >= 75) return 2;
    return 1;
  };

  return (
    <div className="progress-screen">
      <button onClick={onBack} className="back-button">
        ← Back to Home
      </button>

      <h1>🏆 Your Typing Journey</h1>

      <div className="tab-buttons">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button 
          className={`tab-button ${activeTab === 'detailed' ? 'active' : ''}`}
          onClick={() => setActiveTab('detailed')}
        >
          📚 Lessons
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="overview-section">
          <div className="main-stats">
            <div className="stat-card overall">
              <div className="stat-emoji">🎯</div>
              <div className="stat-value">{totalAccuracy}%</div>
              <div className="stat-label">Overall Accuracy</div>
              <div className={`accuracy-badge ${totalAccuracy >= 90 ? 'excellent' : totalAccuracy >= 75 ? 'good' : 'needs-work'}`}>
                {totalAccuracy >= 90 && '🌟 EXCELLENT!'}
                {totalAccuracy >= 75 && totalAccuracy < 90 && '👍 GREAT!'}
                {totalAccuracy < 75 && '💪 KEEP GOING!'}
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-emoji">⭐</div>
              <div className="stat-value">{progress.stats.lessonsCompleted}</div>
              <div className="stat-label">Lessons Complete</div>
              <div className="progress-bar-small">
                <div 
                  className="progress-fill-small" 
                  style={{ width: `${(progress.stats.lessonsCompleted / lessons.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-emoji">⌨️</div>
              <div className="stat-value">{progress.stats.totalKeystrokes}</div>
              <div className="stat-label">Total Keystrokes</div>
              <div className="milestone">
                {progress.stats.totalKeystrokes >= 500 && '🏆 Typing Master!'}
                {progress.stats.totalKeystrokes >= 100 && progress.stats.totalKeystrokes < 500 && '📈 Growing Fast!'}
                {progress.stats.totalKeystrokes < 100 && '🚀 Just Getting Started!'}
              </div>
            </div>
          </div>

          <div className="achievements">
            <h3>🎖️ Your Achievements</h3>
            <div className="achievement-grid">
              <div className={`achievement ${progress.stats.lessonsCompleted >= 1 ? 'unlocked' : ''}`}>
                <div className="achievement-emoji">🌱</div>
                <div className="achievement-title">First Steps</div>
                <div className="achievement-desc">Complete your first lesson</div>
              </div>

              <div className={`achievement ${progress.stats.lessonsCompleted >= 3 ? 'unlocked' : ''}`}>
                <div className="achievement-emoji">🌟</div>
                <div className="achievement-title">Rising Star</div>
                <div className="achievement-desc">Complete 3 lessons</div>
              </div>

              <div className={`achievement ${progress.stats.lessonsCompleted >= 6 ? 'unlocked' : ''}`}>
                <div className="achievement-emoji">👑</div>
                <div className="achievement-title">Typing Royalty</div>
                <div className="achievement-desc">Complete all lessons</div>
              </div>

              <div className={`achievement ${totalAccuracy >= 90 ? 'unlocked' : ''}`}>
                <div className="achievement-emoji">🎯</div>
                <div className="achievement-title">Perfect Aim</div>
                <div className="achievement-desc">Get 90%+ accuracy</div>
              </div>

              <div className={`achievement ${progress.stats.totalKeystrokes >= 500 ? 'unlocked' : ''}`}>
                <div className="achievement-emoji">⚡</div>
                <div className="achievement-title">Speed Demon</div>
                <div className="achievement-desc">Type 500+ keystrokes</div>
              </div>

              <div className={`achievement ${totalAccuracy >= 95 && progress.stats.lessonsCompleted >= 6 ? 'unlocked' : ''}`}>
                <div className="achievement-emoji">🏆</div>
                <div className="achievement-title">Ultimate Typist</div>
                <div className="achievement-desc">Master everything!</div>
              </div>
            </div>
          </div>

          <div className="motivation">
            <h3>💡 Keep Going!</h3>
            <p>
              {totalAccuracy >= 90 ? (
                "You're doing amazing! Practice makes perfect - keep those fingers dancing! 🎶"
              ) : totalAccuracy >= 75 ? (
                "Great progress! You're getting faster every day. Just a little more practice! 🚀"
              ) : (
                "Every keystroke makes you better! Don't worry about mistakes - they're part of learning! 💪"
              )}
            </p>
          </div>
        </div>
      )}

      {activeTab === 'detailed' && (
        <div className="detailed-section">
          <div className="lessons-progress">
            {lessons.map((lesson) => (
              <ProgressCard
                key={lesson.id}
                lesson={lesson}
                isCompleted={progress.completedLessons.includes(lesson.id)}
                stars={getStarsForLesson(lesson.id)}
                onStart={() => onStartLesson(lesson.id)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="progress-actions">
        <button onClick={() => setActiveTab('overview')} className="action-button">
          📊 View Overview
        </button>
        <button onClick={() => setActiveTab('detailed')} className="action-button">
          📚 View Lessons
        </button>
        <button onClick={onBack} className="home-button">
          🏠 Back to Adventure
        </button>
      </div>
    </div>
  );
};

export default ProgressScreen;
