import React, { useEffect, useRef } from 'react';
import profileImg from '../assets/profile.jpg';

const AboutSection = () => {
  const statRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const duration = 1400;
        const start = performance.now();

        const update = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          el.textContent = Math.round(eased * target);
          
          if (progress < 1) requestAnimationFrame(update);
        };
        
        requestAnimationFrame(update);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    statRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !statRefs.current.includes(el)) {
      statRefs.current.push(el);
    }
  };

  return (
    <section id="about" className="section about-section" aria-label="About me">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">01 &bull; About</span>
          <h2 className="section-title">Who Am I?</h2>
          <div className="section-line"></div>
        </div>

        <div className="about-grid">
          <div className="about-left" data-aos="fade-right">
            <div className="about-avatar-wrap">
              <div className="about-avatar">
                <img src={profileImg} alt="Nethraj T M" className="about-avatar-img" />
              </div>
              <div className="about-avatar-glow"></div>
            </div>

            <div className="stat-cards">
              <div className="stat-card" data-aos="zoom-in" data-aos-delay="100">
                <span className="stat-num" data-target="10" ref={addToRefs}>0</span>
                <span className="stat-plus">+</span>
                <span className="stat-label">Projects Built</span>
              </div>
              <div className="stat-card" data-aos="zoom-in" data-aos-delay="200">
                <span className="stat-num" data-target="5" ref={addToRefs}>0</span>
                <span className="stat-plus">+</span>
                <span className="stat-label">Technologies</span>
              </div>
              <div className="stat-card" data-aos="zoom-in" data-aos-delay="300">
                <span className="stat-num" data-target="3" ref={addToRefs}>0</span>
                <span className="stat-plus">+</span>
                <span className="stat-label">Years Coding</span>
              </div>
            </div>
          </div>

          <div className="about-right" data-aos="fade-left">
            <h3 className="about-title">CSE Data Science Student &amp; Developer</h3>
            <p className="about-bio">
              I'm <strong>Nethraj T M</strong>, a B.E. Computer Science Engineering
              (Data Science) student at <strong>Atria Institute of Technology</strong>,
              Bengaluru. My passion lies at the intersection of data, algorithms, and
              human-centred design — I love building tools that make a real difference.
            </p>
            <p className="about-bio">
              From IoT systems that protect lives to NLP pipelines that decode public
              sentiment, I approach every project with curiosity and craftsmanship.
              When I'm not coding, I'm reading research papers, exploring new
              frameworks, or tinkering with side projects.
            </p>

            <div className="about-info-grid">
              <div className="info-item">
                <span className="info-icon">📍</span>
                <span>Bengaluru, Karnataka</span>
              </div>
              <div className="info-item">
                <span className="info-icon">📞</span>
                <a href="tel:6363383826">6363383826</a>
              </div>
              <div className="info-item">
                <span className="info-icon">🎓</span>
                <span>B.E. CSE – Data Science</span>
              </div>
              <div className="info-item">
                <span className="info-icon">💼</span>
                <span>Open to Opportunities</span>
              </div>
            </div>

            <h4 className="timeline-title">Education</h4>
            <div className="timeline">
              <div className="tl-item" data-aos="fade-up">
                <div className="tl-dot"></div>
                <div className="tl-content">
                  <span className="tl-year">2022 – Present</span>
                  <h5 className="tl-degree">B.E. Computer Science &amp; Engineering</h5>
                  <p className="tl-spec">Specialisation: Data Science</p>
                  <p className="tl-inst">Atria Institute of Technology, Bengaluru</p>
                </div>
              </div>
              <div className="tl-item" data-aos="fade-up" data-aos-delay="100">
                <div className="tl-dot"></div>
                <div className="tl-content">
                  <span className="tl-year">2020 – 2022</span>
                  <h5 className="tl-degree">Pre-University (Science)</h5>
                  <p className="tl-spec">Physics &middot; Chemistry &middot; Mathematics &middot; Computer Science</p>
                  <p className="tl-inst">Karnataka State Board</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
