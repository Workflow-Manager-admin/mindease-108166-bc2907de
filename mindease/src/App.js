import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  // Simple page state: 'home', 'login', 'dashboard'
  const [page, setPage] = useState('home');
  // To manage login, keep a mock auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // PUBLIC_INTERFACE
  function handleLogin(e) {
    e.preventDefault();
    setIsAuthenticated(true);
    setPage('dashboard');
  }

  // PUBLIC_INTERFACE
  function handleLogout() {
    setIsAuthenticated(false);
    setPage('home');
  }

  // NAVIGATION scroll or page route
  function handleNav(to) {
    if (to === 'login') setPage('login');
    else if (to === 'dashboard') setPage('dashboard');
    else {
      setPage('home');
      // If hashed sections, scroll
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
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <input className="form-input" type="email" placeholder="Email" required />
          <input className="form-input" type="password" placeholder="Password" required />
          <button className="btn btn-large" type="submit">Login</button>
          <div className="back-link">
            <button type="button" className="link-btn" onClick={() => handleNav('home')}>Back to Home</button>
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
              {!isAuthenticated ?
                <button className="btn" onClick={() => setPage('login')}>Login</button>
                : <button className="btn" onClick={handleLogout}>Logout</button>
              }
              {isAuthenticated &&
                <button className="btn" onClick={() => setPage('dashboard')}>Dashboard</button>
              }
            </div>
          </div>
        </div>
      </nav>
      <main>
        <div className="container">
          {page === 'home' && <HomePage />}
          {page === 'login' && <LoginPage />}
          {page === 'dashboard' && isAuthenticated && <DashboardPage />}
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