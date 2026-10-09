import React, { useState } from 'react';
import instaQr from '../assets/insta-qr.jpg';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
      valid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
      valid = false;
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
      valid = false;
    } else if (!emailRe.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message cannot be empty.';
      valid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on input
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/nethrajt@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`
        })
      });

      if (response.ok) {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        console.error("Form submission failed.");
        setIsSubmitting(false);
        alert("Oops! Something went wrong submitting the form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
      alert("Network error. Please try again later.");
    }
  };

  return (
    <section id="contact" className="section contact-section" aria-label="Contact">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">04 &bull; Contact</span>
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-line"></div>
        </div>

        <div className="contact-grid">
          <div className="contact-info" data-aos="fade-right">
            <h3 className="contact-info-title">Let's build something together</h3>
            <p className="contact-info-text">
              I'm always open to internship opportunities, collaborations on
              interesting projects, or just a good tech conversation.
              Feel free to reach out!
            </p>
            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="cd-icon">📞</div>
                <div>
                  <span className="cd-label">Phone</span>
                  <a href="tel:6363383826" className="cd-value">6363383826</a>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="cd-icon">📍</div>
                <div>
                  <span className="cd-label">Location</span>
                  <span className="cd-value">Bengaluru, Karnataka</span>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="cd-icon">🎓</div>
                <div>
                  <span className="cd-label">College</span>
                  <span className="cd-value">Atria Institute of Technology</span>
                </div>
              </div>
            </div>

            <a href="https://www.instagram.com/nethraj_t_m?utm_source=qr" target="_blank" rel="noopener noreferrer" className="contact-qr-box" style={{ textDecoration: 'none', display: 'block' }}>
              <span className="qr-title">Connect on Instagram</span>
              <img src={instaQr} alt="Instagram QR Code - @NETHRAJ_T_M" className="qr-img" />
              <span className="qr-handle">@NETHRAJ_T_M</span>
            </a>
          </div>

          <div className="contact-form-wrap" data-aos="fade-left">
            <form className="contact-form" onSubmit={handleSubmit} noValidate aria-label="Contact form">
              <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
                <label htmlFor="formName" className="form-label">Full Name</label>
                <div className="form-input-wrap">
                  <svg className="form-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.58-7 8-7s8 3 8 7"/></svg>
                  <input 
                    type="text" 
                    id="formName" 
                    name="name" 
                    className="form-input"
                    placeholder="Your full name" 
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-required="true" 
                    aria-describedby="err-name" 
                  />
                </div>
                <span className="form-error" id="err-name" role="alert" aria-live="polite">{errors.name}</span>
              </div>

              <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                <label htmlFor="formEmail" className="form-label">Email Address</label>
                <div className="form-input-wrap">
                  <svg className="form-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                  <input 
                    type="email" 
                    id="formEmail" 
                    name="email" 
                    className="form-input"
                    placeholder="your@email.com" 
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-required="true" 
                    aria-describedby="err-email" 
                  />
                </div>
                <span className="form-error" id="err-email" role="alert" aria-live="polite">{errors.email}</span>
              </div>

              <div className={`form-group ${errors.message ? 'has-error' : ''}`}>
                <label htmlFor="formMsg" className="form-label">Message</label>
                <div className="form-input-wrap">
                  <svg className="form-icon form-icon--top" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                  <textarea 
                    id="formMsg" 
                    name="message" 
                    className="form-input form-textarea"
                    placeholder="Tell me about your project or idea…" 
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    aria-required="true" 
                    aria-describedby="err-msg"
                  ></textarea>
                </div>
                <span className="form-error" id="err-msg" role="alert" aria-live="polite">{errors.message}</span>
              </div>

              <button type="submit" className={`btn btn-primary btn-full ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting}>
                <span className="btn-text">Send Message</span>
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>

              {isSuccess && (
                <div className="form-success" role="alert" aria-live="polite">
                  <span className="success-icon">✅</span>
                  <span>Message received! I'll get back to you soon.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
