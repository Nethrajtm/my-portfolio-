import React, { useState, useEffect, useRef } from 'react';
import profileImg from '../assets/profile.jpg';

const HeroSection = () => {
  const [typedText, setTypedText] = useState('');
  const canvasRef = useRef(null);
  
  const roles = [
    'CSE Data Science Student',
    'Python Developer',
    'Data Science Enthusiast',
    'AI / ML Explorer',
    'Frontend Developer'
  ];

  // Typing Effect
  useEffect(() => {
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timeoutId;

    const type = () => {
      const currentPhrase = roles[phraseIdx];
      
      setTypedText(
        isDeleting
          ? currentPhrase.substring(0, charIdx - 1)
          : currentPhrase.substring(0, charIdx + 1)
      );

      isDeleting ? charIdx-- : charIdx++;

      let speed = isDeleting ? 55 : 85;

      if (!isDeleting && charIdx === currentPhrase.length) {
        speed = 1800; // pause at the end
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % roles.length;
        speed = 350;
      }
      
      timeoutId = setTimeout(type, speed);
    };

    timeoutId = setTimeout(type, 600);
    return () => clearTimeout(timeoutId);
  }, []);

  // Particle Canvas Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let W, H;
    let particles = [];
    const COLORS = ['#7c3aed', '#06b6d4', '#ec4899', '#10b981', '#a78bfa'];
    const COUNT = 55;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.8 + 0.5,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.5 + 0.15,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        const alphaHex = Math.round(p.alpha * 255).toString(16).padStart(2, '0');
        ctx.fillStyle = p.color + alphaHex;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124,58,237,${0.08 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();

    const handleResize = () => {
      resize();
      createParticles();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas id="particleCanvas" ref={canvasRef} aria-hidden="true"></canvas>

      <section id="home" className="section hero-section" aria-label="Hero introduction">
        <div className="hero-blobs" aria-hidden="true">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>

        <div className="hero-grid">
          <div className="hero-text" data-aos="fade-right">
            <div className="hero-greeting">
              <span className="greeting-wave">👋</span>
              <span className="greeting-text">Hello World, I'm</span>
            </div>

            <h1 className="hero-name">
              <span className="name-first">Nethraj</span>
              <span className="name-last">T M</span>
            </h1>

            <div className="hero-typing-wrap" aria-live="polite" aria-label="Dynamic role">
              <span className="typing-prefix">&gt;&nbsp;</span>
              <span className="typing-text">{typedText}</span>
              <span className="typing-cursor" aria-hidden="true">|</span>
            </div>

            <p className="hero-bio">
              Passionate about transforming raw data into actionable insights.
              Currently pursuing <strong>B.E. CSE – Data Science</strong> at
              Atria Institute of Technology, Bengaluru. I build intelligent
              applications, explore machine learning, and craft clean user
              interfaces.
            </p>

            <div className="hero-cta">
              <a href="#projects" className="btn btn-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 12H2M15 5l7 7-7 7"/></svg>
                View Projects
              </a>
              <a href="#contact" className="btn btn-outline">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.5 1.18 2 2 0 012.5 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.5a16 16 0 006.59 6.59l.86-.87a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                Contact Me
              </a>
            </div>

            <div className="hero-social" aria-label="Social links">
              <a href="https://github.com/Nethrajtm" target="_blank" rel="noopener noreferrer" className="hero-social-icon" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/nethraj-t-m-1a70a632b/" target="_blank" rel="noopener noreferrer" className="hero-social-icon" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="tel:6363383826" className="hero-social-icon" aria-label="Call">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.5 1.18 2 2 0 012.5 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.5a16 16 0 006.59 6.59l.86-.87a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              </a>
            </div>
          </div>

          <div className="hero-visual" data-aos="fade-left" aria-hidden="true">
            <div className="visual-ring visual-ring-outer"></div>
            <div className="visual-ring visual-ring-mid"></div>
            <div className="visual-hex">
              <div className="hex-inner">
                <img src={profileImg} alt="Nethraj T M" className="hex-avatar-img" />
              </div>
            </div>
            <div className="float-badge float-py">🐍 Python</div>
            <div className="float-badge float-ml">🤖 ML/AI</div>
            <div className="float-badge float-ds">📊 Data</div>
            <div className="float-badge float-js">⚡ JS</div>
          </div>
        </div>

        <div className="scroll-hint" aria-label="Scroll down">
          <div className="scroll-dot"></div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
