import React, { useMemo, useState } from 'react';

export default function ProposalPage({ onClose }) {
  const [yesCelebration, setYesCelebration] = useState(false);
  const [noAttempts, setNoAttempts] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: '120px', y: '0px' });

  const hearts = useMemo(
    () =>
      Array.from({ length: yesCelebration ? 180 : 60 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 8}s`,
        duration: `${16 + Math.random() * 12}s`,
        size: 16 + Math.random() * 20,
      })),
    [yesCelebration]
  );

  const messages = [
    'Why no? Please marry me 🥺',
    'No Kiruthick, marry me and have kids with me 💖',
    'You cannot escape my love 😌',
    'Just press YES already 💕',
  ];

  const currentMessage = messages[Math.min(noAttempts, messages.length - 1)];

  const handleYes = () => {
    setYesCelebration(true);
  };

  const handleNoHover = () => {
    setNoAttempts((prev) => prev + 1);
    setNoPosition({
      x: `${Math.random() * 300}px`,
      y: `${Math.random() * 80}px`,
    });
  };

  return (
    <div className="proposal-page">
      <div className="proposal-hearts-layer">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="proposal-heart"
            style={{
              left: heart.left,
              width: `${heart.size}px`,
              height: `${heart.size}px`,
              animationDelay: heart.delay,
              animationDuration: heart.duration,
            }}
          />
        ))}
      </div>

      <div className="proposal-content">
        <p className="proposal-text">
          No matter what happens in life,
          <br />
          I just want you beside me forever.
          <br />
          <br />
          Kiruthick please marry me 💗
        </p>

        <div className="proposal-big-heart">♥</div>

        <p className="proposal-question">
          Will you marry me Kiruthick?
        </p>

        <div className="proposal-buttons">
          <button className="yes-btn" onClick={handleYes}>
            YES 💖
          </button>
          <button
            className="no-btn"
            style={{ left: noPosition.x, top: noPosition.y }}
            onMouseEnter={handleNoHover}
          >
            NO
          </button>
        </div>

        {noAttempts > 0 && !yesCelebration && (
          <p className="proposal-no-message">{currentMessage}</p>
        )}

        {yesCelebration && (
          <div className="proposal-yes-message">
            <h2>Yayyyyy 💖</h2>
            <p>You made me the happiest person in the world!</p>
            <button className="heart-game-back" onClick={onClose}>
              Back to Love Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

