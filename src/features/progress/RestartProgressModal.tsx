
import React from 'react';
import './RestartProgressModal.css';

interface RestartProgressModalProps {
  lessonId?: number;
  onConfirm: () => void;
  onCancel: () => void;
}

const RestartProgressModal: React.FC<RestartProgressModalProps> = ({
  lessonId,
  onConfirm,
  onCancel,
}) => {
  const lessons = [
    { id: 0, title: "Meet the Keys" },
    { id: 1, title: "Home Row" },
    { id: 2, title: "Top Row" },
    { id: 3, title: "Bottom Row" },
    { id: 4, title: "Numbers" },
    { id: 5, title: "Sentences" },
  ];

  const lesson = lessonId !== undefined ? lessons[lessonId] : null;

  if (lessonId !== undefined && !lesson) {
    return null;
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.transform = 'scale(1.02)';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.transform = 'scale(1)';
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          {lesson ? (
            <>
              <div className="modal-emoji">🔄</div>
              <h2>Reset {lesson.title}?</h2>
            </>
          ) : (
            <>
              <div className="modal-emoji">🎮</div>
              <h2>Start Fresh Adventure?</h2>
            </>
          )}
        </div>

        <div className="modal-content">
          {lesson ? (
            <>
              <p className="warning-text">
                Are you sure you want to reset your progress for "{lesson.title}"?
              </p>
              <div className="modal-details">
                <div className="detail-item">
                  <span className="detail-icon">⭐</span>
                  <span>Your stars and completion status will be removed</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">📊</span>
                  <span>Your keystroke stats for this lesson will be reset</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">🎯</span>
                  <span>You can practice this lesson again from the beginning</span>
                </div>
              </div>
              <p className="subtle-text">
                This only affects this specific lesson. Your other progress is safe! 💾
              </p>
            </>
          ) : (
            <>
              <p className="warning-text">
                Are you sure you want to restart your entire typing journey?
              </p>
              <div className="modal-details">
                <div className="detail-item">
                  <span className="detail-icon">🏆</span>
                  <span>All completed lessons will be unmarked</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">📈</span>
                  <span>All statistics (keystrokes, accuracy) will be reset to zero</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">🎖️</span>
                  <span>All achievements will need to be earned again</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">🌟</span>
                  <span>You'll start back at Lesson 1 with a fresh adventure!</span>
                </div>
              </div>
              <p className="subtle-text">
                This action cannot be undone. Your current progress will be lost forever! 😢
              </p>
            </>
          )}
        </div>

        <div className="modal-actions">
          <button 
            onClick={onCancel} 
            className="cancel-button"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            ❌ Cancel
          </button>
          
          <button 
            onClick={onConfirm} 
            className="confirm-button"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {lesson ? '🔄 Reset Lesson' : '🎮 Start Over'}
          </button>
        </div>

        <div className="modal-footer">
          {lesson ? (
            <p className="hint-text">
              💡 You can always practice lessons anytime, but this will remove your completion status.
            </p>
          ) : (
            <p className="hint-text">
              💡 Perfect for when you want to relive the adventure or challenge yourself from the beginning!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestartProgressModal;
