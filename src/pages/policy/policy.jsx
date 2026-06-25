import React, { useState, useEffect } from 'react';
import './PolicyPages.css';

export default function PolicyPages() {
  const [currentPage, setCurrentPage] = useState('privacy');
  const [expandedSections, setExpandedSections] = useState({});
  const [showScrollTop, setShowScrollTop] = useState(false);

  const toggleSection = (id) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleScroll = () => {
    setShowScrollTop(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const privacyContent = [
    {
      id: 'intro',
      title: 'Introduction',
      content: 'ResumeAI ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our resume analysis and generation platform.'
    },
    {
      id: 'information',
      title: 'Information We Collect',
      subsections: [
        {
          subtitle: 'Personal Information',
          text: 'When you create an account, we collect your name, email address, and password. If you upload documents or input resume content, we process and store that information to provide our services.'
        },
        {
          subtitle: 'Usage Data',
          text: 'We automatically collect information about how you interact with our platform, including IP address, browser type, pages visited, and time spent on features.'
        },
        {
          subtitle: 'Device Information',
          text: 'We collect information about the device you use to access our service, including device model, operating system, and unique device identifiers.'
        }
      ]
    },
    {
      id: 'usage',
      title: 'How We Use Your Information',
      content: 'Your information is used to: (1) Provide and improve our resume AI services; (2) Personalize your experience; (3) Communicate with you about updates and support; (4) Analyze usage patterns to enhance functionality; (5) Ensure security and prevent fraud; (6) Comply with legal obligations.'
    },
    {
      id: 'security',
      title: 'Data Security',
      content: 'We implement industry-standard security measures including SSL encryption, secure databases, and access controls to protect your personal information. However, no method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.'
    },
    {
      id: 'sharing',
      title: 'Data Sharing',
      content: 'We do not sell your personal information. We may share information with: (1) Service providers who assist in operating our platform; (2) Legal authorities when required by law; (3) Business partners with your consent; (4) Successors in case of merger or acquisition.'
    },
    {
      id: 'retention',
      title: 'Data Retention',
      content: 'We retain your personal information for as long as your account is active or as needed to provide services. You can request deletion of your account and associated data at any time by contacting us. Some information may be retained for legal or business purposes.'
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking',
      content: 'We use cookies and similar tracking technologies to enhance your experience. You can control cookie settings through your browser. Disabling cookies may affect certain features of our platform.'
    },
    {
      id: 'rights',
      title: 'Your Privacy Rights',
      content: 'Depending on your location, you may have the right to: (1) Access your personal data; (2) Correct inaccurate information; (3) Request deletion of your data; (4) Opt-out of marketing communications; (5) Data portability. Contact us to exercise these rights.'
    },
    {
      id: 'contact',
      title: 'Contact Us',
      content: 'If you have questions about this Privacy Policy, please contact us at privacy@resumeai.com or write to us at: ResumeAI, Privacy Department, [Your Address]'
    }
  ];

  const termsContent = [
    {
      id: 'intro',
      title: 'Terms of Service',
      content: 'These Terms of Service ("Terms") govern your access to and use of the ResumeAI platform and services. By accessing our platform, you agree to be bound by these Terms.'
    },
    {
      id: 'use',
      title: 'Acceptable Use',
      subsections: [
        {
          subtitle: 'Permitted Use',
          text: 'You agree to use ResumeAI only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use and enjoyment of the service.'
        },
        {
          subtitle: 'Prohibited Conduct',
          text: 'You agree not to: (1) Harass or cause distress or inconvenience; (2) Transmit malicious code or viruses; (3) Attempt unauthorized access; (4) Interfere with service operation; (5) Reverse engineer our software.'
        }
      ]
    },
    {
      id: 'account',
      title: 'User Accounts',
      content: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You agree to provide accurate information and notify us immediately of unauthorized access.'
    },
    {
      id: 'content',
      title: 'User Content',
      content: 'You retain ownership of content you upload (resumes, cover letters, etc.). By using our service, you grant us a license to use this content solely for providing and improving our services. We do not claim ownership of your content.'
    },
    {
      id: 'warranty',
      title: 'Disclaimers',
      content: 'Our platform is provided "as is" without warranties of any kind. We do not guarantee error-free operation, continuous availability, or that defects will be corrected. ResumeAI does not provide professional legal or career advice.'
    },
    {
      id: 'limitation',
      title: 'Limitation of Liability',
      content: 'To the maximum extent permitted by law, ResumeAI shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our service, even if advised of the possibility of such damages.'
    },
    {
      id: 'intellectual',
      title: 'Intellectual Property',
      content: 'All content, features, and functionality of ResumeAI, including software, text, graphics, and logos, are the exclusive property of ResumeAI or its content providers and are protected by international copyright and trademark laws.'
    },
    {
      id: 'termination',
      title: 'Termination',
      content: 'We may terminate your account and access to ResumeAI at any time, with or without cause. You may terminate your account anytime. Upon termination, your right to use the service ceases immediately.'
    },
    {
      id: 'changes',
      title: 'Changes to Terms',
      content: 'We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the platform. Your continued use of ResumeAI constitutes acceptance of modified Terms.'
    },
    {
      id: 'contact',
      title: 'Contact Us',
      content: 'For questions about these Terms, please contact us at legal@resumeai.com or write to us at: ResumeAI, Legal Department, [Your Address]'
    }
  ];

  const content = currentPage === 'privacy' ? privacyContent : termsContent;

  return (
    <div className="policy-container">
      {/* Header */}
      <header className="policy-header">
        <div className="header-content">
          <h1 className="header-title">ResumeAI</h1>

          {/* Tabs */}
          <div className="tabs-container">
            <button
              onClick={() => {
                setCurrentPage('privacy');
                setExpandedSections({});
              }}
              className={`tab-button ${currentPage === 'privacy' ? 'active' : ''}`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => {
                setCurrentPage('terms');
                setExpandedSections({});
              }}
              className={`tab-button ${currentPage === 'terms' ? 'active' : ''}`}
            >
              Terms of Service
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="policy-main">
        {/* Table of Contents */}
        <div className="toc-section">
          <div className="toc-card">
            <h2 className="toc-title">Contents</h2>
            <nav className="toc-grid">
              {content.map(section => (
                <button
                  key={section.id}
                  onClick={() => {
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="toc-link"
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Sections */}
        <div className="sections-container">
          {content.map(section => (
            <div
              key={section.id}
              id={section.id}
              className="section-card"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="section-header"
              >
                <h2 className="section-title">
                  {section.title}
                </h2>
                <span
                  className={`chevron-icon ${expandedSections[section.id] ? 'rotated' : ''}`}
                >
                  ⌄
                </span>
              </button>

              <div
                className={`section-content ${expandedSections[section.id] ? 'expanded' : ''}`}
              >
                {section.content && (
                  <p className="section-text">
                    {section.content}
                  </p>
                )}

                {section.subsections && (
                  <div>
                    {section.subsections.map((sub, idx) => (
                      <div key={idx} className="subsection">
                        <h3 className="subsection-title">
                          {sub.subtitle}
                        </h3>
                        <p className="subsection-text">
                          {sub.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="policy-footer">
          <p className="footer-text">
            Last updated: June 2024 | Version 1.0
          </p>
          <p className="footer-subtext">
            These policies are effective immediately and apply to all users of ResumeAI.
          </p>
        </div>
      </main>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </div>
  );
}