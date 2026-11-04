import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AnalysisPanel from "../../components/AnalysisPanel";
import FeatureCard from "../../components/FeatureCard";
import Navbar from "../../components/Navbar";
import StatCard from "../../components/StatCard";
import Footer from "../../components/footer";
import "../../styles/home.css";
import CTABanner from "../../components/CTABanner";
import { useUplodeResumeMutation } from "../../Apis/resumeApi";
import {
  Settings2,
  Target,
  BarChart3,
  ShieldCheck,
  Sparkles,
  FileSearch,
  CheckCircle,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import UploadBox from "../../components/UploadBox";
import { toast } from "react-toastify";

const STATS = [
  { value: "12,400+", label: "Total Analyses Run" },
  { value: "82%", label: "Average ATS Score Lift" },
  { value: "3.2x", label: "More Interview Callbacks" },
];

const FEATURES = [
  {
    icon: <Settings2 size={24} color="#000" />,
    title: "ATS Format & Parsing Check",
    desc: "Scans for layout traps, multi-column tables, and image headers that break recruiter parsers.",
  },
  {
    icon: <Target size={24} color="#000" />,
    title: "AI Keyword Gap Analysis",
    desc: "Extracts high-priority skills and qualifications from the job description missing from your resume.",
  },
  {
    icon: <BarChart3 size={24} color="#000" />,
    title: "Measurable Impact Scoring",
    desc: "Grades your bullet points on action verbs, quantifiable achievements, and business outcomes.",
  },
  {
    icon: <ShieldCheck size={24} color="#000" />,
    title: "Encrypted & 100% Private",
    desc: "Your resumes and job descriptions are encrypted and never used for public training.",
  },
];

const ATS_TIPS = [
  {
    q: "Why do 75% of resumes get rejected by ATS filters?",
    a: "Recruiter software parses raw text looking for exact title, hard skill, and tool matches. Complex two-column layouts, tables, and missing keywords often result in an automatic low match score before any human recruiter reviews your application.",
  },
  {
    q: "What is an acceptable ATS benchmark score?",
    a: "A score of 80 or higher places you in the top 10% of applicants for that role. Scores between 60-79 pass baseline filters but can be improved with missing keyword additions.",
  },
  {
    q: "How should I tailor my resume for different job postings?",
    a: "Run each job description through this scanner. Keep your foundational experience intact, but align your bullet points with the exact skill terminology used in the target role.",
  },
];

export default function Home() {
  const [analysis, setAnalysis] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);
  const [UplodeResume, { isLoading }] = useUplodeResumeMutation();
  const navigate = useNavigate();

  const handleAnalze = async (file, jobDescription) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast.error("Please login before analyzing your resume.");
      navigate("/login");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);

      const result = await UplodeResume(formData).unwrap();
      setAnalysis(result.data);
      toast.success("Analysis complete! Review your ATS score below.");

      // Smooth scroll to analysis results
      setTimeout(() => {
        const el = document.getElementById("analysis-results");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 200);
    } catch (error) {
      console.error(error);
      toast.error(
        error?.data?.message ||
          error?.error ||
          "Upload failed. Please try again."
      );

      if (error?.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      }
    }
  };

  return (
    <div className="app">
      <Navbar />

      {/* HERO & UPLOAD SECTION */}
      <section className="hero">
        <div className="hero__badge">
          <Sparkles size={14} />
          <span>AI-Powered ATS Diagnostic Suite</span>
        </div>

        <h1 className="hero__title">
          Beat the ATS. Land more recruiter interviews.
        </h1>

        <p className="hero__sub">
          Benchmark your resume against any target job description in 30 seconds.
          Detect missing keywords, eliminate format traps, and receive AI-backed bullet enhancements.
        </p>

        {/* 3-STEP QUICK PROCESS PILLS */}
        <div className="workflow-steps">
          <div className="workflow-step">
            <span className="workflow-step__num">1</span>
            <span className="workflow-step__text">Upload PDF Resume</span>
          </div>
          <span className="workflow-step__divider">→</span>
          <div className="workflow-step">
            <span className="workflow-step__num">2</span>
            <span className="workflow-step__text">Paste Job Description</span>
          </div>
          <span className="workflow-step__divider">→</span>
          <div className="workflow-step">
            <span className="workflow-step__num">3</span>
            <span className="workflow-step__text">Get Instant ATS Score</span>
          </div>
        </div>

        <UploadBox onAnalyze={handleAnalze} isLoading={isLoading} />
      </section>

      {/* AI ANALYSIS RESULTS */}
      {analysis && (
        <section className="section" id="analysis-results">
          <AnalysisPanel
            atsScore={analysis.atsScore}
            matchingSkills={analysis.matchingSkills || []}
            missingSkills={analysis.missingSkills || []}
            strengths={analysis.strength || []}
            aiSuggestions={analysis.suggestions || []}
          />
        </section>
      )}

      {/* STATS ROW */}
      <section className="stats-row">
        {STATS.map((s) => (
          <StatCard key={s.label} value={s.value} label={s.label} />
        ))}
      </section>

      {/* PRECISION FEATURES */}
      <section className="section precision-section">
        <div className="precision-header">
          <h2 className="section-title">Precision Analysis Engine</h2>
          <p className="section-sub">
            Built on algorithmic recruiter filters, keyword frequency density, and strict ATS parser models.
          </p>
        </div>

        <div className="features-grid">
          {FEATURES.map((f) => (
            <FeatureCard
              key={f.title}
              icon={f.icon}
              title={f.title}
              desc={f.desc}
            />
          ))}
        </div>
      </section>

      {/* ATS OPTIMIZATION TIPS & FAQ */}
      <section className="section ats-faq-section">
        <div className="precision-header">
          <h2 className="section-title">ATS Fundamentals & Best Practices</h2>
          <p className="section-sub">
            Common algorithmic challenges and how to optimize your resume for automated screening.
          </p>
        </div>

        <div className="ats-faq-container">
          {ATS_TIPS.map((item, index) => (
            <div
              key={item.q}
              className={`ats-faq-card ${openFaq === index ? "active" : ""}`}
              onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
            >
              <div className="ats-faq-card__header">
                <span className="ats-faq-card__question">{item.q}</span>
                <span className="ats-faq-card__toggle">
                  {openFaq === index ? "−" : "+"}
                </span>
              </div>
              {openFaq === index && (
                <div className="ats-faq-card__body">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="section" style={{ marginBottom: "60px" }}>
        <CTABanner
          title="Ready to fast-track your job search?"
          subtitle="Keep your resume tailored for every single application to consistently bypass initial applicant filters."
          onGetStarted={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
      </section>

      {/* COMPREHENSIVE RESPONSIVE FOOTER */}
      <Footer />
    </div>
  );
}
