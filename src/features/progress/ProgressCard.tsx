
import React from 'react';
import './ProgressCard.css';

interface Lesson {
  id: number;
  title: string;
  emoji: string;
  maxStars: number;
}

interface ProgressCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  stars: number;
  onStart: () => void;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ lesson, isCompleted, stars, onStart }) => {
  const getCompletionColor = () => {
    if (stars === 3) return '#ffd700';
    if (stars === 2) return '#4ecdc4';
    if (stars === 1) return '#ff9a9e';
    return '#ddd';
  };

  return (
    <div className={`progress-card ${isCompleted ? 'completed' : ''}`} style={{ borderColor: getCompletionColor() }}>
      <div className="card-header">
        <div className="lesson-emoji">{lesson.emoji}</div>
        <div className="lesson-title">{lesson.title}</div>
        <div className={`status-badge ${isCompleted ? 'completed' : 'pending'}`}>
          {isCompleted ? '✅ Completed' : '🔒 Locked'}
        </div>
      </div>

      <div className="progress-content">
        <div className="stars-container">
          {[...Array(lesson.maxStars)].map((_, i) => (
            <span
              key={i}
              className={`star ${i < stars ? 'filled' : 'empty'}`}
            >
              ⭐
            </span>
          ))}
          <span className="stars-count">{stars}/{lesson.maxStars}</span>
        </div>

        <div className="progress-details">
          {isCompleted ? (
            <>
              <div className="detail-row">
                <span className="detail-label">Performance:</span>
                <span className={`detail-value ${stars === 3 ? 'excellent' : stars === 2 ? 'good' : 'fair'}`}>
                  {stars === 3 && '🌟 Excellent!'}
                  {stars === 2 && '👍 Great!'}
                  {stars === 1 && '💪 Good Start!'}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Next Step:</span>
                <span className="detail-value review">Review to earn more stars!</span>
              </div>
            </>
          ) : (
            <>
              <div className="detail-row">
                <span className="detail-label">Ready When:</span>
                <span className="detail-value">Complete previous lessons</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Preview:</span>
                <span className="detail-value">Fun keyboard adventure!</span>
              </div>
            </>
          )}
        </div>
      </div>

      <button 
        onClick={onStart}
        className={`action-button ${isCompleted ? 'review' : 'start'}`}
        disabled={!isCompleted && lesson.id !== 0}
      >
        {isCompleted ? (
          <>
            🔄 Practice Again
            <span className="button-emoji">✨</span>
          </>
        ) : lesson.id === 0 ? (
          <>
            🚀 Start Lesson
            <span className="button-emoji">🎮</span>
          </>
        ) : (
          <>
            🔒 Complete Previous
            <span className="button-emoji">📚</span>
          </>
        )}
      </button>

      {!isCompleted && lesson.id > 0 && (
        <div className="locked-hint">
          💡 Finish lesson {lesson.id} first to unlock this adventure!
        </div>
      )}
    </div>
  );
};

export default ProgressCard;
