import React, { useState, useEffect, useCallback } from 'react';

export default function RideMeGame({ onClose }) {
  const [carPosition, setCarPosition] = useState(50); // percentage from left
  const [hearts, setHearts] = useState([]);
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [message, setMessage] = useState('');

  const romanticMessages = [
    "You drive straight to my heart 💖",
    "Our love journey continues 🚗💞",
    "More love for us 😚",
    "Destination: Forever ❤️",
    "You're my favorite driver 💕",
    "Love is the best ride 🚗❤️"
  ];

  // Generate falling hearts
  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameWon) {
        setHearts(prev => [...prev, {
          id: Date.now(),
          x: Math.random() * 90 + 5, // 5% to 95% to avoid edges
          y: -10,
          speed: 2 + Math.random() * 2
        }]);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [gameWon]);

  // Move hearts down
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev => prev.map(heart => ({
        ...heart,
        y: heart.y + heart.speed
      })).filter(heart => heart.y < 120)); // Remove hearts that fall off screen
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Check for collisions
  useEffect(() => {
    const checkCollisions = () => {
      setHearts(prev => prev.filter(heart => {
        const carLeft = carPosition - 5; // car width approximation
        const carRight = carPosition + 5;

        if (heart.y > 85 && heart.y < 95 && heart.x > carLeft && heart.x < carRight) {
          // Collision detected!
          setScore(prev => {
            const newScore = prev + 1;
            if (newScore >= 10) {
              setGameWon(true);
            }
            return newScore;
          });

          // Show random romantic message
          setMessage(romanticMessages[Math.floor(Math.random() * romanticMessages.length)]);
          setTimeout(() => setMessage(''), 2000);

          return false; // Remove heart
        }
        return true; // Keep heart
      }));
    };

    const collisionInterval = setInterval(checkCollisions, 50);
    return () => clearInterval(collisionInterval);
  }, [carPosition, romanticMessages]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        setCarPosition(prev => Math.max(5, prev - 5));
      } else if (e.key === 'ArrowRight') {
        setCarPosition(prev => Math.min(95, prev + 5));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="ride-game-page">
      <div className="ride-score">
        Love Collected 💖 : {score}/10
      </div>

      {message && (
        <div className="ride-message">
          {message}
        </div>
      )}

      {gameWon && (
        <div className="ride-win-message">
          <div className="win-heart">💍</div>
          <h2>You completed our love journey! 💍</h2>
          <p>Forever starts with you ❤️</p>
          <button className="ride-close-btn" onClick={onClose}>
            Back to Love 💕
          </button>
        </div>
      )}

      <div className="love-car" style={{ left: `${carPosition}%` }}>
        🚗
      </div>

      {hearts.map(heart => (
        <div
          key={heart.id}
          className="falling-heart"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`
          }}
        >
          💖
        </div>
      ))}

      <button className="ride-close-btn" onClick={onClose}>
        ✕
      </button>
    </div>
  );
}