import { useState } from "react";
import AnalysisPanel from "../../components/AnalysisPanel";
import Badge from "../../components/Badge";
import FeatureCard from "../../components/FeatureCard";
import Navbar from "../../components/Navbar";
import StatCard from "../../components/StatCard";
import UploadBox from "../../components/UploadBox";
import "../../styles/home.css";
import CTABanner from "../../components/CTABanner";
import { useUplodeResumeMutation } from "../../Apis/resumeApi";
import { Settings2, Target, BarChart3, ShieldCheck } from 'lucide-react';


const STATS = [
  { value: "12,400+", label: "Total Analyses" },
  { value: "78", label: "Avg ATS Score" },
  { value: "92%", label: "Success Rate" },
];

const FEATURES = [
  {
    icon: <Settings2 size={28} color="#2563eb" />,
    title: "ATS Optimization",
    desc: "Ensure your resume passes Applicant Tracking Systems used by top recruiters and enterprises.",
  },
  {
    icon: <Target size={28} color="#7c3aed" />,
    title: "AI Skill Matching",
    desc: "Our LLM identifies skill gaps between your resume and job listings in real time.",
  },
  {
    icon: <BarChart3 size={28} color="#16a34a" />,
    title: "Impact Scoring",
    desc: "We grade your bullet points for action, quantification, and clarity of outcome.",
  },
  {
    icon: <ShieldCheck size={28} color="#f59e0b" />,
    title: "Privacy First",
    desc: "Your documents are encrypted and never used to train any models without consent.",
  },
];

export default function Home() {
  const [analysis, setAnalysis] = useState(null);

  const [UplodeResume, { isLoading }] = useUplodeResumeMutation();

  const handleAnalze = async (file, jobDescription) => {
    try {
      const formData = new FormData();

      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);

      const result = await UplodeResume(formData).unwrap();


      setAnalysis(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app">
      <Navbar />

      <section className="hero">
        <Badge label="✦ ResumeAI — Build Future" variant="pill" />

        <h1 className="hero__title">
          Analyze Your Resume with AI
        </h1>

        <p className="hero__sub">
          Get ATS Score, Skill-Gap Analysis, and Personalised Resume
          Suggestions in Seconds.
        </p>

        <UploadBox onAnalyze={handleAnalze} isLoading = {isLoading} />

       
      </section>

       <section className="section">
        {analysis && (
          <AnalysisPanel
            atsScore={analysis.atsScore}
            matchingSkills={analysis.matchingSkills || []}
            missingSkills={analysis.missingSkills || []}
            strengths={analysis.strength || []}
            aiSuggestions={analysis.suggestions || []}
          />
        )}
      </section>

      <section className="stats-row">
        {STATS.map((s) => (
          <StatCard
            key={s.label}
            value={s.value}
            label={s.label}
          />
        ))}
      </section>

     

      <section className="section precision-section">
        <div className="precision-header">
          <h2 className="section-title">
            Precision Analysis Engine
          </h2>

          <p className="section-sub">
            Built on millions of job descriptions and resume
            benchmarks.
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

      <section className="section">
        <CTABanner />
      </section>

      <footer className="footer">
        <span className="footer__brand">
          ResumeAI
        </span>

        <div className="footer__links">
          {[
            "Privacy Policy",
            "Contact",
            "Terms of Service",
            "All Items",
          ].map((l) => (
            <a
              key={l}
              href="#"
              className="footer__link"
            >
              {l}
            </a>
          ))}
        </div>

        <span className="footer__copy">
          © 2025 ResumeAI. Made globally for
          Career-driven humans.
        </span>
      </footer>
    </div>
  );
}