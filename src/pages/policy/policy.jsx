import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import { ArrowLeft, Shield, Lock, Eye, Database, Cookie, Trash2 } from "lucide-react";
import "../../styles/legal-pages.css";

function PrivacyPolicy() {
  return (
    <div className="legal-page-wrapper">
      <Navbar />

      <div className="legal-container">
        {/* <Link to="/home" className="legal-back-nav">
          <ArrowLeft size={14} /> Back to Dashboard
        </Link> */}

        <div className="legal-header">
          <span className="legal-badge">✦ Privacy & Protection</span>
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-subtitle">
            How ResumeAI protects, handles, and encrypts your resumes, personal data, and account details.
          </p>
          <div className="legal-meta">
            <span>Last Updated: November 2026</span>
            <span>•</span>
            <span>Effective immediately upon registration</span>
          </div>
        </div>

        <div className="legal-card">
          <section className="legal-section">
            <h2>
              <Shield size={20} />
              1. Introduction
            </h2>
            <p>
              Welcome to <strong>ResumeAI</strong>. We respect your privacy and are committed to protecting the
              personal information and professional documents you share while using our resume evaluation and ATS optimization platform.
            </p>
          </section>

          <section className="legal-section">
            <h2>
              <Database size={20} />
              2. Information We Collect
            </h2>
            <p>To provide high-accuracy ATS scoring and account security, we collect the following:</p>
            <ul>
              <li><strong>Account Credentials:</strong> Full name, verified email address, and encrypted passwords.</li>
              <li><strong>Uploaded Resumes:</strong> PDF text, structural headings, skills, and work experience details.</li>
              <li><strong>Job Postings:</strong> Text snippets and job descriptions provided for keyword comparison.</li>
              <li><strong>Technical Logs:</strong> Browser version, IP address, and platform usage metrics.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>
              <Lock size={20} />
              3. How We Use & Protect Your Data
            </h2>
            <p>Your resume data is used exclusively for your direct analysis:</p>
            <ul>
              <li>To extract text and compare keywords with your target job description.</li>
              <li>To compute ATS formatting, section structure, and impact scores.</li>
              <li>To generate personalized bullet rewrites and actionable improvements.</li>
            </ul>
            <div className="legal-callout">
              <p>
                <strong>No Public Model Training:</strong> Your resumes and personal details are encrypted and
                are <strong>never</strong> sold, shared with recruiters without permission, or used to train public generative models.
              </p>
            </div>
          </section>

          <section className="legal-section">
            <h2>
              <Eye size={20} />
              4. Third-Party Integrations
            </h2>
            <p>
              ResumeAI integrates with industry-standard, secure infrastructure providers:
            </p>
            <ul>
              <li><strong>Firebase Authentication:</strong> Secure OAuth login with Google and email verification.</li>
              <li><strong>Cloud Storage:</strong> Encrypted document processing servers with restricted access controls.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>
              <Cookie size={20} />
              5. Cookies & Local Storage
            </h2>
            <p>
              We use secure HTTP cookies and local storage tokens (`accessToken`, `refreshToken`) solely to maintain
              your authenticated login session across page visits.
            </p>
          </section>

          <section className="legal-section">
            <h2>
              <Trash2 size={20} />
              6. Data Deletion & Your Rights
            </h2>
            <p>
              You own your data. You may request full deletion of your uploaded documents, account records, and analysis
              history at any time by contacting our support team at{" "}
              <a href="mailto:support@resumeai.com" style={{ textDecoration: "underline", color: "#000" }}>
                support@resumeai.com
              </a>.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
