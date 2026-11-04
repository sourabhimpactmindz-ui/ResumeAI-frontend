import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "../styles/Navbar.css";

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

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          resumeAI
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <div className="navbar__links">
        <Link
          to="/"
          className={`navbar__link ${location.pathname === "/" ? "active" : ""}`}
        >
          Home
        </Link>

        {/* Dashboard link only when user is logged in */}
        {isLoggedIn && (
          <Link
            to="/home"
            className={`navbar__link ${location.pathname === "/home" ? "active" : ""}`}
          >
            Dashboard
          </Link>
        )}

        <Link
          to="/blog"
          className={`navbar__link ${location.pathname === "/blog" ? "active" : ""}`}
        >
          Blog
        </Link>
        <Link
          to="/about"
          className={`navbar__link ${location.pathname === "/about" ? "active" : ""}`}
        >
          About
        </Link>
        <Link
          to="/contact"
          className={`navbar__link ${location.pathname === "/contact" ? "active" : ""}`}
        >
          Contact
        </Link>
      </div>

      {/* Desktop & Mobile Actions */}
      <div className="navbar__actions">
        {isLoggedIn ? (
          <button className="navbar__logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="navbar__signin-btn">
              Sign In
            </Link>
            <Link
              to="/signup"
              className="navbar__signup-btn"
              style={{ color: "#ffffff", backgroundColor: "#000000" }}
            >
              Get Started
            </Link>
          </>
        )}

        <button
          className="navbar__mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
          type="button"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="navbar__mobile-drawer">
          <Link
            to="/"
            className={`navbar__mobile-link ${location.pathname === "/" ? "active" : ""}`}
            onClick={closeMenu}
          >
            Home
          </Link>

          {/* Mobile Dashboard link only when logged in */}
          {isLoggedIn && (
            <Link
              to="/home"
              className={`navbar__mobile-link ${location.pathname === "/home" ? "active" : ""}`}
              onClick={closeMenu}
            >
              Dashboard
            </Link>
          )}

          <Link
            to="/blog"
            className={`navbar__mobile-link ${location.pathname === "/blog" ? "active" : ""}`}
            onClick={closeMenu}
          >
            Blog
          </Link>
          <Link
            to="/about"
            className={`navbar__mobile-link ${location.pathname === "/about" ? "active" : ""}`}
            onClick={closeMenu}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className={`navbar__mobile-link ${location.pathname === "/contact" ? "active" : ""}`}
            onClick={closeMenu}
          >
            Contact
          </Link>
          <Link
            to="/policy"
            className={`navbar__mobile-link ${location.pathname === "/policy" ? "active" : ""}`}
            onClick={closeMenu}
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className={`navbar__mobile-link ${location.pathname === "/terms" ? "active" : ""}`}
            onClick={closeMenu}
          >
            Terms of Service
          </Link>
          <Link
            to="/disclaimer"
            className={`navbar__mobile-link ${location.pathname === "/disclaimer" ? "active" : ""}`}
            onClick={closeMenu}
          >
            Disclaimer
          </Link>

          <div className="navbar__mobile-auth">
            {isLoggedIn ? (
              <button
                type="button"
                className="navbar__logout-btn"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                <Link
                  to="/login"
                  className="navbar__signin-btn"
                  style={{ flex: 1, textAlign: "center", display: "inline-block" }}
                  onClick={closeMenu}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="navbar__signup-btn"
                  style={{
                    flex: 1,
                    textAlign: "center",
                    display: "inline-block",
                    color: "#ffffff",
                    backgroundColor: "#000000",
                  }}
                  onClick={closeMenu}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
