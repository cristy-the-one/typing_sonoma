
import React, { useState, useEffect, useRef, useCallback } from 'react';
import './LessonScreen.css';
import { createParticles } from '../../components/Particles';

interface LessonScreenProps {
  lessonIndex: number;
  onComplete: (index: number, totalKeystrokes: number, correctKeystrokes: number) => void;
  onBack: () => void;
}

const lessons = [
  {
    id: 0,
    title: "Let's Meet the Keys!",
    emoji: "🎹",
    instructions: "Press each key as it lights up! Watch where your fingers go!",
    exercises: [
      "a", "s", "d", "f", "j", "k", "l", ";",
      "Press a then s", "Press d then f", "Press j then k",
      "g h", "Press space", "Press enter"
    ],
    targetKeys: "asdfjkl; gh ".split(''), // includes space character
  },
  {
    id: 1,
    title: "Happy Home Row",
    emoji: "🏠",
    instructions: "Stay on the home row! Your fingers belong here: asdf jkl;",
    exercises: [
      "asdf", "jkl;", "as df", "jk l;", "f d s a", "; l k j",
      "The quick", "brown fox", "jumps over"
    ],
    targetKeys: "asdfjkl; ".split(''),
  },
  {
    id: 2,
    title: "Top Row Adventure",
    emoji: "⛰️",
    instructions: "Reach up to the top row! q w e r t y u i o p",
    exercises: [
      "qwer", "tyui", "op", "qw er", "ty ui", "op[]",
      "Quick", "type", "with", "your"
    ],
    targetKeys: "qwertyuiop".split(''),
  },
  {
    id: 3,
    title: "Bottom Row Quest",
    emoji: "🕳️",
    instructions: "Reach down to the bottom! z x c v b n m , . /",
    exercises: [
      "zxcv", "bnm", ",./", "zx cv", "bn m,", "., /",
      "Lazy", "dog", "jumps", "over"
    ],
    targetKeys: "zxcvbnm,./".split(''),
  },
  {
    id: 4,
    title: "Number Party!",
    emoji: "🎉",
    instructions: "Time for numbers! 1 2 3 4 5 6 7 8 9 0 - =",
    exercises: [
      "1234", "5678", "90-=", "12 34", "56 78", "90 -=",
      "1 cat", "2 dogs", "3 birds", "4 fish"
    ],
    targetKeys: "1234567890-=".split(''),
  },
  {
    id: 5,
    title: "Super Sentences",
    emoji: "💬",
    instructions: "Put it all together! Type these fun sentences",
    exercises: [
      "The cat sat on the mat",
      "I like to eat pizza",
      "My dog can jump high",
      "Birds fly in the sky",
      "Fish swim in the sea",
      "The sun is very bright"
    ],
    targetKeys: "abcdefghijklmnopqrstuvwxyz 1234567890".split(''),
  },
];

