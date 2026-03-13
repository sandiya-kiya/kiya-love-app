import React, { useEffect, useMemo, useRef, useState } from 'react';

const GAME_DURATION = 30; // seconds

export default function HeartCatchGame({ onClose }) {
  const [hearts, setHearts] = useState([]);
  const [basketX, setBasketX] = useState(50); // percent
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [message, setMessage] = useState('');
  const [won, setWon] = useState(false);

  const gameRef = useRef(null);
  const heartsRef = useRef(hearts);
  const basketXRef = useRef(basketX);
  const scoreRef = useRef(score);
  const timeRef = useRef(timeLeft);

  heartsRef.current = hearts;
  basketXRef.current = basketX;
  scoreRef.current = score;
  timeRef.current = timeLeft;

  const messages = useMemo(
    () => [
      'You caught my heart 💖',
      'More love for you 😚',
      'My heart belongs to you 💕',
    ],
    []
  );

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameRef.current) return;
      if (e.key === 'ArrowLeft') {
        setBasketX((prev) => Math.max(5, prev - 5));
      } else if (e.key === 'ArrowRight') {
        setBasketX((prev) => Math.min(95, prev + 5));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Spawn hearts every second
  useEffect(() => {
    const spawnInterval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: Math.random() * 100, // percent
          y: -5, // percent
          speed: 0.6 + Math.random() * 0.6, // percent per tick
        },
      ]);
    }, 1000);

    return () => clearInterval(spawnInterval);
  }, []);

  // Game loop: move hearts & detect collisions
  useEffect(() => {
    const tick = () => {
      setHearts((prev) => {
        if (prev.length === 0) return prev;
        const newHearts = [];
        const basket = basketXRef.current;
        let caught = 0;

        prev.forEach((heart) => {
          const newY = heart.y + heart.speed;
          const withinBasketY = newY >= 80 && newY <= 96;
          const withinBasketX = Math.abs(heart.x - basket) < 8;

          if (withinBasketY && withinBasketX) {
            caught += 1;
          } else if (newY <= 110) {
            newHearts.push({ ...heart, y: newY });
          }
        });

        if (caught > 0) {
          const msg =
            messages[Math.floor(Math.random() * messages.length)];
          setScore((s) => s + caught);
          setMessage(msg);
          setTimeout(() => setMessage(''), 1000);
        }

        return newHearts;
      });
    };

    const interval = setInterval(tick, 50);
    return () => clearInterval(interval);
  }, [messages]);

  // Timer & win condition
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (scoreRef.current >= 10 && !won) {
      setWon(true);
    }
  }, [score, won]);

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="heart-game-overlay" ref={gameRef}>
      <div className="heart-game-container">
        <div className="heart-game-header">
          <div className="heart-game-score">Score: {score}</div>
          <div className="heart-game-timer">Time: {timeLeft}</div>
          <button className="heart-game-exit" onClick={handleClose}>
            ✕
          </button>
        </div>

        <div className="heart-game-playfield">
          {hearts.map((heart) => (
            <div
              key={heart.id}
              className="game-heart"
              style={{
                left: `${heart.x}%`,
                top: `${heart.y}%`,
              }}
            />
          ))}

          <div
            className="basket"
            style={{ left: `${basketX}%` }}
          />

          {message && !won && (
            <div className="heart-game-message">{message}</div>
          )}

          {won && (
            <div className="heart-game-win">
              <div className="win-heart">♥</div>
              <p>You win my heart forever 💕</p>
              <button
                className="heart-game-back"
                onClick={handleClose}
              >
                Back to Love Page
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

