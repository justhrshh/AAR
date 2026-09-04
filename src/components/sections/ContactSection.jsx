import React, { useState } from 'react';
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

  return (
    <section id="contact" className="aar-contact-section">
      <div className="contact-section-container">

        {/* ── 01. SIDE-BY-SIDE: EDITORIAL HEADING & PROJECT BRIEFING FORM ── */}
        <div className="contact-hero-split-grid">
          
          {/* Left Column: Heading, Statement, Availability & Direct Contacts */}
          <div className="contact-heading-col">
            <div className="contact-header__eyebrow">
              <span className="contact-header__eyebrow-dash" />
              <span className="contact-header__eyebrow-text">CHAPTER 06 / INITIATE INQUIRY</span>
            </div>

            <h2 className="contact-header__title">
              HAVE SOMETHING<br />
              WORTH MAKING<br />
              <span className="contact-header__title--gold">VISIBLE</span>
              <span className="contact-header__title-dot">?</span>
            </h2>

            <div className="contact-status-badge">
              <span className="contact-status-dot" />
              <span className="contact-status-text">ACCEPTING SELECT Q3/Q4 COMMISSIONS</span>
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
                <span className="contact-direct-label">STUDIO DIRECT PHONE</span>
                <a href="tel:+917011191450" className="contact-direct-link">
                  +91 70111 91450
                </a>
                <a 
                  href="https://web.whatsapp.com/send?phone=917011191450" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-direct-whatsapp-link"
                >
                  WhatsApp Studio Dispatch →
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Project Briefing Form */}
          <div className="contact-form-col">
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
          </div>

        </div>

        {/* ── 02. DIRECT ATELIER DETAILS & DIGITAL ARCHIVES (BELOW FORM) ── */}
        <div className="contact-below-channels">
          <div className="contact-below-channels-grid">
            
            {/* 01. Physical Atelier */}
            <div className="contact-below-node">
              <span className="contact-below-label">PHYSICAL ATELIER</span>
              <p className="contact-below-address">
                AAR Visuals Atelier<br />
                Hauz Khas Design District<br />
                New Delhi 110016, India
              </p>
              <span className="contact-below-sub">Visits strictly by prior appointment</span>
            </div>

            {/* 02. Studio Direct Contacts */}
            <div className="contact-below-node">
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
            </div>

            {/* 03. Digital Archives */}
            <div className="contact-below-node contact-below-node--wide">
              <span className="contact-below-label">DIGITAL ARCHIVES</span>
              <div className="contact-social-pills">
                {[
                  { name: 'INSTAGRAM', handle: '@_aarvisuals', url: 'https://www.instagram.com/_aarvisuals/' },
                  { name: 'FACEBOOK', handle: 'AAR Visuals', url: 'https://www.facebook.com/profile.php?id=61593983872811' },
                  { name: 'X / TWITTER', handle: '@AARVISUALS01', url: 'https://x.com/AARVISUALS01' },
                  { name: 'THREADS', handle: '@_aarvisuals', url: 'https://www.threads.com/@_aarvisuals?hl=en' }
                ].map(soc => (
                  <a key={soc.name} href={soc.url} target="_blank" rel="noopener noreferrer" className="contact-social-card">
                    <span className="contact-social-platform">{soc.name}</span>
                    <span className="contact-social-user">{soc.handle}</span>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default ContactSection;
