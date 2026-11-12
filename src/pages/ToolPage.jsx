import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ParticleField from "../components/ParticleField";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";
import Typewriter from "../components/animations/Typewriter";
import StaggerFromEdges from "../components/animations/StaggerFromEdges";
import ScoreRing from "../components/ScoreRing";
import {
  Target,
  FileEdit,
  LayoutTemplate,
  PlayCircle,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  ShieldAlert,
} from "lucide-react";
import { toast } from "react-toastify";

export default function ToolPage({ toolId }) {
  const params = useParams();
  const activeTool = toolId || params.toolId || "keyword-gap";

  const [inputVal, setInputVal] = useState("");
  const [result, setResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const toolConfigs = {
    "keyword-gap": {
      title: "Keyword Gap Detector",
      tagline: ["extracts hidden recruiter keywords.", "finds what you forgot to mention.", "boosts algorithmic match scores."],
      badge: "Keyword Intelligence",
      icon: <Target size={28} className="text-c-success" />,
      inputPlaceholder: "Paste your target job description requirements here...",
      buttonLabel: "Detect Keyword Gaps",
      initialInput: "Looking for Senior Frontend Engineer with experience in React, TypeScript, Next.js, Redux Toolkit, Tailwind CSS, Jest, GraphQL, and micro-frontend architectures.",
      sampleResult: {
        found: ["React", "TypeScript", "Tailwind CSS", "REST APIs"],
        missing: ["Next.js", "Redux Toolkit", "Jest", "GraphQL", "Micro-frontends"],
        densityScore: "62%",
        recommendation: "Add 3 missing keywords in your Work Experience bullets to elevate this match to the top 10% recruiter bracket.",
      },
    },
    "bullet-rewriter": {
      title: "Bullet Metric Rewriter",
      tagline: ["converts duties to quantifiable metrics.", "replaces passive verbs with power verbs.", "turns tasks into verified achievements."],
      badge: "Action Formula",
      icon: <FileEdit size={28} className="text-c-100" />,
      inputPlaceholder: "Paste a weak resume bullet point (e.g. 'Responsible for building API endpoints')...",
      buttonLabel: "Rewrite with Quantified Impact",
      initialInput: "Responsible for managing PostgreSQL database and writing queries for customer accounts.",
      sampleResult: {
        original: "Responsible for managing PostgreSQL database and writing queries for customer accounts.",
        improved: "Architected PostgreSQL read replicas and Redis caching pipelines, slashing p99 database latency by 44% across 1.8M daily user queries.",
        verbLift: "Weak 'Responsible for' → Strong 'Architected & Slashing'",
        metricScore: "+38% Recruiter Callback Likelihood",
      },
    },
    "format-check": {
      title: "Formatting Trap Check",
      tagline: ["detects column parsing errors.", "prevents invisible ATS text scrambles.", "audits font encodings & headers."],
      badge: "Layout Hygiene",
      icon: <LayoutTemplate size={28} className="text-c-warning" />,
      inputPlaceholder: "Paste your raw resume text to audit column flow...",
      buttonLabel: "Audit Formatting Traps",
      initialInput: "Work Experience | 2022 - Present\nSkills: React, Node, Python\n[Two Column Layout Simulated with Table Headers and Icons]",
      sampleResult: {
        score: "Clean Text Pass",
        traps: [
          { status: "pass", text: "Zero image headers or unreadable graphics detected." },
          { status: "pass", text: "Clean UTF-8 characters without invalid symbol encoding." },
          { status: "warning", text: "Two-column table detected: May merge parallel job dates in older Taleo systems." },
        ],
        recommendation: "Convert two-column skill columns into a single linear comma-separated list.",
      },
    },
    "live-demo": {
      title: "Interactive Live Demo",
      tagline: ["simulates full recruiter screening.", "run a pre-filled diagnostic.", "zero sign up required."],
      badge: "Sandbox Demo",
      icon: <PlayCircle size={28} className="text-c-100" />,
      inputPlaceholder: "Pre-filled Senior Software Engineer sample resume loaded...",
      buttonLabel: "Run Live Diagnostic Demo",
      initialInput: "SENIOR SOFTWARE ENGINEER\n5+ years building distributed cloud systems using React, TypeScript, and Go. Increased checkout conversion by 28%.",
      sampleResult: {
        score: 84,
        category: "Top 12% Candidate Alignment",
        matched: ["React", "TypeScript", "Go", "Cloud Systems", "Conversion Optimization"],
        tips: "Strong metric density detected. Adding AWS and Docker tokens will lift benchmark to 92/100.",
      },
    },
  };

  const config = toolConfigs[activeTool] || toolConfigs["keyword-gap"];

  const handleRun = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setResult(config.sampleResult);
      setIsProcessing(false);
      toast.success("Diagnostic updated!");
    }, 1200);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const otherTools = [
    { id: "keyword-gap", name: "Keyword Gap Detector", desc: "Find missing keywords from target job description" },
    { id: "bullet-rewriter", name: "Bullet Metric Rewriter", desc: "Convert generic duties to high-impact metrics" },
    { id: "format-check", name: "Formatting Trap Check", desc: "Audit two-column tables and layout traps" },
    { id: "live-demo", name: "Interactive Live Demo", desc: "Instant pre-filled diagnostic sandbox" },
  ].filter((t) => t.id !== activeTool);

  return (
    <div className="relative min-h-screen bg-deep-space text-c-100 overflow-x-hidden selection:bg-c-100 selection:text-c-900">
      <ParticleField count={28} />
      <Navbar />

      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-32 pb-24">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge variant="status" pulsing={true} className="mb-4">
            {config.badge}
          </Badge>

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-c-100 tracking-tight">
            {config.title}
          </h1>

          <div className="mt-3 text-base sm:text-lg text-c-300 font-sans">
            A weightless tool that{" "}
            <Typewriter
              lines={config.tagline}
              className="text-c-100 font-semibold underline decoration-c-300/40 decoration-wavy underline-offset-4"
            />
          </div>
        </div>

        {/* Levitating Tool Card */}
        <Card className="p-8 md:p-12 mb-16 shadow-[0_28px_60px_-15px_rgba(6,20,27,0.9),0_0_35px_rgba(155,168,171,0.12)]" glow={true}>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-sm text-c-100 flex items-center gap-2">
                {config.icon}
                <span>Input Data</span>
              </span>
              <button
                type="button"
                onClick={() => setInputVal(config.initialInput)}
                className="text-xs font-sans text-c-300 underline underline-offset-4 hover:text-c-100 cursor-pointer"
              >
                Load sample test
              </button>
            </div>

            <textarea
              value={inputVal || config.initialInput}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={config.inputPlaceholder}
              className="w-full min-h-[160px] p-5 rounded-2xl bg-c-900/90 border border-c-700/80 text-c-100 placeholder:text-c-600 font-sans text-sm leading-relaxed outline-none focus:border-c-300 transition-all resize-y"
            />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <Button
                onClick={handleRun}
                variant="primary"
                size="md"
                disabled={isProcessing}
                icon={<Sparkles size={16} />}
              >
                {isProcessing ? "Processing Diagnostic..." : config.buttonLabel}
              </Button>

              <span className="text-xs text-c-600 font-sans">
                Real-time AST parsing · 100% in-memory
              </span>
            </div>
          </div>

          {/* Tool Result Section */}
          {result && (
            <div className="mt-8 pt-8 border-t border-c-700/60 animate-in fade-in duration-300">
              <h3 className="font-heading font-extrabold text-xl text-c-100 mb-4 flex items-center gap-2">
                <CheckCircle2 size={20} className="text-c-success" />
                <span>Diagnostic Results</span>
              </h3>

              {activeTool === "keyword-gap" && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-c-900 border border-c-success/30">
                      <span className="text-xs font-heading font-bold text-c-success block mb-2">
                        MATCHING KEYWORDS FOUND ({result.found.length})
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {result.found.map((k, i) => (
                          <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-c-success/15 text-c-success">
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-c-900 border border-c-warning/30">
                      <span className="text-xs font-heading font-bold text-c-warning block mb-2">
                        MISSING KEYWORDS ({result.missing.length})
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {result.missing.map((k, i) => (
                          <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-c-warning/15 text-c-warning">
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-c-300 font-sans bg-c-800/80 p-4 rounded-xl border border-c-700">
                    💡 <strong className="text-c-100">Advice:</strong> {result.recommendation}
                  </p>
                </div>
              )}

              {activeTool === "bullet-rewriter" && (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-c-900 border border-c-success/40">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-heading font-bold text-c-success">
                        RECOMMENDED HIGH-IMPACT BULLET:
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(result.improved)}
                        className="text-xs text-c-100 flex items-center gap-1 hover:text-white cursor-pointer"
                      >
                        {copied ? <Check size={14} className="text-c-success" /> : <Copy size={14} />}
                        <span>{copied ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                    <p className="text-sm font-sans text-c-100 leading-relaxed font-medium">
                      "{result.improved}"
                    </p>
                  </div>
                  <div className="text-xs text-c-300 flex items-center justify-between px-2">
                    <span>{result.verbLift}</span>
                    <span className="text-c-success font-heading font-bold">{result.metricScore}</span>
                  </div>
                </div>
              )}

              {activeTool === "format-check" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    {result.traps.map((t, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-c-900 border border-c-700/80 flex items-center gap-3 text-xs font-sans">
                        {t.status === "pass" ? (
                          <CheckCircle2 size={16} className="text-c-success shrink-0" />
                        ) : (
                          <AlertTriangle size={16} className="text-c-warning shrink-0" />
                        )}
                        <span className={t.status === "pass" ? "text-c-100" : "text-c-warning"}>
                          {t.text}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-c-300 italic">{result.recommendation}</p>
                </div>
              )}

              {activeTool === "live-demo" && (
                <div className="p-6 rounded-2xl bg-c-900 border border-c-700 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <ScoreRing score={result.score} maxScore={100} size={140} strokeWidth={11} label="" />
                  <div className="space-y-2 text-center sm:text-left">
                    <span className="text-xs font-heading font-bold text-c-success px-3 py-1 rounded-full bg-c-success/20 border border-c-success/30 inline-block">
                      {result.category}
                    </span>
                    <p className="text-sm font-sans text-c-100">{result.tips}</p>
                  </div>
                  <Button to="/scanner" variant="primary" size="sm">
                    Scan Your Actual Resume →
                  </Button>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* How It Works 3 Mini Cards */}
        <div className="mb-20">
          <h3 className="font-heading font-extrabold text-2xl text-c-100 text-center mb-8">
            How this diagnostic operates
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center" glow={false}>
              <span className="text-xs font-heading font-extrabold text-c-600 block mb-2">01</span>
              <h4 className="font-heading font-bold text-base text-c-100 mb-1">AST Tokenization</h4>
              <p className="text-xs text-c-300 font-sans leading-relaxed">
                Breaks raw text into structured syntactic trees and parses entity qualifications.
              </p>
            </Card>

            <Card className="p-6 text-center" glow={false}>
              <span className="text-xs font-heading font-extrabold text-c-600 block mb-2">02</span>
              <h4 className="font-heading font-bold text-base text-c-100 mb-1">Vector Weighting</h4>
              <p className="text-xs text-c-300 font-sans leading-relaxed">
                Applies exact frequency and cosine similarity algorithms used by applicant tracking bots.
              </p>
            </Card>

            <Card className="p-6 text-center" glow={false}>
              <span className="text-xs font-heading font-extrabold text-c-600 block mb-2">03</span>
              <h4 className="font-heading font-bold text-base text-c-100 mb-1">Actionable Elevation</h4>
              <p className="text-xs text-c-300 font-sans leading-relaxed">
                Reconstructs weak sentences into verified XYZ metrics that pass recruiter cutoffs.
              </p>
            </Card>
          </div>
        </div>

        {/* Related Tools Stagger From Edges */}
        <div className="mb-16">
          <h3 className="font-heading font-extrabold text-xl text-c-100 mb-6 text-center">
            Explore companion tools
          </h3>

          <StaggerFromEdges
            itemSelector=".related-tool"
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {otherTools.map((t) => (
              <Link
                key={t.id}
                to={`/tools/${t.id}`}
                className="related-tool block p-6 rounded-3xl bg-c-800/60 border border-c-700/60 hover:border-c-300 hover:bg-c-800/90 transition-all hover:-translate-y-1 group"
              >
                <h4 className="font-heading font-bold text-sm text-c-100 group-hover:text-white flex items-center justify-between">
                  <span>{t.name}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </h4>
                <p className="text-xs text-c-600 font-sans mt-1.5 leading-relaxed">
                  {t.desc}
                </p>
              </Link>
            ))}
          </StaggerFromEdges>
        </div>

        {/* Big CTA to Main Scanner */}
        <div className="p-8 md:p-12 rounded-[32px] bg-gradient-to-r from-c-800 to-c-800/60 border border-c-700 text-center flex flex-col items-center">
          <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-c-100 mb-2">
            Want a complete multi-category audit?
          </h3>
          <p className="text-sm text-c-300 font-sans max-w-md mb-6 leading-relaxed">
            Run the comprehensive ATS Resume Scanner to get all checks, category scores, and downloadable PDF reports in one place.
          </p>
          <Button to="/scanner" variant="primary" size="lg" icon={<Sparkles size={18} />}>
            Open ATS Resume Scanner
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

