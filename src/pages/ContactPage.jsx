import React, { useState } from 'react';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/common/Footer';
import './ContactPage.css';

const SERVICE_OPTIONS = [
  'Brand Identity System',
  'Digital Experience / Web',
  '3D & Motion Direction',
  'Editorial & Art Direction',
  'Creative Technology'
];

export function ContactPage() {
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
    <div className="aar-contact-page">
      <Navbar />

      {/* ── 01. HERO STATEMENT ── */}
      <section className="contact-hero">
        <div className="contact-hero__container">
          
          <div className="contact-hero__eyebrow">
            <span className="contact-hero__eyebrow-dash" />
            <span className="contact-hero__eyebrow-text">INITIATE INQUIRY / 2026</span>
          </div>

          <div className="contact-hero__main">
            <h1 className="contact-hero__title">
              HAVE SOMETHING<br />
              WORTH MAKING<br />
              <span className="contact-hero__title--gold">VISIBLE</span>
              <span className="contact-hero__title-dot">?</span>
            </h1>

            <div className="contact-hero__status-col">
              <div className="contact-availability-badge">
                <span className="contact-availability-dot" />
                <span className="contact-availability-text">ACCEPTING SELECT Q3/Q4 COMMISSIONS</span>
              </div>
              <p className="contact-hero__body">
                We review every project proposal carefully. For prospective partnerships, lectures, or press inquiries, please use the form below or reach our directors directly.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── 02. ENQUIRY FORM & DIRECT CHANNELS GRID ── */}
      <section className="contact-main-section">
        <div className="contact-main-container">

          {/* Left Column: Direct Studio Information */}
          <div className="contact-info-col">
            <div className="contact-info-block">
              <span className="contact-info-label">DIRECT INQUIRIES</span>
              <a href="mailto:studio@aarvisuals.com" className="contact-info-link contact-info-link--large">
                studio@aarvisuals.com
              </a>
              <span className="contact-info-sub">Typical response within 24 hours</span>
            </div>

            <div className="contact-info-block">
              <span className="contact-info-label">STUDIO DIRECT</span>
              <a href="tel:+911145678900" className="contact-info-link">
                +91 (0) 11 4567 8900
              </a>
              <a href="https://wa.me/911145678900" target="_blank" rel="noopener noreferrer" className="contact-info-link">
                WhatsApp Studio Dispatch →
              </a>
            </div>

            <div className="contact-info-block">
              <span className="contact-info-label">PHYSICAL ATELIER</span>
              <p className="contact-info-address">
                AAR Visuals Atelier<br />
                Hauz Khas Design District<br />
                New Delhi 110016, India
              </p>
              <span className="contact-info-sub">Visits strictly by prior appointment</span>
            </div>

            <div className="contact-info-block">
              <span className="contact-info-label">DIGITAL ARCHIVES</span>
              <div className="contact-social-grid">
                {[
                  { name: 'INSTAGRAM', handle: '@aarvisuals', url: 'https://instagram.com' },
                  { name: 'BEHANCE', handle: 'aarvisuals', url: 'https://behance.net' },
                  { name: 'LINKEDIN', handle: 'AAR Visuals', url: 'https://linkedin.com' },
                  { name: 'DRIBBBLE', handle: 'aarvisuals', url: 'https://dribbble.com' }
                ].map(soc => (
                  <a key={soc.name} href={soc.url} target="_blank" rel="noopener noreferrer" className="contact-social-node">
                    <span className="contact-social-name">{soc.name}</span>
                    <span className="contact-social-handle">{soc.handle}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Bespoke Project Enquiry Form */}
          <div className="contact-form-col">
            <div className="contact-form-card">
              
              {submitted ? (
                <div className="contact-success-state">
                  <div className="contact-success-icon">✦</div>
                  <h3 className="contact-success-title">INQUIRY RECEIVED.</h3>
                  <p className="contact-success-text">
                    Thank you for reaching out to AAR Visuals. A studio principal will review your brief and be in touch within one business day.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="contact-reset-btn">
                    <span>SEND ANOTHER MESSAGE</span>
                    <span>→</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="contact-form-header">
                    <span className="contact-form-title">PROJECT BRIEFING FORM</span>
                    <span className="contact-form-required">* MANDATORY FIELDS</span>
                  </div>

                  {/* Input 1: Name */}
                  <div className="contact-field-group">
                    <label className="contact-label">01 / YOUR NAME *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Helena Vance"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="contact-input"
                    />
                  </div>

                  {/* Input 2: Email & Organization */}
                  <div className="contact-field-row">
                    <div className="contact-field-group">
                      <label className="contact-label">02 / EMAIL ADDRESS *</label>
                      <input
                        type="email"
                        required
                        placeholder="helena@brand.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="contact-input"
                      />
                    </div>

                    <div className="contact-field-group">
                      <label className="contact-label">03 / ORGANIZATION / BRAND</label>
                      <input
                        type="text"
                        placeholder="Company or Studio Name"
                        value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                        className="contact-input"
                      />
                    </div>
                  </div>

                  {/* Scope of Interest Checkboxes */}
                  <div className="contact-field-group">
                    <label className="contact-label">04 / SCOPE OF COLLABORATION</label>
                    <div className="contact-services-selector">
                      {SERVICE_OPTIONS.map(svc => {
                        const isChecked = formData.services.includes(svc);
                        return (
                          <button
                            type="button"
                            key={svc}
                            className={`contact-svc-btn ${isChecked ? 'contact-svc-btn--active' : ''}`}
                            onClick={() => toggleService(svc)}
                          >
                            <span className="contact-svc-checkbox">{isChecked ? '✓' : '+'}</span>
                            <span>{svc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Timeline Selection */}
                  <div className="contact-field-group">
                    <label className="contact-label">05 / ESTIMATED LAUNCH HORIZON</label>
                    <div className="contact-timeline-options">
                      {['Immediate (1–2 Months)', 'Within 3 Months', 'Q4 2026', 'Flexible / Retainer'].map(t => (
                        <label key={t} className="contact-timeline-label">
                          <input
                            type="radio"
                            name="timeline"
                            value={t}
                            checked={formData.timeline === t}
                            onChange={e => setFormData({ ...formData, timeline: e.target.value })}
                            className="contact-radio"
                          />
                          <span>{t}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="contact-field-group">
                    <label className="contact-label">06 / PROJECT VISION & DETAILS</label>
                    <textarea
                      rows={5}
                      placeholder="Describe your project, objectives, aesthetic requirements, and any critical milestones..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="contact-textarea"
                    />
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="contact-submit-btn">
                    <span>DISPATCH PROJECT INQUIRY</span>
                    <span className="contact-submit-arrow">→</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </section>

      <Footer theme="light" />
    </div>
  );
}

export default ContactPage;
