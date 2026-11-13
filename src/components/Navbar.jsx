import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "../styles/Navbar.css";

const LINKS = [
  { to: "/blog", label: "Blog", mobile: "Blog" },
  { to: "/about", label: "About", mobile: "About Us" },
  { to: "/contact", label: "Contact", mobile: "Contact" },
];

const MOBILE_EXTRA = [
  { to: "/policy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Service" },
  { to: "/disclaimer", label: "Disclaimer" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setMobileMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => setMobileMenuOpen(false);
  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          resumeAI<span className="navbar__dot" aria-hidden="true" />
        </Link>
      </div>

      {/* Desktop links */}
      <div className="navbar__links">
        <Link to="/" className={`navbar__link ${isActive("/")}`}>Home</Link>
        {isLoggedIn && (
          <Link to="/home" className={`navbar__link ${isActive("/home")}`}>Dashboard</Link>
        )}
        {LINKS.map((l) => (
          <Link key={l.to} to={l.to} className={`navbar__link ${isActive(l.to)}`}>{l.label}</Link>
        ))}
      </div>

      {/* Actions */}
      <div className="navbar__actions">
        {isLoggedIn ? (
          <button className="navbar__logout-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login" className="navbar__signin-btn">Sign In</Link>
            <Link to="/signup" className="navbar__signup-btn">Get Started</Link>
          </>
        )}

        <button
          className="navbar__mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={mobileMenuOpen}
          type="button"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="navbar__mobile-drawer">
          <Link to="/" className={`navbar__mobile-link ${isActive("/")}`} onClick={closeMenu}>Home</Link>
          {isLoggedIn && (
            <Link to="/dashboard" className={`navbar__mobile-link ${isActive("/dashboard")}`} onClick={closeMenu}>Dashboard</Link>
          )}
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} className={`navbar__mobile-link ${isActive(l.to)}`} onClick={closeMenu}>{l.mobile}</Link>
          ))}
          {MOBILE_EXTRA.map((l) => (
            <Link key={l.to} to={l.to} className={`navbar__mobile-link ${isActive(l.to)}`} onClick={closeMenu}>{l.label}</Link>
          ))}

          <div className="navbar__mobile-auth">
            {isLoggedIn ? (
              <button type="button" className="navbar__logout-btn navbar__block" onClick={handleLogout}>Logout</button>
            ) : (
              <div className="navbar__mobile-row">
                <Link to="/login" className="navbar__signin-btn navbar__block" onClick={closeMenu}>Sign In</Link>
                <Link to="/signup" className="navbar__signup-btn navbar__block" onClick={closeMenu}>Get Started</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}