import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import AnalysisPanel from "../../components/AnalysisPanel";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import UploadBox from "../../components/UploadBox";
import { useUplodeResumeMutation } from "../../Apis/resumeApi";
import { Settings2, Target, BarChart3, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "react-toastify";
import "../../styles/home.css";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "12,400+", label: "Resumes analysed" },
  { value: "82%", label: "Average ATS score lift" },
  { value: "3.2x", label: "More interview callbacks" },
];

const STEPS = [
  { icon: "📄", title: "Upload your resume", desc: "Drop in a PDF. We read it exactly the way an ATS does." },
  { icon: "🎯", title: "Paste the job description", desc: "Our AI pulls the key skills and matches them against your resume." },
  { icon: "✨", title: "Get your score and fixes", desc: "Every issue comes with a clear fix you can apply right away." },
];

const FEATURES = [
  { icon: <Settings2 size={26} />, title: "ATS format check", desc: "Catches multi-column tables and image headers that break recruiter parsers." },
  { icon: <Target size={26} />, title: "Keyword gap analysis", desc: "Shows the skills in the job post that your resume is missing." },
  { icon: <BarChart3 size={26} />, title: "Impact scoring", desc: "Grades bullets on action verbs, numbers and business outcomes." },
  { icon: <ShieldCheck size={26} />, title: "Private by default", desc: "Your resume is encrypted and never used for public training." },
];

const ATS_TIPS = [
  { q: "Why do 75% of resumes get rejected by ATS filters?", a: "Recruiter software parses raw text looking for exact title, hard skill, and tool matches. Complex two-column layouts, tables, and missing keywords often result in an automatic low match score before any human recruiter reviews your application." },
  { q: "What is an acceptable ATS benchmark score?", a: "A score of 80 or higher places you in the top 10% of applicants for that role. Scores between 60-79 pass baseline filters but can be improved with missing keyword additions." },
  { q: "How should I tailor my resume for different job postings?", a: "Run each job description through this scanner. Keep your foundational experience intact, but align your bullet points with the exact skill terminology used in the target role." },
];

const HEADLINES = [
  "before any recruiter does.",
  "in just 6 seconds.",
  "so you don’t get rejected.",
  "and shows exactly how to fix it.",
];

/* Typewriter: types, deletes, changes content in a loop */
function Typewriter({ lines, typeSpeed = 55, deleteSpeed = 28, pause = 1400 }) {
  const [text, setText] = useState("");
  useEffect(() => {
    let dead = false;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      let i = 0;
      while (!dead) {
        const s = lines[i++ % lines.length];
        for (let k = 1; k <= s.length && !dead; k++) { setText(s.slice(0, k)); await sleep(typeSpeed); }
        await sleep(pause);
        for (let k = s.length; k >= 0 && !dead; k--) { setText(s.slice(0, k)); await sleep(deleteSpeed); }
        await sleep(300);
      }
    })();
    return () => { dead = true; };
  }, [lines, typeSpeed, deleteSpeed, pause]);
  return (<><span>{text}</span><span className="ag-cursor" aria-hidden="true" /></>);
}

