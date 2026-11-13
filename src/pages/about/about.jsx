import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import { ArrowLeft, Target, Award, Users, Sparkles, Zap, Shield } from "lucide-react";
import "../../styles/legal-pages.css";

function About() {
  return (
    <div className="legal-page-wrapper">
      <Navbar />

      <div className="legal-container">
        {/* <Link to="/home" className="legal-back-nav">
          <ArrowLeft size={14} /> Back to Dashboard
        </Link> */}

        <div className="legal-header">
          {/* <span className="legal-badge">✦ Our Mission</span> */}
          <h1 className="legal-title">Leveling the Playing Field for Job Seekers</h1>
          <p className="legal-subtitle">
            Over 75% of resumes are rejected by automated ATS filters before a hiring manager ever sees them.
            ResumeAI was built to give every applicant recruiter-level insights.
          </p>
        </div>

        <div className="legal-card">
          <section className="legal-section">
            <h2>
              <Target size={20} />
              Who We Are
            </h2>
            <p>
              <strong>ResumeAI</strong> is an intelligent resume optimization platform designed to eliminate the guesswork
              from modern job applications. We combine deep Applicant Tracking System (ATS) parsing rules with cutting-edge
              language models to give candidates real-time feedback on formatting, keyword gaps, and bullet point impact.
            </p>
          </section>

          <section className="legal-section">
            <h2>
              <Award size={20} />
              Our Core Philosophy
            </h2>
            <p>
              Great candidates shouldn’t miss out on interviews simply because their resume lacked a specific synonym
              or had a two-column format that broke a legacy parser. We believe:
            </p>
            <ul>
              <li><strong>Transparency over guessing:</strong> You should know exactly why a line might get filtered out.</li>
              <li><strong>Actionable fixes:</strong> Every detected gap comes with a concrete, one-click rewrite.</li>
              <li><strong>Privacy by default:</strong> Your career history is private and never sold to third parties.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>
              <Sparkles size={20} />
              What Makes Us Different
            </h2>
            <div className="legal-callout">
              <p>
                Unlike generic resume builders that charge high fees for static Word templates, ResumeAI focuses on the
                <strong>actual algorithmic filters</strong> used by Fortune 500 recruiters — keyword relevance, parseability,
                and quantified business impact.
              </p>
            </div>
            <ul>
              <li><strong>Instant ATS Score:</strong> A comprehensive 0-100 score analyzing 40+ ATS benchmarks.</li>
              <li><strong>Role-Specific Skill Gap:</strong> Side-by-side comparison of skills in the job posting vs your resume.</li>
              <li><strong>Bullet Point Optimizer:</strong> Turns passive job descriptions into metric-driven achievements.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>
              <Users size={20} />
              Join Thousands of Successful Applicants
            </h2>
            <p>
              Whether you are a fresher looking for your first tech role or a senior executive targeting leadership positions,
              ResumeAI gives you the competitive edge needed to land interviews consistently.
            </p>
            {/* <div style={{ marginTop: "24px" }}>
              <Link to="/home" className="contact-submit-btn" style={{ textDecoration: "none" }}>
                <Zap size={16} />
                <span>Start Free Scan on Dashboard →</span>
              </Link>
            </div> */}
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;
