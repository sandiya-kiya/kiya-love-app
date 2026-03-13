import React, { useState } from 'react';

export default function Login({ onLogin, authResult }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      if (username === 'KIYA' && password === '2007') {
        onLogin(true);
      } else {
        onLogin(false);
      }
      setSubmitting(false);
    }, 600);
  };

  return (
    <form className="login-card" onSubmit={handleSubmit} autoComplete="off">
      <h2>Love Entry</h2>
      <div className="input-group">
        <input
          className="input-field"
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          disabled={submitting}
          required
        />
      </div>
      <div className="input-group">
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={submitting}
          required
        />
      </div>
      <button
        className="login-button"
        type="submit"
        disabled={submitting}
      >
        {submitting ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}
