import React from 'react';

const SkillCard = ({ icon, name, delay }) => {
  return (
    <div className="sk-card" data-aos="zoom-in" data-aos-delay={delay}>
      <div className="sk-icon">{icon}</div>
      <span className="sk-name">{name}</span>
    </div>
  );
};

export default SkillCard;
