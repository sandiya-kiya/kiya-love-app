import React, { useState } from 'react';
import Lamp from './Lamp';
import Login from './Login';
import LovePage from './LovePage';

export default function App() {
  const [lightOn, setLightOn] = useState(false);
  const [authResult, setAuthResult] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const handleLogin = (success) => {
    setAuthResult(success ? 'success' : 'fail');
    if (success) {
      setShowTransition(true);
      setTimeout(() => {
        setLoggedIn(true);
      }, 2500);
    }
  };

  if (loggedIn) {
    return <LovePage />;
  }

  return (
    <div className="app login-page">
      <div className="romantic-background-glow" />

      <div className="login-layout">
        <div className="lamp-section">
          <Lamp toggle={() => setLightOn(!lightOn)} lightOn={lightOn} />
        </div>

        <div className="login-section">
          {lightOn && (
            <div className="login">
              <Login onLogin={handleLogin} authResult={authResult} />
              {authResult === 'success' && (
                <div className="login-message success">Login Successful</div>
              )}
              {authResult === 'fail' && (
                <div className="login-message fail">Invalid credentials</div>
              )}
            </div>
          )}
        </div>
      </div>

      {showTransition && (
        <div className="love-transition">
          {Array.from({ length: 40 }).map((_, i) => {
            const tx = (Math.random() - 0.5) * 600;
            const ty = (Math.random() - 0.5) * 600;
            return (
              <div
                key={i}
                className="transition-heart"
                style={{
                  left: '50%',
                  top: '50%',
                  '--tx': `${tx}px`,
                  '--ty': `${ty}px`,
                  animationDelay: `${Math.random() * 0.3}s`,
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
