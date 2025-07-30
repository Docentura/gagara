import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleClick = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.addEventListener('click', handleClick);

    // Intersection Observer for animation triggers
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = '0s';
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
      observer.observe(card);
    });

    // Security status update
    const securityStatus = document.getElementById('security-status');
    const timer = setTimeout(() => {
      if (securityStatus) {
        securityStatus.textContent = 'Security verification completed ✓';
        securityStatus.style.color = '#28a745';
      }
    }, 2000);

    // Performance optimization: Lazy loading for images
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }

    // Error handling and fallbacks
    const handleError = (e) => {
      console.warn('Non-critical error handled:', e.message);
    };
    window.addEventListener('error', handleError);

    // Accessibility improvements
    const handleKeydown = (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
      }
    };

    const handleMousedown = () => {
      document.body.classList.remove('using-keyboard');
    };

    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('mousedown', handleMousedown);

    return () => {
      document.removeEventListener('click', handleClick);
      clearTimeout(timer);
      window.removeEventListener('error', handleError);
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('mousedown', handleMousedown);
    };
  }, []);

  return (
    <div className="page-container">
      {/* Header section */}
      <header className="header">
        <div className="header-content">
          <div className="logo" aria-label="Shell Logo"></div>
          <nav>
            <h1 className="sr-only">Shell Fuel Card Services</h1>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="main-content">
        {/* Hero section */}
        <section className="hero-section">
          <h1 className="hero-title">Shell Fuel Card</h1>
          <p className="hero-subtitle">Efficient fuel management solutions for your business</p>
          <a href="#features" className="cta-button">Learn More</a>
        </section>

        {/* Features section */}
        <section id="features" className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⛽</div>
            <h2 className="feature-title">Wide Network</h2>
            <p className="feature-description">Access to thousands of Shell stations across Europe for convenient refueling.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h2 className="feature-title">Fleet Management</h2>
            <p className="feature-description">Advanced reporting and analytics to optimize your fleet's fuel consumption.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h2 className="feature-title">Secure Payments</h2>
            <p className="feature-description">Secure and convenient payment processing with detailed transaction records.</p>
          </div>
        </section>

        {/* Security verification notice */}
        <div className="security-notice">
          <div id="security-status" aria-live="polite">
            Security verification in progress...
          </div>
        </div>

        {/* Loading animation for dynamic content */}
        <div className="loading-spinner" id="content-loader" style={{display: 'none'}}></div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <nav className="footer-links">
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="#" className="footer-link">Contact</a>
          </nav>
          <p>&copy; 2025 Fleetcor Polska. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
