import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      setScrolled(scrollY > 60);
      setScrollProgress(maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0);

      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      let current = 'home';
      for (const sec of sections) {
        const element = document.getElementById(sec);
        if (element && scrollY >= element.offsetTop - 100) {
          current = sec;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) closeMenu();
    };
    document.addEventListener('keydown', handleKeyDown);
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    closeMenu();
    const target = document.getElementById(id);
    if (target) {
      const navH = 68;
      const y = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar" role="banner">
        <div className="nav-inner">
          <a href="#home" className="nav-logo" aria-label="Nethraj TM home" onClick={(e) => handleLinkClick(e, 'home')}>
            <span className="logo-bracket">&lt;</span>
            <span className="logo-name">Nethraj</span>
            <span className="logo-bracket">/&gt;</span>
          </a>

          <div className="nav-actions">
            <nav className={`nav-links ${menuOpen ? 'open' : ''}`} id="navLinks" role="navigation" aria-label="Main navigation">
              {navLinks.map((link) => (
                <a 
                  key={link.id}
                  href={`#${link.id}`} 
                  className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <button 
              className="theme-toggle" 
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            <button 
              className="nav-hamburger" 
              id="navHamburger"
              aria-label="Toggle navigation" 
              aria-expanded={menuOpen} 
              onClick={toggleMenu}
            >
              <span className="h-bar"></span>
              <span className="h-bar"></span>
              <span className="h-bar"></span>
            </button>
          </div>
        </div>
        <div className="nav-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true"></div>
      </header>

      <div 
        className={`nav-overlay ${menuOpen ? 'active' : ''}`} 
        id="navOverlay" 
        aria-hidden="true"
        onClick={closeMenu}
      ></div>
    </>
  );
};

export default Navbar;
