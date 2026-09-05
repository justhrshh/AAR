import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../data/roles';
import { JOIN_BENEFITS } from '../data/joinBenefits';
import { JOIN_PROCESS } from '../data/joinProcess';
import { Footer } from '../components/common/Footer';
import './JoinPage.css';

export function JoinPage() {
  const navigate = useNavigate();
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const [selectedRole, setSelectedRole] = useState('graphic-design');
  
  // Application Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: 'graphic-design',
    portfolioUrl: '',
    bio: '',
    linkedinUrl: '',
    socialUrl: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const formRef = useRef(null);
  const rolesRef = useRef(null);

  const scrollToElement = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRoleSelectForApply = (roleId) => {
    setSelectedRole(roleId);
    setFormData((prev) => ({ ...prev, role: roleId }));
    scrollToElement(formRef);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid email is required';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.portfolioUrl.trim()) errors.portfolioUrl = 'Portfolio / Website URL is required';
    if (!formData.bio.trim()) errors.bio = 'Please share a brief introduction';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setFormErrors({});

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("access_key", "23bbd896-0b88-4a14-a488-0af01b47f083");
      formDataToSend.append("subject", `New Atelier Application: ${formData.fullName} (${formData.role})`);
      formDataToSend.append("from_name", formData.fullName);
      formDataToSend.append("name", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("role", formData.role);
      formDataToSend.append("portfolio_url", formData.portfolioUrl);
      formDataToSend.append("bio", formData.bio);
      formDataToSend.append("linkedin_url", formData.linkedinUrl || "N/A");
      formDataToSend.append("social_url", formData.socialUrl || "N/A");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend
      });

      const result = await response.json();
      if (result.success) {
        setFormSubmitted(true);
        scrollToElement(formRef);
      } else {
        setFormErrors({ submit: result.message || "Failed to submit. Please reach us directly at aarvisuals01@gmail.com" });
      }
    } catch (err) {
      setFormErrors({ submit: "Network error. Please reach us directly at aarvisuals01@gmail.com" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      role: 'graphic-design',
      portfolioUrl: '',
      bio: '',
      linkedinUrl: '',
      socialUrl: ''
    });
    setFormErrors({});
    setFormSubmitted(false);
  };

  return (
    <div className="join-page">
      {/* ── STICKY EDITORIAL TOP BAR ── */}
      <header className="join-nav">
        <div className="join-nav__container">
          <a href="/" className="join-nav__brand" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            <img src="/images/aar_logo.png" alt="AAR" className="join-nav__logo" />
            <div className="join-nav__brand-sub">
              <span>V</span><span>I</span><span>S</span><span>U</span><span>A</span><span>L</span><span>S</span>
            </div>
          </a>

          <div className="join-nav__tag">
            <span className="join-nav__tag-dot" />
            <span>TALENT INTAKE 2026</span>
          </div>

          <div className="join-nav__actions">
            <button onClick={() => navigate('/')} className="join-nav__btn join-nav__btn--ghost">
              ← RETURN HOME
            </button>
            <button onClick={() => scrollToElement(formRef)} className="join-nav__btn join-nav__btn--primary">
              APPLY NOW ↗
            </button>
          </div>
        </div>
      </header>

      {/* ── SECTION 01: HERO ── */}
      <section className="join-hero">
        <div className="join-hero__container">
          
          <div className="join-hero__content">
            <div className="join-hero__badge">
              <span className="join-hero__badge-dash" />
              <span>OPPORTUNITIES & COLLABORATIVE NETWORK</span>
            </div>

            <h1 className="join-hero__headline">
              JOIN OUR <br />
              <span className="join-hero__headline--gold">TALENT.</span>
            </h1>

            <p className="join-hero__copy">
              Designers, developers, editors, marketers and creators — if you have the skills to turn ideas into something people can see, we want to hear from you.
            </p>

            <div className="join-hero__ctas">
              <button 
                onClick={() => scrollToElement(rolesRef)}
                className="join-hero__cta join-hero__cta--primary"
              >
                <span>EXPLORE OPPORTUNITIES</span>
                <span className="join-hero__cta-arrow">↓</span>
              </button>

              <button 
                onClick={() => scrollToElement(formRef)}
                className="join-hero__cta join-hero__cta--secondary"
              >
                <span>APPLY NOW</span>
                <span className="join-hero__cta-arrow">↗</span>
              </button>
            </div>
          </div>

          {/* Art-Directed Creative Hero Visual Composition */}
          <div className="join-hero__visual-wrap">
            <div className="join-hero-canvas">
              <div className="join-canvas__card join-canvas__card--main">
                <img 
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop" 
                  alt="Creative Architecture" 
                  className="join-canvas__img"
                />
                <div className="join-canvas__overlay">
                  <span className="join-canvas__tag">DISCIPLINE OVER SHORTCUTS</span>
                  <span className="join-canvas__meta">09 CREATIVE DOMAINS</span>
                </div>
              </div>

              <div className="join-canvas__card join-canvas__card--floating">
                <div className="join-floating-badge">
                  <span className="join-floating-badge__icon">✦</span>
                  <div>
                    <strong>FREEDOM + IMPACT</strong>
                    <p>REAL PROJECTS IN THE WORLD</p>
                  </div>
                </div>
              </div>

              <div className="join-canvas__card join-canvas__card--code">
                <div className="join-code-preview">
                  <span className="join-code-line"><span className="code-kw">const</span> talent = <span className="code-fn">collaborate</span>({'{'}</span>
                  <span className="join-code-line code-indent">craft: <span className="code-str">"uncompromising"</span>,</span>
                  <span className="join-code-line code-indent">vision: <span className="code-str">"to_visibility"</span></span>
                  <span className="join-code-line">{'}'});</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 02: WHY JOIN US ── */}
      <section className="join-why-section">
        <div className="join-why-container">
          
          <div className="join-section-header">
            <span className="join-section-tag">01 / WHY AAR</span>
            <h2 className="join-section-title">
              CREATE WORK <br />
              <span className="join-section-title--gold">THAT MATTERS.</span>
            </h2>
            <p className="join-section-desc">
              AAR Visuals works across design, technology, content and marketing to help brands become more visible. Working with us means contributing to real projects and collaborating across different creative disciplines.
            </p>
          </div>

          <div className="join-why-grid">
            <div className="join-why-card">
              <span className="join-why-num">01</span>
              <h3 className="join-why-heading">REAL CLIENT WORK</h3>
              <p className="join-why-text">
                Work on projects that actually go into the world, command audiences, and shape modern brand identities.
              </p>
              <div className="join-why-corner" />
            </div>

            <div className="join-why-card">
              <span className="join-why-num">02</span>
              <h3 className="join-why-heading">CREATIVE COLLABORATION</h3>
              <p className="join-why-text">
                Work alongside passionate specialists from visual design, 3D, code, motion, and digital marketing.
              </p>
              <div className="join-why-corner" />
            </div>

            <div className="join-why-card">
              <span className="join-why-num">03</span>
              <h3 className="join-why-heading">BUILD YOUR PORTFOLIO</h3>
              <p className="join-why-text">
                Create work you can genuinely be proud to showcase—built with high craft, deep typography, and intention.
              </p>
              <div className="join-why-corner" />
            </div>

            <div className="join-why-card">
              <span className="join-why-num">04</span>
              <h3 className="join-why-heading">KEEP GROWING</h3>
              <p className="join-why-text">
                Learn, experiment, adopt modern AI tools, and expand your capabilities without arbitrary corporate ceilings.
              </p>
              <div className="join-why-corner" />
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 03: WHO WE'RE LOOKING FOR (ROLES) ── */}
      <section className="join-roles-section" ref={rolesRef}>
        <div className="join-roles-container">
          
          <div className="join-section-header">
            <span className="join-section-tag">02 / WHO WE'RE LOOKING FOR</span>
            <h2 className="join-section-title">
              BRING YOUR <br />
              <span className="join-section-title--gold">CRAFT.</span>
            </h2>
            <p className="join-section-desc">
              We look for specialists with sharp instincts, technical mastery, and pride in execution across 9 key creative disciplines.
            </p>
          </div>

          <div className="join-roles-list">
            {ROLES.map((role, idx) => {
              const isOpen = activeRoleIndex === idx;
              return (
                <div 
                  key={role.id} 
                  className={`join-role-row ${isOpen ? 'join-role-row--active' : ''}`}
                  onClick={() => setActiveRoleIndex(isOpen ? -1 : idx)}
                >
                  <div className="join-role-row__header">
                    <span className="join-role-row__num">{role.number}</span>
                    <div className="join-role-row__title-wrap">
                      <h3 className="join-role-row__title">{role.title}</h3>
                      <span className="join-role-row__category">{role.category}</span>
                    </div>
                    <span className="join-role-row__arrow">{isOpen ? '−' : '↗'}</span>
                  </div>

                  {isOpen && (
                    <div className="join-role-row__body">
                      <div className="join-role-body__left">
                        <p className="join-role-body__desc">{role.description}</p>
                        
                        <div className="join-role-skills">
                          <span className="join-role-skills__label">KEY CAPABILITIES:</span>
                          <div className="join-role-skills__pills">
                            {role.skills.map((s, sIdx) => (
                              <span key={sIdx} className="join-role-skill-pill">{s}</span>
                            ))}
                          </div>
                        </div>

                        <div className="join-role-skills">
                          <span className="join-role-skills__label">CORE TOOLS:</span>
                          <div className="join-role-skills__pills">
                            {role.tools.map((t, tIdx) => (
                              <span key={tIdx} className="join-role-tool-pill">{t}</span>
                            ))}
                          </div>
                        </div>

                        <button 
                          className="join-role-apply-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRoleSelectForApply(role.id);
                          }}
                        >
                          <span>APPLY FOR {role.title.toUpperCase()}</span>
                          <span>→</span>
                        </button>
                      </div>

                      <div className="join-role-body__right">
                        <div className="join-role-media-card">
                          <img src={role.image} alt={role.title} className="join-role-media-img" loading="lazy" />
                          <div className="join-role-media-meta">
                            <span>PRACTICE {role.number}</span>
                            <span>{role.category}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── SECTION 04: WHAT YOU GET ── */}
      <section className="join-benefits-section">
        <div className="join-benefits-container">
          
          <div className="join-section-header">
            <span className="join-section-tag">03 / WHAT YOU GET</span>
            <h2 className="join-section-title">
              MORE THAN <br />
              <span className="join-section-title--gold">A ROLE.</span>
            </h2>
            <p className="join-section-desc">
              We provide the framework, client momentum, and collaborative network so you can do the best work of your career.
            </p>
          </div>

          <div className="join-benefits-grid">
            {JOIN_BENEFITS.map((b) => (
              <div key={b.id} className="join-benefit-card">
                <div className="join-benefit-card__top">
                  <span className="join-benefit-num">{b.number}</span>
                  <span className="join-benefit-highlight">{b.highlight}</span>
                </div>
                <h3 className="join-benefit-title">{b.title}</h3>
                <p className="join-benefit-desc">{b.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 05: HOW IT WORKS ── */}
      <section className="join-process-section">
        <div className="join-process-container">
          
          <div className="join-section-header">
            <span className="join-section-tag">04 / THE INTAKE PROCESS</span>
            <h2 className="join-section-title">
              HOW IT <br />
              <span className="join-section-title--gold">WORKS.</span>
            </h2>
            <p className="join-section-desc">
              A transparent, straightforward path from portfolio submission to active creative collaboration.
            </p>
          </div>

          <div className="join-process-steps">
            {JOIN_PROCESS.map((p, idx) => (
              <div key={p.step} className="join-process-step">
                <div className="join-process-step__header">
                  <span className="join-process-step__num">{p.step}</span>
                  <div className="join-process-step__line" />
                </div>
                <h3 className="join-process-step__title">{p.title}</h3>
                <span className="join-process-step__subtitle">{p.subtitle}</span>
                <p className="join-process-step__desc">{p.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 06: APPLICATION FORM ── */}
      <section className="join-apply-section" ref={formRef}>
        <div className="join-apply-container">
          
          <div className="join-apply-card">
            {!formSubmitted ? (
              <>
                <div className="join-apply-header">
                  <span className="join-section-tag">05 / APPLICATION</span>
                  <h2 className="join-apply-title">
                    LET’S CREATE <br />
                    <span className="join-apply-title--gold">SOMETHING.</span>
                  </h2>
                  <p className="join-apply-desc">
                    Think you’d be a good fit for AAR Visuals? Tell us a little about yourself, your craft, and your best work.
                  </p>
                </div>

                <form className="join-form" onSubmit={handleSubmit} noValidate>
                  
                  {/* Row 1: Name & Email */}
                  <div className="join-form-row">
                    <div className="join-form-group">
                      <label htmlFor="fullName" className="join-form-label">
                        FULL NAME <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Alex Sharma"
                        className={`join-form-input ${formErrors.fullName ? 'join-form-input--error' : ''}`}
                      />
                      {formErrors.fullName && <span className="join-form-error">{formErrors.fullName}</span>}
                    </div>

                    <div className="join-form-group">
                      <label htmlFor="email" className="join-form-label">
                        EMAIL ADDRESS <span className="req">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. alex@example.com"
                        className={`join-form-input ${formErrors.email ? 'join-form-input--error' : ''}`}
                      />
                      {formErrors.email && <span className="join-form-error">{formErrors.email}</span>}
                    </div>
                  </div>

                  {/* Row 2: Phone & Role */}
                  <div className="join-form-row">
                    <div className="join-form-group">
                      <label htmlFor="phone" className="join-form-label">
                        PHONE / WHATSAPP <span className="req">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        className={`join-form-input ${formErrors.phone ? 'join-form-input--error' : ''}`}
                      />
                      {formErrors.phone && <span className="join-form-error">{formErrors.phone}</span>}
                    </div>

                    <div className="join-form-group">
                      <label htmlFor="role" className="join-form-label">
                        PRIMARY CRAFT / ROLE <span className="req">*</span>
                      </label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="join-form-select"
                      >
                        {ROLES.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.number} — {r.title} ({r.category})
                          </option>
                        ))}
                        <option value="other">10 — Other Creative Specialist</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Portfolio URL */}
                  <div className="join-form-group">
                    <label htmlFor="portfolioUrl" className="join-form-label">
                      PORTFOLIO URL / BEHANCE / GITHUB / DRIVE <span className="req">*</span>
                    </label>
                    <input
                      type="url"
                      id="portfolioUrl"
                      name="portfolioUrl"
                      value={formData.portfolioUrl}
                      onChange={handleInputChange}
                      placeholder="https://yourportfolio.com or Drive link"
                      className={`join-form-input ${formErrors.portfolioUrl ? 'join-form-input--error' : ''}`}
                    />
                    {formErrors.portfolioUrl && <span className="join-form-error">{formErrors.portfolioUrl}</span>}
                  </div>

                  {/* Row 4: Bio / Statement */}
                  <div className="join-form-group">
                    <label htmlFor="bio" className="join-form-label">
                      SHORT INTRODUCTION & EXPERTISE <span className="req">*</span>
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows="4"
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder="Tell us about your background, the tools you love, and the kind of work you want to create..."
                      className={`join-form-textarea ${formErrors.bio ? 'join-form-input--error' : ''}`}
                    />
                    {formErrors.bio && <span className="join-form-error">{formErrors.bio}</span>}
                  </div>


                  {/* Row 6: LinkedIn & Socials (OPTIONAL) */}
                  <div className="join-form-row">
                    <div className="join-form-group">
                      <label htmlFor="linkedinUrl" className="join-form-label">
                        LINKEDIN PROFILE <span className="opt">(OPTIONAL)</span>
                      </label>
                      <input
                        type="url"
                        id="linkedinUrl"
                        name="linkedinUrl"
                        value={formData.linkedinUrl}
                        onChange={handleInputChange}
                        placeholder="https://linkedin.com/in/..."
                        className="join-form-input"
                      />
                    </div>

                    <div className="join-form-group">
                      <label htmlFor="socialUrl" className="join-form-label">
                        INSTAGRAM / DRIBBBLE / X <span className="opt">(OPTIONAL)</span>
                      </label>
                      <input
                        type="url"
                        id="socialUrl"
                        name="socialUrl"
                        value={formData.socialUrl}
                        onChange={handleInputChange}
                        placeholder="https://instagram.com/..."
                        className="join-form-input"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="join-form-submit-wrap">
                    {formErrors.submit && (
                      <div className="join-form-error-banner" style={{ background: '#fef2f2', border: '1px solid #f87171', color: '#b91c1c', padding: '12px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', marginBottom: '16px', width: '100%', boxSizing: 'border-box' }}>
                        ⚠ {formErrors.submit}
                      </div>
                    )}
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="join-form-submit-btn"
                    >
                      <span>{isSubmitting ? 'TRANSMITTING APPLICATION...' : 'SEND APPLICATION'}</span>
                      <span className="join-form-submit-arrow">↗</span>
                    </button>
                    <span className="join-form-privacy-note">
                      We respect your privacy. Portfolios are reviewed exclusively by our creative directors.
                    </span>
                  </div>

                </form>
              </>
            ) : (
              /* Success State */
              <div className="join-success-state">
                <div className="join-success-badge">✓</div>
                <h2 className="join-success-title">APPLICATION RECEIVED.</h2>
                <p className="join-success-desc">
                  Thanks for reaching out, <strong>{formData.fullName}</strong>. We'll review your portfolio and get back to you if there’s a fit for upcoming projects.
                </p>
                <div className="join-success-meta">
                  <span>DISCIPLINE: {formData.role.toUpperCase()}</span>
                  <span>ESTIMATED REVIEW: 48–72 HOURS</span>
                </div>
                <button onClick={resetForm} className="join-success-btn">
                  SUBMIT ANOTHER APPLICATION
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ── SECTION 07: FINAL CTA ── */}
      <section className="join-final-cta-section">
        <div className="join-final-cta-container">
          <span className="join-final-cta-eyebrow">AAR CREATIVE NETWORK</span>
          <h2 className="join-final-cta-heading">
            HAVE SOMETHING <br />
            <span className="join-final-cta-heading--gold">TO BRING?</span>
          </h2>
          <p className="join-final-cta-sub">
            We’re building a creative network around the work. Maybe you belong in it.
          </p>
          <button 
            onClick={() => scrollToElement(formRef)}
            className="join-final-cta-btn"
          >
            <span>JOIN OUR TALENT</span>
            <span className="join-final-cta-btn__arrow">↗</span>
          </button>
        </div>
      </section>

      {/* Shared Editorial Footer */}
      <Footer theme="light" />
    </div>
  );
}

export default JoinPage;
