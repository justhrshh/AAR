import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROLES } from '../data/roles';
import { JOIN_BENEFITS } from '../data/joinBenefits';
import { JOIN_PROCESS } from '../data/joinProcess';
import { SplitText } from '../components/ui/SplitText';
import { TypewriterText } from '../components/ui/TypewriterText';
import { Footer } from '../components/common/Footer';
import './JoinPage.css';

// ── EDITORIAL PINNED HIGHLIGHT BOX (Reference: media_1788622751110.png) ──
const EditorialPinBox = ({ children, className = '' }) => (
  <span className={`join-pin-box ${className}`}>
    <span className="join-pin-box__stem join-pin-box__stem--tl" aria-hidden="true">
      <span className="join-pin-box__dot" />
    </span>
    <span className="join-pin-box__content">{children}</span>
    <span className="join-pin-box__stem join-pin-box__stem--br" aria-hidden="true">
      <span className="join-pin-box__dot" />
    </span>
  </span>
);

export function JoinPage() {
  const navigate = useNavigate();
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const [selectedRole, setSelectedRole] = useState('graphic-design');

  // Handle mobile device back button / swipe back gesture to take user home
  useEffect(() => {
    window.history.pushState({ page: 'join' }, '', window.location.pathname);
    const handlePopState = () => {
      navigate('/');
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);
  
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
  const [showOptionalFields, setShowOptionalFields] = useState(false);

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
    
    // Bio is required on desktop or if user intentionally expanded additional fields on mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    if ((!isMobile || showOptionalFields) && !formData.bio.trim()) {
      errors.bio = 'Please share a brief introduction';
    }
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
      formDataToSend.append("bio", formData.bio.trim() || "Mobile portfolio applicant");
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
          <Link to="/" className="join-nav__brand" onClick={(e) => { e.preventDefault(); navigate('/'); window.scrollTo(0, 0); }}>
            <img src="/images/aar_logo.png" alt="AAR" className="join-nav__logo" />
            <div className="join-nav__brand-sub">
              <span>V</span><span>I</span><span>S</span><span>U</span><span>A</span><span>L</span><span>S</span>
            </div>
          </Link>

          <div className="join-nav__tag">
            <span className="join-nav__tag-dot" />
            <span>TALENT INTAKE 2026</span>
          </div>

          <div className="join-nav__actions">
            <Link 
              to="/" 
              onClick={(e) => { e.preventDefault(); navigate('/'); window.scrollTo(0, 0); }} 
              className="join-nav__btn join-nav__btn--ghost"
            >
              <span className="join-nav__back-desktop">← RETURN HOME</span>
              <span className="join-nav__back-mobile">← HOME</span>
            </Link>
            <button onClick={() => scrollToElement(formRef)} className="join-nav__btn join-nav__btn--primary">
              APPLY NOW ↗
            </button>
          </div>
        </div>
      </header>

      {/* ── SECTION 01: HERO WITH ARCHITECTURAL WAVES & ARTWORK ── */}
      <section className="join-hero">
        {/* Subtle Ambient Architectural Contour Background Waves */}
        <div className="join-hero__ambient-waves" aria-hidden="true">
          <svg viewBox="0 0 1440 700" fill="none" preserveAspectRatio="none" className="w-full h-full">
            <path d="M-100,520 C240,460 480,180 840,240 C1200,300 1340,110 1600,160" stroke="#c9962c" strokeWidth="1.2" opacity="0.22" />
            <path d="M-100,560 C260,500 510,220 870,280 C1230,340 1370,150 1600,200" stroke="#c9962c" strokeWidth="1.0" opacity="0.18" />
            <path d="M-100,600 C280,540 540,260 900,320 C1260,380 1400,190 1600,240" stroke="#c9962c" strokeWidth="0.8" opacity="0.14" />
            <path d="M-100,640 C300,580 570,300 930,360 C1290,420 1430,230 1600,280" stroke="#c9962c" strokeWidth="0.7" opacity="0.10" />
          </svg>
        </div>

        <div className="join-hero__container">
          
          {/* Left Column: Narrative & Action */}
          <div className="join-hero__content">
            <div className="join-hero__badge">
              <span className="join-hero__badge-dash" />
              <TypewriterText
                words={[
                  "CHAPTER 05 / ATELIER TALENT INTAKE",
                  "OPPORTUNITIES & COLLABORATIVE NETWORK",
                  "FOR PEOPLE WHO MAKE THINGS THAT MATTER",
                  "WHERE INDIVIDUAL VISION FINDS VISIBILITY"
                ]}
                speed={50}
                pauseTime={2800}
                loop={true}
                cursorChar="|"
                className="join-hero__badge-text"
              />
            </div>

            <h1 className="join-hero__headline">
              <span className="join-heading-lead"><SplitText text="JOIN OUR" type="words" delay={0.15} stagger={0.04} /></span> <br />
              <EditorialPinBox className="join-hero__headline--pin">
                <SplitText text="Talent." type="words" delay={0.35} />
              </EditorialPinBox>
            </h1>

            <p className="join-hero__copy">
              Designers, developers, animators, strategists and obsessive makers — we're assembling an international network for practitioners who care about the depth of the work as much as the idea.
            </p>

            <div className="join-hero__ctas">
              <button 
                onClick={() => scrollToElement(rolesRef)}
                className="join-hero__cta join-hero__cta--primary"
              >
                <span>EXPLORE DISCIPLINES</span>
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

            {/* Editorial Metrics Strip matching Selected Projects reference */}
            <div className="join-hero__metrics-strip">
              <div className="join-metric-item">
                <span className="join-metric-val">09</span>
                <span className="join-metric-label">CREATIVE PRACTICES</span>
              </div>
              <div className="join-metric-item">
                <span className="join-metric-val">100%</span>
                <span className="join-metric-label">DIRECT ATTRIBUTION</span>
              </div>
              <div className="join-metric-item">
                <span className="join-metric-val">48H</span>
                <span className="join-metric-label">REVIEW DISPATCH</span>
              </div>
            </div>
          </div>

          {/* Right Column: Art-Directed Editorial Showcase Plate with user-uploaded Image */}
          <motion.div 
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="join-hero__visual-wrap"
          >
            <div className="join-hero-art-plate">
              
              {/* Technical Corner Brackets */}
              <span className="join-art-corner join-art-corner--tl" />
              <span className="join-art-corner join-art-corner--tr" />
              <span className="join-art-corner join-art-corner--bl" />
              <span className="join-art-corner join-art-corner--br" />

              {/* Floating Badge Top-Right */}
              <div className="join-art-badge join-art-badge--top">
                <span className="join-art-badge__icon">✦</span>
                <div className="join-art-badge__content">
                  <span className="join-art-badge__title">ATELIER CULTURE</span>
                  <span className="join-art-badge__sub">TOGETHER WE CAN MAKE EVERYTHING BETTER</span>
                </div>
              </div>

              {/* Illustration Art Container */}
              <div className="join-art-img-wrap">
                <img 
                  src="/images/join_team_illustration.png" 
                  alt="Join Our Creative Talent" 
                  className="join-art-team-img"
                />
              </div>

              {/* Floating Pill Bottom-Left */}
              <div className="join-art-badge join-art-badge--bottom">
                <span className="join-art-badge__dot" />
                <span>09 DISCIPLINES • WORLDWIDE COLLABORATION</span>
              </div>

              {/* Fine Bottom Caption */}
              <div className="join-art-caption">
                <span>AAR VISUALS ATELIER • TALENT INTAKE</span>
                <span>COMMISSION COHORT 2026</span>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* ── SECTION 02: WHY JOIN US (EDITORIAL CARDS) ── */}
      <section className="join-why-section">
        <div className="join-why-container">
          
          <div className="join-section-header">
            <span className="join-section-tag">01 / WHY AAR</span>
            <h2 className="join-section-title">
              <span className="join-heading-lead"><SplitText text="CREATE WORK" type="words" delay={0.1} /></span> <br />
              <EditorialPinBox className="join-section-title--pin">
                <SplitText text="That matters." type="words" delay={0.25} />
              </EditorialPinBox>
            </h2>
            <p className="join-section-desc">
              AAR Visuals operates at the intersection of brand identity, digital architecture, and kinetic motion. Working with us means contributing to real projects with uncompromising craft.
            </p>
          </div>

          <div className="join-why-grid">
            <div className="join-why-card">
              <span className="join-why-num">01</span>
              <h3 className="join-why-heading">REAL CLIENT WORK</h3>
              <p className="join-why-text">
                Work on commissions that launch globally, command audiences, and shape modern brand identities without artificial corporate bureaucracy.
              </p>
              <div className="join-why-corner" />
            </div>

            <div className="join-why-card">
              <span className="join-why-num">02</span>
              <h3 className="join-why-heading">RADICAL CRAFT</h3>
              <p className="join-why-text">
                Collaborate with obsessive specialists who value mathematical layout tension, customized typography, and tactile sensorial physics.
              </p>
              <div className="join-why-corner" />
            </div>

            <div className="join-why-card">
              <span className="join-why-num">03</span>
              <h3 className="join-why-heading">PORTFOLIO IMPACT</h3>
              <p className="join-why-text">
                Build case studies you will be proud of for decades. Every collaborator receives direct public credit and attribution for their contributions.
              </p>
              <div className="join-why-corner" />
            </div>

            <div className="join-why-card">
              <span className="join-why-num">04</span>
              <h3 className="join-why-heading">FLUID AUTONOMY</h3>
              <p className="join-why-text">
                Flexible project-based and retainer partnerships tailored for global remote talent, independent directors, and visionary studios.
              </p>
              <div className="join-why-corner" />
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 03: WHO WE'RE LOOKING FOR (ROLES ACCORDION) ── */}
      <section className="join-roles-section" ref={rolesRef}>
        <div className="join-roles-container">
          
          <div className="join-section-header join-roles-header">
            <span className="join-section-tag">02 / WHO WE'RE LOOKING FOR</span>
            <h2 className="join-section-title">
              <span className="join-heading-lead"><SplitText text="BRING YOUR" type="words" delay={0.1} /></span> <br />
              <EditorialPinBox className="join-section-title--pin">
                <SplitText text="Craft." type="words" delay={0.25} />
              </EditorialPinBox>
            </h2>
            <p className="join-section-desc">
              We look for specialists with sharp instincts, technical precision, and obsessive execution across 9 primary creative practices.
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
              <span className="join-heading-lead"><SplitText text="MORE THAN" type="words" delay={0.1} /></span> <br />
              <EditorialPinBox className="join-section-title--pin">
                <SplitText text="A role." type="words" delay={0.25} />
              </EditorialPinBox>
            </h2>
            <p className="join-section-desc">
              We provide the framework, client momentum, and collaborative network so you can do the most defining work of your career.
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

      {/* ── SECTION 05: THE INTAKE PROCESS ── */}
      <section className="join-process-section">
        <div className="join-process-container">
          
          <div className="join-section-header">
            <span className="join-section-tag">04 / THE INTAKE PROCESS</span>
            <h2 className="join-section-title">
              <span className="join-heading-lead"><SplitText text="HOW IT" type="words" delay={0.1} /></span> <br />
              <EditorialPinBox className="join-section-title--pin">
                <SplitText text="Works." type="words" delay={0.25} />
              </EditorialPinBox>
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

      {/* ── SECTION 06: BESPOKE APPLICATION FORM ── */}
      <section className="join-apply-section" ref={formRef}>
        <div className="join-apply-container">
          
          <div className="join-apply-card">
            {!formSubmitted ? (
              <>
                <div className="join-apply-header">
                  <span className="join-section-tag">05 / INTAKE PROTOCOL</span>
                  <h2 className="join-apply-title">
                    <span className="join-heading-lead"><SplitText text="LET’S CREATE" type="words" delay={0.1} /></span> <br />
                    <EditorialPinBox className="join-apply-title--pin">
                      <SplitText text="Something." type="words" delay={0.25} />
                    </EditorialPinBox>
                  </h2>
                  <p className="join-apply-desc">
                    Ready to build enduring visual systems with AAR Visuals? Tell us about yourself, your craft, and your best work.
                  </p>
                </div>

                <form className="join-form" onSubmit={handleSubmit} noValidate>
                  
                  {/* Row 1: Name & Email */}
                  <div className="join-form-row">
                    <div className="join-form-group">
                      <label htmlFor="fullName" className="join-form-label">
                        01 / FULL NAME <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Helena Vance"
                        className={`join-form-input ${formErrors.fullName ? 'join-form-input--error' : ''}`}
                      />
                      {formErrors.fullName && <span className="join-form-error">{formErrors.fullName}</span>}
                    </div>

                    <div className="join-form-group">
                      <label htmlFor="email" className="join-form-label">
                        02 / EMAIL ADDRESS <span className="req">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. helena@studio.com"
                        className={`join-form-input ${formErrors.email ? 'join-form-input--error' : ''}`}
                      />
                      {formErrors.email && <span className="join-form-error">{formErrors.email}</span>}
                    </div>
                  </div>

                  {/* Row 2: Phone & Role */}
                  <div className="join-form-row">
                    <div className="join-form-group">
                      <label htmlFor="phone" className="join-form-label">
                        03 / PHONE / WHATSAPP <span className="req">*</span>
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
                        04 / PRIMARY CRAFT <span className="req">*</span>
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
                            {r.number} — {r.title}
                          </option>
                        ))}
                        <option value="other">10 — Other Specialist</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Portfolio URL */}
                  <div className="join-form-group">
                    <label htmlFor="portfolioUrl" className="join-form-label">
                      05 / PORTFOLIO / WORK LINK <span className="req">*</span>
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

                  {/* Secondary Fields: Bio & Socials (Desktop: always visible. Mobile: hidden by default for breathing space) */}
                  <div className={`join-form-optional-block ${showOptionalFields ? 'join-form-optional-block--open' : ''}`}>
                    {/* Bio / Statement */}
                    <div className="join-form-group">
                      <label htmlFor="bio" className="join-form-label">
                        06 / SHORT INTRODUCTION & FOCUS <span className="req">*</span>
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows="3"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Tell us about your background, tools you obsess over, and work you want to build..."
                        className={`join-form-textarea ${formErrors.bio ? 'join-form-input--error' : ''}`}
                      />
                      {formErrors.bio && <span className="join-form-error">{formErrors.bio}</span>}
                    </div>

                    {/* LinkedIn & Socials */}
                    <div className="join-form-row">
                      <div className="join-form-group">
                        <label htmlFor="linkedinUrl" className="join-form-label">
                          07 / LINKEDIN <span className="opt">(OPTIONAL)</span>
                        </label>
                        <input
                          type="url"
                          id="linkedinUrl"
                          name="linkedinUrl"
                          value={formData.linkedinUrl}
                          onChange={handleInputChange}
                          placeholder="linkedin.com/in/..."
                          className="join-form-input"
                        />
                      </div>

                      <div className="join-form-group">
                        <label htmlFor="socialUrl" className="join-form-label">
                          08 / INSTAGRAM / X <span className="opt">(OPTIONAL)</span>
                        </label>
                        <input
                          type="url"
                          id="socialUrl"
                          name="socialUrl"
                          value={formData.socialUrl}
                          onChange={handleInputChange}
                          placeholder="instagram.com/..."
                          className="join-form-input"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mobile-only toggle button for optional fields */}
                  <button
                    type="button"
                    className="join-form-mobile-toggle"
                    onClick={() => setShowOptionalFields((prev) => !prev)}
                  >
                    <span>{showOptionalFields ? '− HIDE OPTIONAL FIELDS' : '+ ADD NOTE OR SOCIAL LINKS (OPTIONAL)'}</span>
                  </button>

                  {/* Submit Button */}
                  <div className="join-form-submit-wrap">
                    {formErrors.submit && (
                      <div className="join-form-error-banner">
                        ⚠ {formErrors.submit}
                      </div>
                    )}
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="join-form-submit-btn"
                    >
                      <span>{isSubmitting ? 'TRANSMITTING APPLICATION...' : 'DISPATCH APPLICATION'}</span>
                      <span className="join-form-submit-arrow">↗</span>
                    </button>
                    <span className="join-form-privacy-note">
                      We respect your privacy. Submissions are reviewed exclusively by AAR Visuals principals within 48 hours.
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
                  Thank you for reaching out, <strong>{formData.fullName}</strong>. Our creative directors will review your portfolio and reach out regarding active project commissions.
                </p>
                <div className="join-success-meta">
                  <span>DISCIPLINE: {formData.role.toUpperCase()}</span>
                  <span>ESTIMATED REVIEW: 48 HOURS</span>
                </div>
                <button onClick={resetForm} className="join-success-btn">
                  SUBMIT ANOTHER APPLICATION
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ── SECTION 07: FINAL EDITORIAL CALLOUT ── */}
      <section className="join-final-cta-section">
        <div className="join-final-cta-container">
          <span className="join-final-cta-eyebrow">AAR CREATIVE NETWORK</span>
          <h2 className="join-final-cta-heading">
            <span className="join-heading-lead"><SplitText text="HAVE SOMETHING" type="words" delay={0.1} /></span> <br />
            <EditorialPinBox className="join-final-cta-heading--pin">
              <SplitText text="To bring?" type="words" delay={0.25} />
            </EditorialPinBox>
          </h2>
          <p className="join-final-cta-sub">
            We’re building a creative network around enduring work. Maybe you belong in it.
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
