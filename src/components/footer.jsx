import { Link } from "react-router-dom";
import { Sparkles, ArrowUp, ShieldCheck, Heart } from "lucide-react";
import { Button } from "./Button";
import { Badge } from "./Badge";
import StaggerFromEdges from "./animations/StaggerFromEdges";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const productLinks = [
    { name: "ATS Resume Scanner", path: "/scanner", tag: "AI" },
    { name: "Keyword Gap Detector", path: "/tools/keyword-gap" },
    { name: "Bullet Metric Rewriter", path: "/tools/bullet-rewriter" },
    { name: "Formatting Trap Check", path: "/tools/format-check" },
    { name: "Interactive Live Demo", path: "/tools/live-demo", tag: "Try" },
  ];

  const blogLinks = [
    { name: "All Career Guides", path: "/blog", tag: "New" },
    { name: "How ATS Parses Resumes in 2026", path: "/blog/how-ats-parses-resumes-2026" },
    { name: "Semantic Keyword Matching Tips", path: "/blog/semantic-keyword-matching-tips" },
    { name: "Transforming Bullet Points to Metrics", path: "/blog/transforming-bullet-points-to-metrics" },
    { name: "Why Two-Column Templates Fail", path: "/blog/why-two-column-templates-fail" },
    { name: "Fresher Resume Optimization Strategy", path: "/blog/fresher-resume-optimization-strategy" },
  ];

  const legalLinks = [
    { name: "About ResumeAI", path: "/about" },
    { name: "Contact Support", path: "/contact" },
    { name: "Privacy Policy", path: "/policy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Disclaimer & Compliance", path: "/disclaimer" },
  ];

  return (
    <footer className="relative w-full border-t border-c-700/50 bg-c-900 pt-16 pb-12 overflow-hidden z-10">
      {/* Background weightless ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-c-700/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Big Levitating CTA Band */}
        <div className="relative mb-20 p-8 md:p-14 rounded-[36px] bg-gradient-to-b from-c-800/90 to-c-800/50 border border-c-700/70 backdrop-blur-2xl shadow-[0_24px_50px_-12px_rgba(155,168,171,0.15)] flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="max-w-xl">
            <span className="font-accent text-2xl text-c-300 block -rotate-1 mb-1">
              Takes just 12 seconds · Free
            </span>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-c-100 tracking-tight leading-tight">
              Ready to beat the robot?
            </h2>
            <p className="mt-2 text-c-300 font-sans text-sm md:text-base leading-relaxed">
              Upload your resume now. See your real ATS benchmark score before any hiring manager does.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 shrink-0">
            <Button to="/scanner" variant="primary" size="lg">
              Check my resume — free
            </Button>
            <Button to="/tools/live-demo" variant="secondary" size="lg">
              See how it works
            </Button>
          </div>
        </div>

        {/* 3 Link Columns with StaggerFromEdges */}
        <StaggerFromEdges
          itemSelector=".footer-col"
          staggerTime={0.12}
          className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-c-700/50"
        >
          {/* Brand Info Column */}
          <div className="footer-col flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-c-700 to-c-600 border border-c-300/40 flex items-center justify-center text-c-100 shadow-[0_0_12px_rgba(204,208,207,0.2)]">
                <Sparkles size={16} />
              </span>
              <span className="font-heading font-extrabold text-xl tracking-tight text-c-100">
                Resume<span className="text-c-300 font-medium">AI</span>
              </span>
            </Link>

            <p className="text-xs text-c-300 leading-relaxed max-w-xs font-sans">
              Weightless, humanized ATS resume intelligence engineered to bridge the gap between candidate qualifications and algorithmic parsers.
            </p>

            {/* Operational Status Badge */}
            <div className="pt-2">
              <Badge variant="status" pulsing={true}>
                ATS engine operational
              </Badge>
            </div>
          </div>

          {/* Product & Tools Column */}
          <div className="footer-col flex flex-col gap-3">
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-c-100">
              Product & Tools
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm font-sans">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-c-300 hover:text-c-100 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span>{link.name}</span>
                    {link.tag && (
                      <span className="text-[10px] font-heading font-bold px-1.5 py-0.5 rounded-full bg-c-700 text-c-100 border border-c-600/50 group-hover:border-c-300">
                        {link.tag}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Career Blog & Guides Column */}
          <div className="footer-col flex flex-col gap-3">
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-c-100">
              Career Blog & Guides
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm font-sans">
              {blogLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-c-300 hover:text-c-100 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="line-clamp-1">{link.name}</span>
                    {link.tag && (
                      <span className="text-[10px] font-heading font-bold px-1.5 py-0.5 rounded-full bg-c-success/20 text-c-success border border-c-success/40">
                        {link.tag}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal Column */}
          <div className="footer-col flex flex-col gap-3">
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-c-100">
              Company & Legal
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm font-sans">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-c-300 hover:text-c-100 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </StaggerFromEdges>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-c-600">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>© 2026 ResumeAI Inc.</span>
            <span className="hidden sm:inline">·</span>
            <span className="text-c-300 flex items-center gap-1">
              Made with <Heart size={12} className="text-c-error fill-c-error/40" /> by humans who've been rejected too.
            </span>
          </div>

          <div className="flex items-center gap-4 text-c-300">
            <span className="flex items-center gap-1.5 text-c-600">
              <ShieldCheck size={14} className="text-c-success" />
              <span>Resumes processed in memory & never sold or shared.</span>
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-full border border-c-700 bg-c-800/80 hover:bg-c-700 text-c-100 transition-all flex items-center gap-1 cursor-pointer"
              title="Return to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
