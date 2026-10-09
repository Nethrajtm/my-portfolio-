import React, { useEffect, useRef } from 'react';
import SkillCard from './SkillCard';

const coreSkillsData = [
  { name: 'Python', pct: 88 },
  { name: 'Data Science / ML', pct: 75 },
  { name: 'SQL', pct: 70 },
  { name: 'JavaScript', pct: 65 },
  { name: 'React', pct: 60 },
  { name: 'C / C++', pct: 55 }
];

const technologiesData = [
  { icon: '🐍', name: 'Python', delay: 0 },
  { icon: '🔷', name: 'C', delay: 50 },
  { icon: '⚙️', name: 'C++', delay: 100 },
  { icon: '🌐', name: 'HTML', delay: 150 },
  { icon: '🎨', name: 'CSS', delay: 200 },
  { icon: '⚡', name: 'JavaScript', delay: 250 },
  { icon: '⚛️', name: 'React', delay: 300 },
  { icon: '🗄️', name: 'SQL', delay: 350 },
  { icon: '🐙', name: 'Git/GitHub', delay: 400 },
  { icon: '📊', name: 'Data Science', delay: 450 }
];

const SkillsSection = () => {
  const barsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const item = entry.target;
        const val = parseInt(item.dataset.value || '0', 10);
        const fill = item.querySelector('.sb-fill');
        if (fill) {
          setTimeout(() => { fill.style.width = val + '%'; }, 200);
        }
        observer.unobserve(item);
      });
    }, { threshold: 0.3 });

    barsRef.current.forEach(b => {
      if (b) observer.observe(b);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !barsRef.current.includes(el)) {
      barsRef.current.push(el);
    }
  };

  return (
    <section id="skills" className="section skills-section" aria-label="Skills">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">02 &bull; Skills</span>
          <h2 className="section-title">Tech Stack</h2>
          <div className="section-line"></div>
        </div>

        <div className="skills-layout">
          <div className="skills-bars" data-aos="fade-right">
            <h4 className="skills-group-title">Core Proficiency</h4>
            {coreSkillsData.map((skill, idx) => (
              <div 
                key={idx} 
                className="skill-bar-item" 
                data-value={skill.pct} 
                ref={addToRefs}
              >
                <div className="sb-meta">
                  <span className="sb-name">{skill.name}</span>
                  <span className="sb-pct">{skill.pct}%</span>
                </div>
                <div className="sb-track" role="progressbar" aria-valuenow={skill.pct} aria-valuemin="0" aria-valuemax="100">
                  <div className="sb-fill"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="skills-cards" data-aos="fade-left">
            <h4 className="skills-group-title">Technologies</h4>
            <div className="skill-cards-grid">
              {technologiesData.map((tech, idx) => (
                <SkillCard 
                  key={idx} 
                  icon={tech.icon} 
                  name={tech.name} 
                  delay={tech.delay} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
