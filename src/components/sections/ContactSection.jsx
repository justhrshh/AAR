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

  const toggleService = (svc) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(svc)
        ? prev.services.filter(s => s !== svc)
        : [...prev.services, svc]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="aar-contact-section">
      <div className="contact-section-container">

        {/* ── 01. HERO STATEMENT ── */}
        <div className="contact-header">
          <div className="contact-header__eyebrow">
            <span className="contact-header__eyebrow-dash" />
            <span className="contact-header__eyebrow-text">CHAPTER 06 / INITIATE INQUIRY</span>
          </div>

          <div className="contact-header__main-row">
            <h2 className="contact-header__title">
              HAVE SOMETHING<br />
              WORTH MAKING<br />
              <span className="contact-header__title--gold">VISIBLE</span>
              <span className="contact-header__title-dot">?</span>
            </h2>

            <div className="contact-header__status-col">
              <div className="contact-status-badge">
                <span className="contact-status-dot" />
                <span className="contact-status-text">ACCEPTING SELECT Q3/Q4 COMMISSIONS</span>
              </div>
              <p className="contact-header__body">
                We review every project proposal carefully. For prospective partnerships, lectures, or press inquiries, please use the form below or reach our directors directly.
              </p>
            </div>
          </div>
        </div>

        {/* ── 02. FORM & DIRECT CHANNELS GRID ── */}
        <div className="contact-grid">
          
          {/* Left Column: Direct Info */}
          <div className="contact-channels-col">
            <div className="contact-channel-node">
              <span className="contact-channel-label">DIRECT INQUIRIES</span>
              <a href="mailto:studio@aarvisuals.com" className="contact-channel-val contact-channel-val--big">
                studio@aarvisuals.com
              </a>
              <span className="contact-channel-sub">Typical response within 24 hours</span>
            </div>

            <div className="contact-channel-node">
              <span className="contact-channel-label">STUDIO DIRECT</span>
              <a href="tel:+911145678900" className="contact-channel-val">
                +91 (0) 11 4567 8900
              </a>
              <a href="https://wa.me/911145678900" target="_blank" rel="noopener noreferrer" className="contact-channel-val">
                WhatsApp Studio Dispatch →
              </a>
            </div>

            <div className="contact-channel-node">
              <span className="contact-channel-label">PHYSICAL ATELIER</span>
              <p className="contact-channel-address">
                AAR Visuals Atelier<br />
                Hauz Khas Design District<br />
                New Delhi 110016, India
              </p>
              <span className="contact-channel-sub">Visits strictly by prior appointment</span>
            </div>

            <div className="contact-channel-node">
              <span className="contact-channel-label">DIGITAL ARCHIVES</span>
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

          {/* Right Column: Minimal Form */}
          <div className="contact-form-col">
            <div className="contact-form-wrapper">
              
              {submitted ? (
                <div className="contact-submitted-state">
                  <div className="contact-submitted-icon">✦</div>
                  <h3 className="contact-submitted-title">INQUIRY RECEIVED.</h3>
                  <p className="contact-submitted-text">
                    Thank you for reaching out to AAR Visuals. A studio principal will review your brief and be in touch within one business day.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="contact-submitted-reset-btn">
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

                  <button type="submit" className="contact-dispatch-btn">
                    <span>DISPATCH PROJECT INQUIRY</span>
                    <span className="contact-dispatch-arrow">→</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default ContactSection;
