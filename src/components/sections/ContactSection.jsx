import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SocialExpandButtons from '../common/SocialExpandButtons';
import { SplitText } from '../ui/SplitText';
import { TypewriterText } from '../ui/TypewriterText';
import './ContactSection.css';

const SERVICE_OPTIONS = [
  'Brand Identity System',
  'Digital Experience / Web',
  '3D & Motion Direction',
  'Editorial & Art Direction',
  'Creative Technology'
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    services: [],
    timeline: 'Within 3 Months',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleService = (svc) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(svc)
        ? prev.services.filter(s => s !== svc)
        : [...prev.services, svc]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: '66c2669b-0f41-4e10-9361-a21a4c3efa0a',
          subject: `New Project Inquiry from ${formData.name}`,
          from_name: formData.name,
          name: formData.name,
          email: formData.email,
          company: formData.company || 'N/A',
          services: formData.services.length ? formData.services.join(', ') : 'Not specified',
          timeline: formData.timeline,
          message: formData.message || 'No additional message'
        })
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(result.message || 'Unable to dispatch. Please reach us directly at aarvisuals01@gmail.com');
      }
    } catch (err) {
      setErrorMessage('Network error. Please reach us directly at aarvisuals01@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppRedirect = (e) => {
    e.preventDefault();
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const targetUrl = isMobile 
      ? "https://wa.me/917011191450" 
      : "https://web.whatsapp.com/send?phone=917011191450";
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="aar-contact-section">
      <div className="contact-container">

        {/* Top Split Hero Grid */}
        <div className="contact-hero-split-grid">
          
          {/* Left Column: Heading & Atelier Coordinates */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="contact-heading-col"
          >
            <span className="contact-heading-eyebrow">
              <span className="contact-eyebrow-dash" />
              DIRECT ATELIER INQUIRY
            </span>
            
            <h2 className="contact-heading-hero">
              <SplitText text="HAVE SOMETHING" type="words" delay={0.1} stagger={0.06} /> <br />
              <span className="contact-serif-glow">
                <SplitText text="WORTH MAKING VISIBLE?" type="words" delay={0.25} stagger={0.06} />
              </span>
            </h2>

            <div className="contact-status-badge">
              <span className="contact-status-dot" />
              <TypewriterText
                words={[
                  "ACCEPTING SELECT Q3/Q4 COMMISSIONS",
                  "DISPATCH RESPONSE WITHIN 24 HOURS",
                  "WORLDWIDE BESPOKE COLLABORATION"
                ]}
                speed={50}
                deleteSpeed={30}
                pauseTime={2600}
                loop={true}
                cursorChar="|"
                className="contact-status-text"
              />
            </div>

            <p className="contact-header__body">
              We review every project proposal carefully. For prospective partnerships, bespoke commissions, or press inquiries, please use the briefing form or connect with our studio directors directly.
            </p>

            {/* Direct Studio Quick Contact Box */}
            <div className="contact-direct-quick-block">
              <div className="contact-direct-quick-item">
                <span className="contact-direct-label">STUDIO DIRECT EMAIL</span>
                <a href="mailto:aarvisuals01@gmail.com" className="contact-direct-link contact-direct-link--mail">
                  aarvisuals01@gmail.com
                </a>
                <span className="contact-direct-sub">Typical response within 24 hours</span>
              </div>

              <div className="contact-direct-quick-item">
                <span className="contact-direct-label">STUDIO DIRECT PHONE & WHATSAPP</span>
                <a href="tel:+917011191450" className="contact-direct-link">
                  +91 70111 91450
                </a>
                
                <a 
                  href="https://web.whatsapp.com/send?phone=917011191450" 
                  onClick={handleWhatsAppRedirect}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-whatsapp-chat-btn"
                  title="Chat directly with AAR Visuals on WhatsApp"
                >
                  <span className="contact-whatsapp-chat-icon">
                    <svg viewBox="0 0 448 512" height="1.15em" width="1.15em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                    </svg>
                  </span>
                  <span className="contact-whatsapp-chat-text">Chat on WhatsApp</span>
                  <span className="contact-whatsapp-chat-arrow">→</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Project Briefing Form */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="contact-form-col"
          >
            <div className="contact-form-wrapper">
              
              {submitted ? (
                <div className="contact-submitted-state">
                  <div className="contact-submitted-icon">✦</div>
                  <h3 className="contact-submitted-title">INQUIRY RECEIVED.</h3>
                  <p className="contact-submitted-text">
                    Thank you for reaching out to AAR Visuals. A studio principal will review your brief and be in touch within one business day.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="contact-submitted-reset-btn" type="button">
                    <span>SEND ANOTHER MESSAGE</span>
                    <span>→</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-bespoke-form">
                  <div className="contact-form-top-bar">
                    <span className="contact-form-tag">PROJECT BRIEFING FORM</span>
                    <span className="contact-form-req-hint">* MANDATORY FIELDS</span>
                  </div>

                  {errorMessage && (
                    <div className="contact-form-error-alert" role="alert">
                      <span>⚠ {errorMessage}</span>
                    </div>
                  )}

                  <div className="contact-form-group">
                    <label className="contact-form-label">01 / YOUR NAME *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Helena Vance"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="contact-form-input"
                    />
                  </div>

                  <div className="contact-form-row">
                    <div className="contact-form-group">
                      <label className="contact-form-label">02 / EMAIL ADDRESS *</label>
                      <input
                        type="email"
                        required
                        placeholder="helena@brand.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="contact-form-input"
                      />
                    </div>

                    <div className="contact-form-group">
                      <label className="contact-form-label">03 / ORGANIZATION / BRAND</label>
                      <input
                        type="text"
                        placeholder="Company or Studio Name"
                        value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                        className="contact-form-input"
                      />
                    </div>
                  </div>

                  <div className="contact-form-group">
                    <label className="contact-form-label">04 / SCOPE OF COLLABORATION</label>
                    <div className="contact-service-chips">
                      {SERVICE_OPTIONS.map(svc => {
                        const isChecked = formData.services.includes(svc);
                        return (
                          <button
                            type="button"
                            key={svc}
                            className={`contact-chip-btn ${isChecked ? 'contact-chip-btn--active' : ''}`}
                            onClick={() => toggleService(svc)}
                          >
                            <span className="contact-chip-symbol">{isChecked ? '✓' : '+'}</span>
                            <span>{svc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="contact-form-group">
                    <label className="contact-form-label">05 / ESTIMATED LAUNCH HORIZON</label>
                    <div className="contact-timeline-radios">
                      {['Immediate (1–2 Months)', 'Within 3 Months', 'Q4 2026', 'Flexible / Retainer'].map(t => (
                        <label key={t} className="contact-radio-item">
                          <input
                            type="radio"
                            name="timeline"
                            value={t}
                            checked={formData.timeline === t}
                            onChange={e => setFormData({ ...formData, timeline: e.target.value })}
                            className="contact-native-radio"
                          />
                          <span>{t}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="contact-form-group">
                    <label className="contact-form-label">06 / PROJECT VISION & DETAILS</label>
                    <textarea
                      rows={5}
                      placeholder="Describe your project, objectives, aesthetic requirements, and any critical milestones..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="contact-form-textarea"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="contact-dispatch-btn"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'DISPATCHING INQUIRY...' : 'DISPATCH PROJECT INQUIRY'}</span>
                    <span className="contact-dispatch-arrow">{isSubmitting ? '✦' : '→'}</span>
                  </button>
                </form>
              )}

            </div>
          </motion.div>

        </div>

        {/* ── 02. DIRECT ATELIER DETAILS & DIGITAL ARCHIVES (BELOW FORM) ── */}
        <div className="contact-below-channels">
          <div className="contact-below-channels-grid">
            
            {/* 01. Physical Atelier */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="contact-below-node"
            >
              <span className="contact-below-label">PHYSICAL ATELIER</span>
              <p className="contact-below-address">
                AAR Visuals Atelier<br />
                Hauz Khas Design District<br />
                New Delhi 110016, India
              </p>
              <span className="contact-below-sub">Visits strictly by prior appointment</span>
            </motion.div>

            {/* 02. Studio Direct Contacts */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="contact-below-node"
            >
              <span className="contact-below-label">STUDIO DIRECT</span>
              <a href="mailto:aarvisuals01@gmail.com" className="contact-below-val">
                aarvisuals01@gmail.com
              </a>
              <a href="tel:+917011191450" className="contact-below-val">
                +91 70111 91450
              </a>
              <a 
                href="https://web.whatsapp.com/send?phone=917011191450" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-below-val contact-below-val--gold"
              >
                WhatsApp Studio Dispatch →
              </a>
            </motion.div>

            {/* 03. Digital Archives */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="contact-below-node contact-below-node--wide"
            >
              <span className="contact-below-label">DIGITAL ARCHIVES</span>
              <p className="contact-below-sub">Interactive studio channels & dispatches.</p>
              <SocialExpandButtons />
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default ContactSection;
