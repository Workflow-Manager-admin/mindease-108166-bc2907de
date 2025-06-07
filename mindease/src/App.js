import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  // Page options: 'home', 'login', 'signup', 'dashboard'
  const [page, setPage] = useState('home');
  // Holds authentication state: null if logged out, else user object {email}
  const [authUser, setAuthUser] = useState(null);
  // Handles feedback messages for UI (login/signup error/success)
  const [feedback, setFeedback] = useState({ type: '', msg: '' });

  // Helper to get list of registered users from localStorage
  function getUsers() {
    const usersStr = localStorage.getItem('mindease_users');
    if (!usersStr) return [];
    try { return JSON.parse(usersStr); } catch {
      return [];
    }
  }

  // Helper to save list of users
  function setUsers(users) {
    localStorage.setItem('mindease_users', JSON.stringify(users));
  }

  // PUBLIC_INTERFACE
  function handleLogin(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;
    const users = getUsers();
    const user = users.find(u => u.email === email);
    if (!user) {
      setFeedback({ type: 'error', msg: 'User not found. Please sign up first.' });
      return;
    }
    if (user.password !== password) {
      setFeedback({ type: 'error', msg: 'Incorrect password.' });
      return;
    }
    setFeedback({ type: 'success', msg: 'Login successful!' });
    setAuthUser({ email });
    setPage('dashboard');
    form.reset();
  }

  // PUBLIC_INTERFACE
  function handleSignup(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFeedback({ type: 'error', msg: 'Please use a valid email.' });
      return;
    }
    if (password.length < 5) {
      setFeedback({ type: 'error', msg: 'Password should be at least 5 characters.' });
      return;
    }
    const users = getUsers();
    if (users.find(u => u.email === email)) {
      setFeedback({ type: 'error', msg: 'Email is already registered. Please log in.' });
      return;
    }
    users.push({ email, password });
    setUsers(users);
    setFeedback({ type: 'success', msg: 'Signup successful! Please log in.' });
    setPage('login');
    form.reset();
  }

  // PUBLIC_INTERFACE
  function handleLogout() {
    setAuthUser(null);
    setPage('home');
    setFeedback({ type: '', msg: '' });
  }

  // NAVIGATION scroll or page route
  function handleNav(to) {
    setFeedback({ type: '', msg: '' });
    if (to === 'login') setPage('login');
    else if (to === 'signup') setPage('signup');
    else if (to === 'dashboard') setPage('dashboard');
    else {
      setPage('home');
      const elem = document.getElementById(to);
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // HOME PAGE SECTION
  function HomePage() {
    return (
      <>
        <section className="hero">
          <div className="subtitle">Welcome to InnerEase by MindEase</div>
          <h1 className="title">Mental Wellness for Everyone</h1>
          <div className="description">
            Your friendly, private space to explore your mental well-being.<br />
            Take self-assessment tests, chat with our AI Therapist, and get insights—all for free!
          </div>
          <button className="btn btn-large" onClick={() => handleNav('login')}>Get Started</button>
          <div style={{ marginTop: 10 }}>
            <span>New here?{' '}</span>
            <button className="link-btn" type="button" onClick={() => handleNav('signup')}>Sign Up</button>
          </div>
        </section>

        <section className="about-mission" id="about">
          <h2 className="section-title">About InnerEase</h2>
          <div className="section-content">
            <p>
              InnerEase is dedicated to making mental wellness accessible and stigma-free. Our platform offers science-backed self-tests and guided support, helping you understand and care for your mind in a safe environment.
            </p>
          </div>
        </section>

        <section className="about-mission" id="mission">
          <h2 className="section-title">Our Mission</h2>
          <div className="section-content">
            <p>
              To empower every individual to explore, assess, and improve their mental health using technology, empathy, and privacy-first tools.
            </p>
          </div>
        </section>

        <section className="features" id="features">
          <h2 className="section-title">Features</h2>
          <div className="features-cards">
            <FeatureCard
              icon="🧠"
              title="Self-Assessment Tests"
              desc="ADHD, Anxiety, Depression, Stress, PTSD, Personality, Emotional Intelligence."
            />
            <FeatureCard
              icon="💬"
              title="AI Therapist Chat"
              desc="Private, empathetic conversations with an AI for guidance and support."
            />
            <FeatureCard
              icon="🔒"
              title="Private & Secure"
              desc="We do not store personal identifiers without your consent."
            />
            <FeatureCard
              icon="📊"
              title="Insightful Results"
              desc="Easy-to-understand feedback on your mental wellness journey."
            />
            <FeatureCard
              icon="☁️"
              title="Accessible Anywhere"
              desc="No downloads, no fees – just open and begin your journey."
            />
          </div>
        </section>

        <section className="contact" id="contact">
          <h2 className="section-title">Contact Us</h2>
          <form className="contact-form" onSubmit={e => { e.preventDefault(); alert('Thank you for reaching out!'); e.target.reset(); }}>
            <input className="form-input" name="name" placeholder="Your Name" required />
            <input className="form-input" name="email" placeholder="Your Email" type="email" required />
            <textarea className="form-input" name="message" placeholder="Your Message" rows={4} required />
            <button className="btn" type="submit">Send Message</button>
          </form>
        </section>
      </>
    );
  }

  // FEATURE CARD UI
  function FeatureCard({ icon, title, desc }) {
    return (
      <div className="feature-card">
        <div className="feature-icon">{icon}</div>
        <div className="feature-card-title">{title}</div>
        <div className="feature-card-desc">{desc}</div>
      </div>
    );
  }

  // LOGIN PAGE
  function LoginPage() {
    return (
      <div className="login-page">
        <form className="login-form" onSubmit={handleLogin} autoComplete="on">
          <h2>Login</h2>
          {feedback.msg && (
            <div
              style={{
                color: feedback.type === 'error' ? 'var(--danger)' : 'green',
                fontWeight: 500,
                minHeight: 22,
              }}
              role={feedback.type === 'error' ? 'alert' : 'status'}
            >
              {feedback.msg}
            </div>
          )}
          <input className="form-input" type="email" name="email" placeholder="Email" required autoComplete="username"/>
          <input className="form-input" type="password" name="password" placeholder="Password" required autoComplete="current-password"/>
          <button className="btn btn-large" type="submit">Login</button>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1em' }}>
            <button type="button" className="link-btn" onClick={() => handleNav('home')}>Back to Home</button>
            <span>
              New user?&nbsp;
              <button type="button" className="link-btn" onClick={() => handleNav('signup')}>Sign Up</button>
            </span>
          </div>
        </form>
      </div>
    );
  }

  // SIGNUP PAGE
  function SignupPage() {
    return (
      <div className="login-page">
        <form className="login-form" onSubmit={handleSignup} autoComplete="on">
          <h2>Sign Up</h2>
          {feedback.msg && (
            <div
              style={{
                color: feedback.type === 'error' ? 'var(--danger)' : 'green',
                fontWeight: 500,
                minHeight: 22,
              }}
              role={feedback.type === 'error' ? 'alert' : 'status'}
            >
              {feedback.msg}
            </div>
          )}
          <input className="form-input" type="email" name="email" placeholder="Email" required autoComplete="username"/>
          <input className="form-input" type="password" name="password" placeholder="Password (min 5 chars)" required autoComplete="new-password"/>
          <button className="btn btn-large" type="submit">Sign Up</button>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1em' }}>
            <button type="button" className="link-btn" onClick={() => handleNav('home')}>Back to Home</button>
            <span>
              Already have an account?&nbsp;
              <button type="button" className="link-btn" onClick={() => handleNav('login')}>Login</button>
            </span>
          </div>
        </form>
      </div>
    );
  }

  // DASHBOARD
  function DashboardPage() {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Welcome to your Dashboard</h2>
          <button className="btn" onClick={handleLogout}>Logout</button>
        </div>
        <div className="dashboard-content">
          <div className="dashboard-test-section">
            <h3>Take a Self-Assessment Test</h3>
            <ul className="test-list">
              <li className="test-card">ADHD Test <button className="btn btn-small">Start</button></li>
              <li className="test-card">Anxiety Test <button className="btn btn-small">Start</button></li>
              <li className="test-card">Depression Test <button className="btn btn-small">Start</button></li>
              <li className="test-card">Stress Test <button className="btn btn-small">Start</button></li>
              <li className="test-card">PTSD Screening <button className="btn btn-small">Start</button></li>
              <li className="test-card">Personality Test <button className="btn btn-small">Start</button></li>
              <li className="test-card">Emotional Intelligence Test <button className="btn btn-small">Start</button></li>
            </ul>
          </div>
          <div className="dashboard-chat-section">
            <h3>AI Therapist Chat</h3>
            <div className="chatbox">
              <div className="chat-placeholder">[AI Chat Module Coming Soon]</div>
            </div>
          </div>
          <div className="dashboard-results-section">
            <h3>Your Past Test Results</h3>
            <div className="results-placeholder">[No results yet.]</div>
          </div>
        </div>
      </div>
    );
  }

  // PAGE RENDER LOGIC
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo" style={{ cursor: 'pointer' }} onClick={() => handleNav('home')}>
              <span className="logo-symbol" style={{ fontSize: 28 }}>🧘‍♂️</span> <span>InnerEase</span>
            </div>
            <div className="navbar-links">
              <button className="nav-link" onClick={() => handleNav('home')}>Home</button>
              <button className="nav-link" onClick={() => handleNav('about')}>About</button>
              <button className="nav-link" onClick={() => handleNav('mission')}>Our Mission</button>
              <button className="nav-link" onClick={() => handleNav('features')}>Features</button>
              <button className="nav-link" onClick={() => handleNav('contact')}>Contact</button>
              {!authUser ? (
                <>
                  <button className="btn" onClick={() => handleNav('login')}>Login</button>
                  <button className="btn" onClick={() => handleNav('signup')}>Sign Up</button>
                </>
              ) : (
                <>
                  <button className="btn" onClick={handleLogout}>Logout</button>
                  <button className="btn" onClick={() => handleNav('dashboard')}>Dashboard</button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main>
        <div className="container">
          {page === 'home' && <HomePage />}
          {page === 'login' && <LoginPage />}
          {page === 'signup' && <SignupPage />}
          {page === 'dashboard' && authUser && <DashboardPage />}
        </div>
      </main>
      <footer className="footer">
        <div className="container footer-content">
          <div>
            &copy; {new Date().getFullYear()} InnerEase &mdash; A project by MindEase
          </div>
          <div>
            <a className="footer-link" href="#">Privacy Policy</a> · <a className="footer-link" href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;