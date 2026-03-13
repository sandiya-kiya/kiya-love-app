import React from 'react';

export default function LoveEndingPage() {
  return (
    <div className="love-ending-page">
      {Array.from({ length: 70 }).map((_, i) => (
        <div
          key={i}
          className="floating-heart"
          style={{
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            animationDelay: Math.random() * 6 + "s",
            animationDuration: 8 + Math.random() * 6 + "s",
            fontSize: (12 + Math.random() * 12) + "px",
            color: Math.random() > 0.5 ? "hotpink" : "violet"
          }}
        >
          💖
        </div>
      ))}

      <div className="love-ending-content">
        <div className="love-ending-message">
          Thank you for choosing me ❤️<br />
          You just made me the happiest girl in the world.<br />
          <br />
          No matter where life takes us,<br />
          I promise to love you forever.<br />
          <br />
          Kiruthick,<br />
          my heart belongs to you forever 💖
        </div>

        <div className="big-love-heart">💗</div>

        <div className="final-love-line">
          Forever begins with this YES 💍
        </div>
      </div>
    </div>
  );
}