const LessonScreen: React.FC<LessonScreenProps> = ({ lessonIndex, onComplete, onBack }) => {
  const lesson = lessons[lessonIndex];
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [stats, setStats] = useState({ correct: 0, total: 0, streak: 0 });
  const [showCompletion, setShowCompletion] = useState(false);
  const [feedback, setFeedback] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentExercise = lesson.exercises[currentExerciseIndex];
  const currentChar = currentExercise[currentCharIndex] || '';
  const isComplete = currentExerciseIndex >= lesson.exercises.length - 1 && 
                    currentCharIndex >= currentExercise.length;

  const isUppercaseExpected = currentChar === currentChar.toUpperCase() && currentChar.length === 1 && 
                             'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(currentChar);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    // Always capture key events regardless of focused element
    event.preventDefault();
    
    if (showCompletion) return;

    const key = event.key;
    
    // Skip if key is undefined, null, or empty
    if (!key || key.length === 0) {
      return;
    }

    const expected = currentExercise[currentCharIndex];
    const isShiftKey = key === 'Shift';
    
    // Ignore shift key presses - they're not counted as keystrokes
    if (isShiftKey) {
      return;
    }

    setStats(prev => ({ ...prev, total: prev.total + 1 }));

    let isCorrect = false;
    let feedbackMessage = '';

    if (isUppercaseExpected) {
      // For uppercase letters, accept either the uppercase letter directly or lowercase + shift
      const lowercaseExpected = expected.toLowerCase();
      isCorrect = (key === expected) || 
                  (!!key && typeof key.toLowerCase === 'function' && key.toLowerCase() === lowercaseExpected && event.shiftKey);
      
      if (isCorrect) {
        feedbackMessage = 'Perfect! Great use of shift! 🎉';
      } else {
        feedbackMessage = `Try holding Shift + "${expected.toLowerCase()}". Capital letters need the shift key! ⌨️`;
      }
    } else {
      // For regular characters, match exactly (case-sensitive for symbols, etc.)
      isCorrect = key === expected;
      
      if (isCorrect) {
        feedbackMessage = 'Great job! 🎉';
      } else {
        // Safe check before calling toUpperCase
        const expectedDisplay = expected && expected.length > 0 ? expected.toUpperCase() : expected;
        feedbackMessage = `Almost! Try "${expected}" next. ${expectedDisplay} is your friend! 👆`;
      }
    }

    if (isCorrect) {
      const charToAdd = isUppercaseExpected && key && key.toLowerCase && key.toLowerCase() === expected.toLowerCase() ? expected : key;
      setUserInput(prev => prev + charToAdd);
      setStats(prev => ({
        ...prev,
        correct: prev.correct + 1,
        streak: prev.streak + 1
      }));
      setCurrentCharIndex(idx => idx + 1);

      // Create celebration particles
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        createParticles(containerRef.current, rect.width / 2, rect.height / 2, 'correct');
      }

      setFeedback(feedbackMessage);

      // Check if exercise complete
      if (currentCharIndex + 1 >= currentExercise.length) {
        setTimeout(() => {
          setCurrentExerciseIndex(idx => idx + 1);
          setCurrentCharIndex(0);
          setUserInput('');
          if (currentExerciseIndex + 1 >= lesson.exercises.length) {
            setShowCompletion(true);
            onComplete(lessonIndex, stats.total + 1, stats.correct + 1);
          }
        }, 800);
      }
    } else {
      setStats(prev => ({ ...prev, streak: 0 }));
      setFeedback(feedbackMessage);
      
      // Shake animation for wrong key
      if (containerRef.current) {
        containerRef.current.classList.add('shake');
        setTimeout(() => containerRef.current?.classList.remove('shake'), 500);
      }
    }

    setTimeout(() => setFeedback(''), 2500);
  }, [currentExercise, currentCharIndex, currentExerciseIndex, lesson.exercises.length, stats, lessonIndex, onComplete, showCompletion, isUppercaseExpected]);

  useEffect(() => {
    // Add global keydown listener that always captures events
    document.addEventListener('keydown', handleKeyPress, true); // Use capture phase to intercept all key events
    
    // Focus the input initially for better accessibility
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => {
      document.removeEventListener('keydown', handleKeyPress, true);
      clearTimeout(timer);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        onComplete(lessonIndex, stats.total, stats.correct);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isComplete, lessonIndex, stats.total, stats.correct, onComplete]);

  const progressPercentage = (
    (currentExerciseIndex + (currentCharIndex / currentExercise.length)) / 
    lesson.exercises.length * 100
  );

  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

  if (showCompletion) {
    return (
      <div className="completion-screen" ref={containerRef}>
        <div className="celebration">
          <div className="trophy">🏆</div>
          <h2>Amazing Job! You Did It!</h2>
          <p className="completion-stats">
            🎯 Accuracy: {accuracy}% | 
            🔥 Streak: {stats.streak} | 
            ⌨️ Total Keys: {stats.total}
          </p>
          <div className="completion-message">
            You're a typing superstar! 🌟 Your fingers are getting so smart!
          </div>
          <button onClick={onBack} className="big-button">
            ✨ Back to Lessons ✨
          </button>
        </div>
      </div>
    );
  }

  const getKeyClass = (char: string, index: number) => {
    if (index < currentCharIndex) return 'typed';
    if (index === currentCharIndex) return 'current';
    return 'upcoming';
  };

  const getSpecialKey = (char: string) => {
    switch (char) {
      case ' ': return 'Space';
      case '\n': return 'Enter';
      case '\t': return 'Tab';
      default: return char && char.length > 0 ? char.toUpperCase() : char;
    }
  };

  const getCurrentKeyHint = () => {
    if (isUppercaseExpected) {
      return `Hold Shift + ${currentChar.toLowerCase()}`;
    }
    return getSpecialKey(currentChar);
  };

  return (
    <div className="lesson-screen" ref={containerRef}>
      <button onClick={onBack} className="back-button">
        ← Back to Lessons
      </button>

      <div className="lesson-header">
        <h1>{lesson.emoji} {lesson.title}</h1>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="progress-text">
          Exercise {currentExerciseIndex + 1} of {lesson.exercises.length}
        </div>
      </div>

      <div className="lesson-content">
        <div className="instructions">
          <p>{lesson.instructions}</p>
          {isUppercaseExpected && (
            <p className="uppercase-hint">
              💡 Hold down the <strong>Shift</strong> key and press {currentChar.toLowerCase()} to make {currentChar}! 
              Both shift keys work! ⌨️
            </p>
          )}
          <p className="focus-hint">
            💡 Click anywhere or just start typing! Your keyboard is always ready! ⌨️
          </p>
        </div>

        <div className="exercise-display">
          <div className="current-exercise">
            {currentExercise.split('').map((char, index) => (
              <span
                key={index}
                className={`char ${getKeyClass(char, index)}`}
              >
                {char === ' ' ? '␣' : char}
              </span>
            ))}
          </div>
          
          <div className="key-hint">
            <div className="key-label">
              Press: <span className="highlight">{getCurrentKeyHint()}</span>
            </div>
            {isUppercaseExpected && (
              <div className="shift-indicator">
                <span className="shift-key">⇧</span> + <span className="letter-key">{currentChar.toLowerCase()}</span>
              </div>
            )}
            {!isUppercaseExpected && currentExercise.length === 1 && (
              <div className="finger-hint">
                Use your {currentChar === ' ' ? 'thumbs' : 'fingers'}! 👆
              </div>
            )}
          </div>
        </div>

        <div className="fixed-height-section">
          <div className="typing-area">
            <div className="user-input">
              {userInput.split('').map((char, index) => (
                <span key={index} className="input-char">
                  {char === ' ' ? '␣' : char}
                </span>
              ))}
            </div>
            
            {/* Hidden input for accessibility and initial focus */}
            <input
              ref={inputRef}
              type="text"
              value=""
              onChange={() => {}} // Prevent actual input
              style={{ 
                opacity: 0, 
                position: 'absolute',
                left: '-9999px',
                width: '1px',
                height: '1px'
              }}
              autoFocus
            />
            
            {/* Invisible overlay to capture clicks and refocus */}
            <div 
              className="focus-catcher"
              onClick={() => inputRef.current?.focus()}
              tabIndex={-1}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1
              }}
            />
          </div>

          <div className="stats-display">
            <div className="stat">
              <span className="stat-label">Accuracy:</span>
              <span className="stat-value">{accuracy}%</span>
            </div>
            <div className="stat">
              <span className="stat-label">Streak:</span>
              <span className="stat-value streak">{stats.streak} 🔥</span>
            </div>
            <div className="stat">
              <span className="stat-label">Speed:</span>
              <span className="stat-value">Super Fast! 🚀</span>
            </div>
          </div>

          {feedback && (
            <div className="feedback">
              {feedback}
            </div>
          )}
        </div>

        <div className="encouragement">
          {stats.streak >= 5 && (
            <div className="streak-celebration">
              Wow! {stats.streak} in a row! You're unstoppable! 🎊
            </div>
          )}
          {accuracy >= 90 && (
            <div className="accuracy-celebration">
              Perfect accuracy! Your fingers are magical! ✨
            </div>
          )}
          {isUppercaseExpected && (
            <div className="uppercase-tip">
              💡 Remember: Hold Shift for capital letters! Both left and right Shift work! ⌨️
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonScreen;
