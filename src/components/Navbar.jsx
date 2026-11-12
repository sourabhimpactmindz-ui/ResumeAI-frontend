import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sparkles,
  ChevronDown,
  Menu,
  X,
  Target,
  FileEdit,
  LayoutTemplate,
  PlayCircle,
  LogOut,
  User,
} from "lucide-react";
import { Button } from "./Button";
import { Badge } from "./Badge";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const lastScrollY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();

  // Check auth token
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setUserToken(token);
  }, [location.pathname]);

  // Scroll listener: glass after 80px, hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 5) {
          // Scrolling down
          setVisible(false);
          setToolsOpen(false);
        } else if (lastScrollY.current - currentScrollY > 5) {
          // Scrolling up
          setVisible(true);
        }
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setToolsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUserToken(null);
    navigate("/");
  };

  const toolItems = [
    {
      name: "ATS Resume Scanner",
      desc: "Instant score, layout traps & category breakdown",
      path: "/scanner",
      icon: <Sparkles size={16} className="text-c-100" />,
    },
    {
      name: "Keyword Gap Detector",
      desc: "Find missing keywords from any job description",
      path: "/tools/keyword-gap",
      icon: <Target size={16} className="text-c-100" />,
    },
    {
      name: "Bullet Metric Rewriter",
      desc: "Transform passive tasks into quantified impact",
      path: "/tools/bullet-rewriter",
      icon: <FileEdit size={16} className="text-c-100" />,
    },
    {
      name: "Formatting Trap Check",
      desc: "Scan two-column layouts, tables, and image headers",
      path: "/tools/format-check",
      icon: <LayoutTemplate size={16} className="text-c-100" />,
    },
    {
      name: "Interactive Live Demo",
      desc: "Pre-filled sample scan without sign up",
      path: "/tools/live-demo",
      icon: <PlayCircle size={16} className="text-c-100" />,
    },
  ];

  return (
    <>
      <header
        className={`fixed top-4 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-400 ease-out ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0"
        }`}
      >
        <nav
          className={`w-full max-w-5xl flex items-center justify-between px-5 md:px-7 py-3 rounded-full transition-all duration-400 ${
            scrolled
              ? "bg-c-800/85 backdrop-blur-2xl border border-c-700/60 shadow-[0_16px_36px_-10px_rgba(6,20,27,0.8),0_0_24px_rgba(155,168,171,0.12)]"
              : "bg-c-800/40 backdrop-blur-md border border-c-700/30 shadow-none"
          }`}
        >
          {/* Logo with Weightless Badge */}
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-c-700 to-c-600 border border-c-300/40 flex items-center justify-center text-c-100 shadow-[0_0_12px_rgba(204,208,207,0.25)] group-hover:scale-105 transition-transform">
              <Sparkles size={16} />
            </span>
            <span className="font-heading font-extrabold text-xl tracking-tight text-c-100 group-hover:text-white transition-colors">
              Resume<span className="text-c-300 font-medium">AI</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-heading font-medium">
            <Link
              to="/"
              className={`transition-colors hover:text-c-100 ${
                location.pathname === "/" ? "text-c-100" : "text-c-300"
              }`}
            >
              Home
            </Link>

            {/* Tools Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setToolsOpen(!toolsOpen)}
                className={`flex items-center gap-1.5 transition-colors hover:text-c-100 cursor-pointer ${
                  toolsOpen || location.pathname.startsWith("/tools")
                    ? "text-c-100"
                    : "text-c-300"
                }`}
              >
                <span>Tools</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${
                    toolsOpen ? "rotate-180 text-c-100" : ""
                  }`}
                />
              </button>

              {toolsOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 p-2.5 rounded-3xl bg-c-800/95 backdrop-blur-2xl border border-c-700 shadow-[0_24px_50px_-10px_rgba(0,0,0,0.6),0_0_30px_rgba(155,168,171,0.15)] flex flex-col gap-1 z-50 animate-in fade-in zoom-in-95 duration-200"
                  onMouseLeave={() => setToolsOpen(false)}
                >
                  {toolItems.map((tool) => (
                    <Link
                      key={tool.path}
                      to={tool.path}
                      className="flex items-start gap-3 p-3 rounded-2xl hover:bg-c-700/50 transition-colors group"
                      onClick={() => setToolsOpen(false)}
                    >
                      <span className="w-8 h-8 rounded-xl bg-c-900 border border-c-700 flex items-center justify-center shrink-0 group-hover:border-c-300 transition-colors">
                        {tool.icon}
                      </span>
                      <div>
                        <p className="font-heading font-bold text-xs text-c-100 group-hover:text-white">
                          {tool.name}
                        </p>
                        <p className="text-[11px] text-c-600 line-clamp-1">
                          {tool.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/blog"
              className={`transition-colors hover:text-c-100 ${
                location.pathname.startsWith("/blog")
                  ? "text-c-100"
                  : "text-c-300"
              }`}
            >
              Blog
            </Link>

            <Link
              to="/about"
              className={`transition-colors hover:text-c-100 ${
                location.pathname === "/about" ? "text-c-100" : "text-c-300"
              }`}
            >
              About
            </Link>

            <Link
              to="/contact"
              className={`transition-colors hover:text-c-100 ${
                location.pathname === "/contact" ? "text-c-100" : "text-c-300"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {userToken ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-heading font-semibold text-c-100 border border-c-600/60 hover:border-c-300 hover:bg-c-700/40 transition-all"
                >
                  <User size={14} />
                  <span>Dashboard</span>
                </Link>

                <Button to="/scanner" variant="primary" size="sm">
                  Scan Resume
                </Button>

                <button
                  type="button"
                  onClick={handleLogout}
                  title="Log out"
                  className="w-8 h-8 rounded-full border border-c-700 hover:border-c-error/40 hover:text-c-error flex items-center justify-center text-c-300 transition-colors"
                >
                  <LogOut size={14} />
                </button>
              </>
            ) : (
              <>
                <Button to="/login" variant="ghost" size="sm">
                  Sign In
                </Button>
                <Button to="/scanner" variant="primary" size="sm">
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <Button to="/scanner" variant="primary" size="sm">
              Scan
            </Button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full border border-c-700 text-c-100 bg-c-800/80 hover:bg-c-700/80 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Full-Screen Floating Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-c-900/95 backdrop-blur-3xl p-6 pt-28 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-300 md:hidden">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-heading font-semibold uppercase tracking-widest text-c-600">
                Navigation
              </span>
              <Link
                to="/"
                className="text-2xl font-heading font-bold text-c-100 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/scanner"
                className="text-2xl font-heading font-bold text-c-100 hover:text-white flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>ATS Resume Scanner</span>
                <span className="text-xs bg-c-100 text-c-900 px-2 py-0.5 rounded-full font-bold">
                  Core
                </span>
              </Link>
              <Link
                to="/blog"
                className="text-2xl font-heading font-bold text-c-100 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Career Guides & Blog
              </Link>
              <Link
                to="/about"
                className="text-2xl font-heading font-bold text-c-100 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Our Mission
              </Link>
              <Link
                to="/contact"
                className="text-2xl font-heading font-bold text-c-100 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Humans
              </Link>
            </div>

            <div className="border-t border-c-700/60 pt-4 flex flex-col gap-2">
              <span className="text-xs font-heading font-semibold uppercase tracking-widest text-c-600 mb-1">
                Diagnostic Tools
              </span>
              {toolItems.slice(1).map((t) => (
                <Link
                  key={t.path}
                  to={t.path}
                  className="text-sm font-heading font-medium text-c-300 hover:text-c-100 flex items-center gap-2 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.icon}
                  <span>{t.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-c-700/60 pt-6 flex flex-col gap-3">
            {userToken ? (
              <>
                <Button
                  to="/dashboard"
                  variant="secondary"
                  size="md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Go to Dashboard
                </Button>
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  to="/login"
                  variant="secondary"
                  size="md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Button>
                <Button
                  to="/scanner"
                  variant="primary"
                  size="md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Check My Resume Free
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
