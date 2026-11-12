import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import { ArrowLeft, BookOpen, CheckSquare, ShieldCheck, Scale, AlertTriangle } from "lucide-react";
import "../../styles/legal-pages.css";

function Terms() {
  return (
    <div className="legal-page-wrapper">
      <Navbar />

      <div className="legal-container">
        {/* <Link to="/home" className="legal-back-nav">
          <ArrowLeft size={14} /> Back to Dashboard
        </Link> */}

        <div className="legal-header">
          <span className="legal-badge">✦ Agreement</span>
          <h1 className="legal-title">Terms & Conditions</h1>
          <p className="legal-subtitle">
            Rules, obligations, and guidelines governing your access to the ResumeAI platform and scanning features.
          </p>
          <div className="legal-meta">
            <span>Last Updated: November 2026</span>
            <span>•</span>
            <span>Standard Terms of Service</span>
          </div>
        </div>

        <div className="legal-card">
          <section className="legal-section">
            <h2>
              <BookOpen size={20} />
              1. Acceptance of Terms
            </h2>
            <p>
              By creating an account or accessing the <strong>ResumeAI</strong> website, you agree to be bound
              by these Terms & Conditions and our Privacy Policy. If you disagree with any portion of these terms,
              please discontinue use of the platform immediately.
            </p>
          </section>

          <section className="legal-section">
            <h2>
              <ShieldCheck size={20} />
              2. Description of Service
            </h2>
            <p>
              ResumeAI provides web-based AI tools for parsing resumes, calculating keyword match rates, identifying
              formatting errors for Applicant Tracking Systems (ATS), and generating recommendations for job applicants.
            </p>
          </section>

          <section className="legal-section">
            <h2>
              <CheckSquare size={20} />
              3. User Responsibilities & Acceptable Use
            </h2>
            <p>As a condition of using ResumeAI, you agree to:</p>
            <ul>
              <li>Provide accurate credentials during registration and maintain password confidentiality.</li>
              <li>Upload only documents that you own or have explicit authorization to evaluate.</li>
              <li>Refrain from attempting to reverse-engineer, overload, or disrupt our backend infrastructure.</li>
              <li>Review and verify all generated suggestions for factual accuracy before applying for roles.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>
              <AlertTriangle size={20} />
              4. Fair Use & Subscription Scans
            </h2>
            <p>
              Free accounts receive monthly scan allocations. Pro accounts receive unlimited scans subject to reasonable
              fair-use guidelines to prevent automated bot abuse. Automated scraping or bulk API hammering is strictly prohibited.
            </p>
          </section>

          <section className="legal-section">
            <h2>
              <Scale size={20} />
              5. Limitation of Liability
            </h2>
            <p>
              ResumeAI is provided on an "as-is" and "as-available" basis. In no event shall ResumeAI or its operators
              be held liable for employment decisions, lost interview opportunities, or damages resulting from reliance
              on automated scoring or suggestions.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Governing Law & Contact</h2>
            <p>
              These terms are governed by the laws applicable to online software services. For legal questions or notifications,
              please reach out to{" "}
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

export default Terms;
