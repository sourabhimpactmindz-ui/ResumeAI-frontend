import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import { ArrowLeft, ShieldAlert, AlertCircle, FileCheck, ExternalLink } from "lucide-react";
import "../../styles/legal-pages.css";

function Disclaimer() {
  return (
    <div className="legal-page-wrapper">
      <Navbar />

      <div className="legal-container">
        <Link to="/home" className="legal-back-nav">
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>

        <div className="legal-header">
          <span className="legal-badge">✦ Legal Compliance</span>
          <h1 className="legal-title">Platform Disclaimer</h1>
          <p className="legal-subtitle">
            Important information regarding the use of AI evaluation tools, recommendations, and career resources.
          </p>
          <div className="legal-meta">
            <span>Last Updated: November 2026</span>
            <span>•</span>
            <span>Applies to all ResumeAI services</span>
          </div>
        </div>

        <div className="legal-card">
          <section className="legal-section">
            <h2>
              <AlertCircle size={20} />
              1. General Information
            </h2>
            <p>
              The information, scoring models, and suggestions provided by <strong>ResumeAI</strong> are designed
              to assist job seekers in structuring and enhancing their resumes. They represent automated evaluations
              based on standard Applicant Tracking System (ATS) guidelines and natural language models.
            </p>
          </section>

          <section className="legal-section">
            <h2>
              <ShieldAlert size={20} />
              2. AI-Generated Content & Accuracy
            </h2>
            <p>
              AI-generated keyword suggestions, bullet rewrites, and summaries are generated through automated algorithms.
              While we continually calibrate our models against real enterprise parsing software:
            </p>
            <ul>
              <li>AI outputs are recommendations and must be verified by the user before job submission.</li>
              <li>ResumeAI does not fabricate credentials, job titles, or experience on behalf of users.</li>
              <li>Users maintain full ownership and final responsibility for the truthfulness of their documents.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>
              <FileCheck size={20} />
              3. No Employment or Interview Guarantee
            </h2>
            <p>
              ResumeAI is an optimization tool, not an employment agency or recruiter. An ATS score of 80% or higher
              significantly enhances keyword match compatibility, but hiring decisions depend on human evaluation,
              market competition, company criteria, and interview performance.
            </p>
            <div className="legal-callout">
              <p>
                ResumeAI makes no representations, warranties, or guarantees that using this platform will result
                in job interviews, job offers, or employment placement.
              </p>
            </div>
          </section>

          <section className="legal-section">
            <h2>
              <ExternalLink size={20} />
              4. External Services & Job Postings
            </h2>
            <p>
              Users may paste external job postings from third-party websites (e.g., LinkedIn, Indeed, enterprise portals).
              ResumeAI is not affiliated with, sponsored by, or endorsed by third-party recruiters or job boards.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Contact Information</h2>
            <p>
              If you have any questions or require clarification regarding this disclaimer, please contact us at:
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:support@resumeai.com" style={{ textDecoration: "underline", color: "#000" }}>
                support@resumeai.com
              </a>
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Disclaimer;
