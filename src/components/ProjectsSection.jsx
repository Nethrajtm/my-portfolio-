import React from 'react';
import ProjectCard from './ProjectCard';

const projectsData = [
  {
    number: '01',
    status: 'Live',
    statusClass: '',
    icon: '🐾',
    title: 'Health & Vaccination Monitoring System for Pets',
    description: 'A full-stack web application enabling pet owners to track their animal\'s vaccination schedule, health records, and vet appointments. Features automated reminders, health analytics dashboard, and role-based access for veterinarians and owners.',
    tech: ['Python', 'Flask', 'SQLite', 'HTML/CSS', 'Chart.js'],
    isFeatured: true,
    delay: 0
  },
  {
    number: '02',
    status: 'In Progress',
    statusClass: 'proj-status--wip',
    icon: '📰',
    title: 'News Sentiment Analyzer',
    description: 'An NLP-powered pipeline that scrapes news headlines, classifies sentiment (positive/negative/neutral) using VADER and transformer models, then visualises trends through an interactive dashboard with real-time filtering by topic and date range.',
    tech: ['Python', 'NLP / VADER', 'Pandas', 'Streamlit', 'BeautifulSoup'],
    isFeatured: false,
    delay: 100
  },
  {
    number: '03',
    status: 'Complete',
    statusClass: '',
    icon: '🔥',
    title: 'IoT Fire Alarm System',
    description: 'A hardware + software solution using Arduino/ESP8266, flame sensors, and smoke detectors. On detection, it triggers an audio alarm, sends SMS/email alerts via Twilio, and logs events to a cloud dashboard for remote monitoring and reporting.',
    tech: ['Arduino', 'ESP8266', 'C/C++', 'Twilio API', 'IoT Cloud'],
    isFeatured: false,
    delay: 200
  }
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="section projects-section" aria-label="Projects">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">03 &bull; Projects</span>
          <h2 className="section-title">Featured Work</h2>
          <div className="section-line"></div>
        </div>

        <div className="projects-grid">
          {projectsData.map((proj, idx) => (
            <ProjectCard key={idx} {...proj} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
