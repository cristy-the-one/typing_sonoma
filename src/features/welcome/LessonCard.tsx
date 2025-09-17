
import React from 'react';
import './LessonCard.css';

interface Lesson {
  id: number;
  title: string;
  description: string;
  emoji: string;
  preview: string;
}

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  onStart: () => void;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, isCompleted, onStart }) => {
  return (
    <div className={`lesson-card ${isCompleted ? 'completed' : ''}`}>
      {isCompleted && (
        <div className="completion-badge">
          <span className="checkmark">✅</span>
          <span className="stars">⭐⭐⭐</span>
        </div>
      )}
      
      <div className="lesson-emoji">{lesson.emoji}</div>
      
      <div className="lesson-content">
        <h3>{lesson.title}</h3>
        <p>{lesson.description}</p>
        <div className="preview-keys">
          {lesson.preview.split(' ').map((group, index) => (
            <span key={index} className="key-group">
              {group.split('').map(char => (
                <span key={char} className="preview-key">{char}</span>
              ))}
            </span>
          ))}
        </div>
      </div>
      
      <button 
        onClick={onStart}
        className={`start-button ${isCompleted ? 'review-button' : ''}`}
        disabled={isCompleted}
      >
        {isCompleted ? (
          <>
            🔄 Review Lesson
            <span className="emoji-wiggle">✨</span>
          </>
        ) : (
          <>
            🚀 Start Adventure
            <span className="emoji-wiggle">🎮</span>
          </>
        )}
      </button>
    </div>
  );
};

export default LessonCard;