export default function Home() {
  const [analysis, setAnalysis] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);
  const [UplodeResume, { isLoading }] = useUplodeResumeMutation();
  const navigate = useNavigate();
  const root = useRef(null);
  const lenisRef = useRef(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // Lenis smooth scroll synced with ScrollTrigger
    const lenis = new Lenis({ lerp: 0.08 });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // Anti-gravity float loop
      gsap.utils.toArray(".ag-float").forEach((el) =>
        gsap.to(el, { y: -12, duration: gsap.utils.random(2.5, 4), yoyo: true, repeat: -1, ease: "sine.inOut", delay: Math.random() * 2 })
      );

      // Drifting particles
      gsap.utils.toArray(".ag-dot").forEach((d) => {
        gsap.set(d, { x: gsap.utils.random(0, window.innerWidth), y: window.innerHeight + 20 });
        gsap.to(d, { y: -40, duration: gsap.utils.random(14, 28), repeat: -1, ease: "none", delay: -Math.random() * 20 });
      });

      // Scroll Zoom: pinned resume mockup
      gsap.timeline({ scrollTrigger: { trigger: ".ag-zoom", start: "top top", end: "+=150%", pin: true, scrub: 1 } })
        .fromTo(".ag-zoom__mock", { scale: 0.8, rotateX: 10 }, { scale: 2.6, rotateX: 0, ease: "power1.in" }, 0)
        .to(".ag-zoom__text", { y: -140, opacity: 0, duration: 0.5 }, 0);

      // Card stack
      const cards = gsap.utils.toArray(".ag-stack__card");
      gsap.set(cards.slice(1), { yPercent: 130 });
      gsap.timeline({ scrollTrigger: { trigger: ".ag-steps", start: "top top", end: "+=220%", pin: true, scrub: 1 } })
        .to(cards[0], { scale: 0.92, y: -40, opacity: 0.6 }, 0)
        .to(cards[1], { yPercent: 0 }, 0)
        .to(cards[1], { scale: 0.96, y: -20, opacity: 0.8 }, 1)
        .to(cards[2], { yPercent: 0 }, 1);

      // Stagger from edges
      [[".ag-stats", ".ag-card"], [".ag-features__grid", ".ag-card"]].forEach(([wrap, item]) => {
        gsap.from(`${wrap} ${item}`, {
          opacity: 0, y: 60, scale: 0.9, duration: 0.8, ease: "power3.out",
          stagger: { each: 0.1, from: "edges" },
          scrollTrigger: { trigger: wrap, start: "top 80%", once: true },
        });
      });
    }, root);

    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Re-measure pins when analysis results change page height
  useEffect(() => { ScrollTrigger.refresh(); }, [analysis]);

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
        const el = document.getElementById("analysis-results");
        if (!el) return;
        if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: -20 });
        else el.scrollIntoView({ behavior: "smooth", block: "start" });
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
    <div className="ag-app" ref={root}>
      <div className="ag-grain" aria-hidden="true" />
      <div className="ag-dots" aria-hidden="true">
        {Array.from({ length: 28 }).map((_, i) => <i key={i} className="ag-dot" />)}
      </div>

      <Navbar />

      {/* HERO + UPLOAD */}
      <section className="ag-hero">
        <div className="ag-chip ag-float">
          <span className="ag-pulse" />
          <Sparkles size={14} />
          <span>Live ATS scanning</span>
        </div>

        <h1 className="ag-hero__title">
          Your resume gets read by a robot first.
          <span className="ag-hero__type"><Typewriter lines={HEADLINES} /></span>
        </h1>

        <p className="ag-hero__sub">
          We show you exactly why a line might get rejected, and how to fix it.
          Upload your resume, paste the job description, and get your score in about 30 seconds.
        </p>

        <div className="ag-upload ag-float">
          <UploadBox onAnalyze={handleAnalze} isLoading={isLoading} />
        </div>
        <p className="ag-hero__note"><span className="ag-hand">Free to try.</span> Your resume is never sold or shared.</p>
      </section>

      {/* AI ANALYSIS RESULTS */}
      {analysis && (
        <section className="ag-section ag-results" id="analysis-results">
          <AnalysisPanel
            atsScore={analysis.atsScore}
            matchingSkills={analysis.matchingSkills || []}
            missingSkills={analysis.missingSkills || []}
            strengths={analysis.strength || []}
            aiSuggestions={analysis.suggestions || []}
          />
        </section>
      )}

      {/* SCROLL ZOOM */}
      <section className="ag-zoom">
        <div className="ag-zoom__text">
          <h2>See what the ATS sees.</h2>
          <p>Scroll to look closer at one resume line.</p>
        </div>
        <div className="ag-zoom__stage">
          <div className="ag-zoom__mock">
            <div className="ag-mock__bar" style={{ width: "45%", background: "var(--c1)" }} />
            <small>Skills</small>
            <div><span className="ag-tag">React</span><span className="ag-tag">JavaScript</span><span className="ag-tag">REST API</span></div>
            <small>Experience</small>
            <div className="ag-mock__bar" style={{ width: "92%" }} />
            <div className="ag-mock__bar" style={{ width: "70%" }} />
            <span className="ag-warn">TypeScript is in the job post, not in your resume</span>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="ag-section">
        <div className="ag-stats">
          {STATS.map((s) => (
            <div key={s.label} className="ag-card">
              <div className="ag-num">{s.value}</div>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CARD STACK: 3 STEPS */}
      <section className="ag-steps">
        <div className="ag-stack">
          {STEPS.map((s, i) => (
            <div key={s.title} className="ag-stack__card">
              <span className="ag-stack__icon ag-float">{s.icon}</span>
              <div className="ag-num">{i + 1}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="ag-section ag-features">
        <h2 className="ag-title">Not just a score. The fixes too.</h2>
        <div className="ag-features__grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="ag-card ag-float">
              <div className="ag-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="ag-section ag-faq">
        <h2 className="ag-title">ATS basics, in plain words</h2>
        <div className="ag-faq__list">
          {ATS_TIPS.map((item, i) => (
            <div key={item.q} className={`ag-faq__item ${openFaq === i ? "is-open" : ""}`}>
              <button
                className="ag-faq__head"
                aria-expanded={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
              >
                <span>{item.q}</span>
                <span className="ag-faq__toggle">{openFaq === i ? "−" : "+"}</span>
              </button>
              <div className="ag-faq__body"><div><p>{item.a}</p></div></div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="ag-cta">
        <h2>Ready to beat the robot?</h2>
        <button className="ag-btn" onClick={() => (lenisRef.current ? lenisRef.current.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" }))}>
          Check my resume
        </button>
      </section>

      <Footer />
    </div>
  );
}