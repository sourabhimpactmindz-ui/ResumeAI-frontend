import { Link } from "react-router-dom";
import { ArrowUp, Sparkles, ShieldCheck } from "lucide-react";
import "../styles/Footer.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer">
      <div className="site-footer__container">
        <div className="site-footer__grid">
          {/* Brand Column */}
          <div className="site-footer__brand">
            <div className="site-footer__logo-wrap">
              <Link to="/" className="site-footer__logo">
                resumeAI
              </Link>
              <span className="site-footer__badge">Pro</span>
            </div>
            <p className="site-footer__desc">
              Next-generation AI Applicant Tracking System analyzer. Reverse-engineer
              recruiter screening filters, optimize keyword match rates, and pass the 6-second review.
            </p>
            <div className="site-footer__status">
              <span className="site-footer__status-dot"></span>
              <span>All ATS Evaluation Engines Operational</span>
            </div>
          </div>

          {/* Product & Tools */}
          <div className="site-footer__col">
            <h4 className="site-footer__heading">Product & Tools</h4>
            <ul className="site-footer__list">
              <li>
                <Link to="/home" className="site-footer__link">
                  ATS Resume Scanner <span className="site-footer__link-tag">AI</span>
                </Link>
              </li>
              <li>
                <Link to="/home" className="site-footer__link">
                  Keyword Gap Detector
                </Link>
              </li>
              <li>
                <Link to="/home" className="site-footer__link">
                  Bullet Metric Rewriter
                </Link>
              </li>
              <li>
                <Link to="/home" className="site-footer__link">
                  Formatting Trap Check
                </Link>
              </li>
              <li>
                <Link to="/" className="site-footer__link">
                  Interactive Live Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Career Blog & Guides */}
          <div className="site-footer__col">
            <h4 className="site-footer__heading">Career Blog & Guides</h4>
            <ul className="site-footer__list">
              <li>
                <Link to="/blog" className="site-footer__link">
                  All Career Guides <span className="site-footer__link-tag">New</span>
                </Link>
              </li>
              <li>
                <Link to="/blog" className="site-footer__link">
                  How ATS Parses Resumes in 2026
                </Link>
              </li>
              <li>
                <Link to="/blog" className="site-footer__link">
                  Semantic Keyword Matching Tips
                </Link>
              </li>
              <li>
                <Link to="/blog" className="site-footer__link">
                  Transforming Bullet Points to Metrics
                </Link>
              </li>
              <li>
                <Link to="/blog" className="site-footer__link">
                  Why Two-Column Templates Fail
                </Link>
              </li>
              <li>
                <Link to="/blog" className="site-footer__link">
                  Fresher Resume Optimization Strategy
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="site-footer__col">
            <h4 className="site-footer__heading">Company & Legal</h4>
            <ul className="site-footer__list">
              <li>
                <Link to="/about" className="site-footer__link">
                  About ResumeAI
                </Link>
              </li>
              <li>
                <Link to="/contact" className="site-footer__link">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/policy" className="site-footer__link">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="site-footer__link">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="site-footer__link">
                  Disclaimer & Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="site-footer__bottom">
          <div className="site-footer__copy">
            © {new Date().getFullYear()} ResumeAI. Engineered for high-growth job seekers.
          </div>
          <div className="site-footer__note">
            100% Private: Resumes processed in-memory and never sold or shared.
          </div>
          <button
            type="button"
            className="site-footer__top-btn"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
