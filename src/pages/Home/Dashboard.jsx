import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { toast } from "react-toastify";
import AnalysisPanel from "../../components/AnalysisPanel";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import UploadBox from "../../components/UploadBox";
import { useUplodeResumeMutation } from "../../Apis/resumeApi";
import "../../styles/Dashboard.css";

const STEPS = ["Upload your PDF resume", "Paste the job description", "Get your ATS score"];

const ATS_TIPS = [
  {
    q: "Why do so many resumes get rejected by ATS filters?",
    a: "Recruiter software reads plain text and looks for exact job titles, skills and tools. Two-column layouts, tables and missing keywords often give your resume a low match score before a person ever sees it.",
  },
  {
    q: "What is a good ATS score?",
    a: "80 or higher puts you ahead of most applicants for that role. A score between 60 and 79 usually passes the first filter, and adding the missing keywords can lift it further.",
  },
  {
    q: "How do I tailor my resume for each job?",
    a: "Run every job description through the scanner. Keep your experience the same, but use the same wording the job post uses for your skills.",
  },
];

export default function Dashboard() {
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

      setTimeout(() => {
        document
          .getElementById("analysis-results")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || error?.error || "Upload failed. Please try again.");

      if (error?.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      }
    }
  };

  return (
    <div className="dash-app">
      <Navbar />

      {/* HERO + UPLOAD */}
      <section className="dash-hero">
        <div className="dash-hero__badge">
          <Sparkles size={14} />
          <span>Free ATS check, ready in 30 seconds</span>
        </div>

        <h1 className="dash-hero__title">See your resume the way the ATS does.</h1>

        <p className="dash-hero__sub">
          Upload your resume, paste the job description, and we will show you the missing
          keywords, the format problems and how to fix them.
        </p>

        <div className="dash-workflow-steps">
          {STEPS.map((text, i) => (
            <div className="dash-workflow-step" key={text}>
              <span className="dash-workflow-step__num">{i + 1}</span>
              <span className="dash-workflow-step__text">{text}</span>
            </div>
          ))}
        </div>

        <UploadBox onAnalyze={handleAnalze} isLoading={isLoading} />
      </section>

      {/* RESULTS */}
      {analysis && (
        <section className="dash-results" id="analysis-results">
          <div className="dash-results__inner">
            <AnalysisPanel
              atsScore={analysis.atsScore}
              matchingSkills={analysis.matchingSkills || []}
              missingSkills={analysis.missingSkills || []}
              strengths={analysis.strength || []}
              aiSuggestions={analysis.suggestions || []}
            />
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="dash-faq-section">
        <div className="dash-precision-header">
          <h2 className="dash-section-title">ATS basics, in plain words</h2>
          <p className="dash-section-sub">A few answers that help you get past automated screening.</p>
        </div>

        <div className="dash-faq-container">
          {ATS_TIPS.map((item, i) => (
            <div key={item.q} className={`dash-faq-card ${openFaq === i ? "active" : ""}`}>
              <button
                type="button"
                className="dash-faq-card__header"
                aria-expanded={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
              >
                <span className="dash-faq-card__question">{item.q}</span>
                <span className="dash-faq-card__toggle">{openFaq === i ? "−" : "+"}</span>
              </button>
              <div className="dash-faq-card__body">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}