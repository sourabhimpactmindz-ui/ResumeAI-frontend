import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>ResumeAI</h2>
          <p>
            Create professional resumes and take
            the next step in your career journey.
          </p>
        </div>

        <div className="footer-links">
          <h3>Company</h3>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        <div className="footer-links">
          <h3>Resources</h3>
          <Link to="/blog">Blog</Link>
          <Link to="/templates">Resume Templates</Link>
        </div>

        <div className="footer-links">
          <h3>Legal</h3>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-and-conditions">
            Terms & Conditions
          </Link>
          <Link to="/disclaimer">Disclaimer</Link>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} ResumeAI.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;