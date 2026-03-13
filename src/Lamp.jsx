import React, { useRef } from 'react';
import { gsap } from 'gsap';

export default function Lamp({ toggle, lightOn }) {
  // Pink glowing particles (25)
  const particles = Array.from({ length: 25 });
  // Tiny floating hearts (12)
  const hearts = Array.from({ length: 12 });
  const lampRef = useRef();
  const stringRef = useRef();
  const audioRef = useRef();

  const pull = () => {
    const clickSound = audioRef.current;

    gsap.fromTo(
      stringRef.current,
      { y: 0 },
      {
        y: 12,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut',
      }
    );

    if (clickSound) {
      clickSound.currentTime = 0;
      clickSound.play();
    }

    setTimeout(() => {
      toggle();
    }, 350);
  };

  return (
    <div className="lamp-container">
      <div className="lamp">
        <audio ref={audioRef} src="/click.mp3" preload="auto" />

        {/* Magical pink particles (only when lamp is ON, clustered around lamp) */}
        {lightOn && particles.map((_, i) => (
          <div
            key={'particle-' + i}
            className="lamp-particle"
            style={{
              left: `${30 + Math.random() * 40}%`,
              top: `${20 + Math.random() * 20}%`,
              animationDelay: `${Math.random() * 4}s`,
              zIndex: 2,
            }}
          />
        ))}
        {/* Floating tiny hearts (only when lamp is ON, near the lamp) */}
        {lightOn && hearts.map((_, i) => (
          <div
            key={'heart-' + i}
            className="lamp-heart"
            style={{
              left: `${30 + Math.random() * 40}%`,
              top: `${22 + Math.random() * 18}%`,
              animationDelay: `${Math.random() * 5}s`,
              zIndex: 2,
            }}
          />
        ))}

        <div className="lamp-body" ref={lampRef}>
          <div className="lamp-table-glow" />

          <div className={`lamp-shade ${lightOn ? 'on' : ''}`} />

          <div className={`lamp-bulb ${lightOn ? 'on' : ''}`} />

          <div className="lamp-stand" />

          <div className="lamp-base" />

          <div className="lamp-string" ref={stringRef} onClick={pull}>
            <div className="lamp-cord-line" />
            <div className="lamp-cord-knob" />
          </div>
        </div>
      </div>
    </div>
  );
}
