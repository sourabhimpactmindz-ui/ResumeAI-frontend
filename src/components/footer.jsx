import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import "../styles/Footer.css";

const COLUMNS = [
  {
    heading: "Product and tools",
    links: [
      { to: "/dashboard", label: "ATS Resume Scanner", tag: "AI" },
      { to: "/dashboard", label: "Keyword Gap Detector" },
      { to: "/dashboard", label: "Bullet Metric Rewriter" },
      { to: "/dashboard", label: "Formatting Trap Check" },
      { to: "/", label: "Interactive Live Demo" },
    ],
  },
  {
    heading: "Career blog and guides",
    links: [
      { to: "/blog", label: "All Career Guides", tag: "New" },
      { to: "/blog", label: "How ATS Parses Resumes in 2026" },
      { to: "/blog", label: "Semantic Keyword Matching Tips" },
      { to: "/blog", label: "Transforming Bullet Points to Metrics" },
      { to: "/blog", label: "Why Two-Column Templates Fail" },
      { to: "/blog", label: "Fresher Resume Optimization Strategy" },
    ],
  },
  {
    heading: "Company and legal",
    links: [
      { to: "/about", label: "About ResumeAI" },
      { to: "/contact", label: "Contact Support" },
      { to: "/policy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms of Service" },
      { to: "/disclaimer", label: "Disclaimer and Compliance" },
    ],
  },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="site-footer">
      <div className="site-footer__container">
        <div className="site-footer__grid">
          {/* Brand */}
          <div className="site-footer__brand">
            <Link to="/" className="site-footer__logo">
              resumeAI<span className="site-footer__logo-dot" aria-hidden="true" />
            </Link>
            <p className="site-footer__desc">
              We help you see your resume the way a recruiter's software does, so you can
              fix what matters and get past the first 6 seconds.
            </p>
            {/* <div className="site-footer__status">
              <span className="site-footer__status-dot" />
              <span>All scanners are running</span>
            </div> */}
          </div>

          {COLUMNS.map((col) => (
            <div className="site-footer__col" key={col.heading}>
              <h4 className="site-footer__heading">{col.heading}</h4>
              <ul className="site-footer__list">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="site-footer__link">
                      {l.label}
                      {l.tag && <span className="site-footer__link-tag">{l.tag}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="site-footer__bottom">
          <div className="site-footer__copy">
            © {new Date().getFullYear()} ResumeAI. Made for people who are job hunting.
          </div>
          <div className="site-footer__note">
            Your resume is processed in memory and never sold or shared.
          </div>
          <button type="button" className="site-footer__top-btn" onClick={scrollToTop} aria-label="Back to top">
            <span>Top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}