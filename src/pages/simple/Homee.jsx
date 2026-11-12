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
import "./simplepage.css";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "12,400+", label: "Resumes checked by real job seekers" },
  { value: "82%", label: "Average ATS score improvement" },
  { value: "3.2x", label: "More interview callbacks" },
];

const STEPS = [
  { icon: "📄", title: "Upload your resume", desc: "Drop in your PDF. We read it exactly the way a recruiter's software does." },
  { icon: "🎯", title: "Paste the job description", desc: "We pick out the skills the job asks for and compare them with yours." },
  { icon: "✨", title: "Get your score and fixes", desc: "Every problem comes with a simple fix you can apply in minutes." },
];

const FEATURES = [
  { icon: <Settings2 size={26} />, title: "Format check", desc: "Finds tables, columns and image headers that confuse recruiter software." },
  { icon: <Target size={26} />, title: "Missing keywords", desc: "Shows which skills from the job post your resume doesn't mention yet." },
  { icon: <BarChart3 size={26} />, title: "Bullet strength", desc: "Checks that your bullets start with action verbs and show real results." },
  { icon: <ShieldCheck size={26} />, title: "Your data stays yours", desc: "Your resume is encrypted and never used to train public models." },
];

const VOICES = [
  { quote: "My score went from 48 to 86 and I got two interview calls within three weeks.", name: "Rohit G.", role: "Frontend Developer" },
  { quote: "I found out my two-column template wasn't being read at all. One format change fixed it.", name: "Neha K.", role: "Marketing Executive" },
  { quote: "The bullet suggestions added numbers to my lines. My resume finally sounds like real work.", name: "Aman V.", role: "Data Analyst" },
];

const ATS_TIPS = [
  { q: "Why do so many resumes get rejected by ATS filters?", a: "Recruiter software reads plain text and looks for exact job titles, skills and tools. Two-column layouts, tables and missing keywords often give your resume a low match score before a person ever sees it." },
  { q: "What is a good ATS score?", a: "80 or higher puts you ahead of most applicants for that role. A score between 60 and 79 usually passes the first filter, and adding the missing keywords can lift it further." },
  { q: "How do I tailor my resume for each job?", a: "Run every job description through the scanner. Keep your experience the same, but use the same wording the job post uses for your skills." },
];

const HEADLINES = [
  "before any recruiter does.",
  "in just 6 seconds.",
  "so you don’t get rejected.",
  "and shows exactly how to fix it.",
];

/* Typewriter: types, deletes, then moves on to the next line */
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

    // Lenis smooth scroll, synced with ScrollTrigger
    const lenis = new Lenis({ lerp: 0.08 });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // Gentle floating (hero chip, upload box, icons)
      gsap.utils.toArray(".ag-float").forEach((el) =>
        gsap.to(el, { y: -10, duration: gsap.utils.random(2.5, 4), yoyo: true, repeat: -1, ease: "sine.inOut", delay: Math.random() * 2 })
      );

      // Drifting particles
      gsap.utils.toArray(".ag-dot").forEach((d) => {
        gsap.set(d, { x: gsap.utils.random(0, window.innerWidth), y: window.innerHeight + 20 });
        gsap.to(d, { y: -40, duration: gsap.utils.random(14, 28), repeat: -1, ease: "none", delay: -Math.random() * 20 });
      });

      // Scroll Zoom: pinned resume paper
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

      // Stagger from edges (clearProps so hover effects still work afterwards)
      [".ag-stats", ".ag-features__grid", ".ag-voices__grid"].forEach((wrap) => {
        gsap.from(`${wrap} .ag-card`, {
          opacity: 0, y: 60, scale: 0.9, duration: 0.8, ease: "power3.out",
          stagger: { each: 0.1, from: "edges" },
          clearProps: "transform,opacity",
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

  // Re-measure pinned sections when results change the page height
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
          <span>Free ATS check, ready in 30 seconds</span>
        </div>

        <h1 className="ag-hero__title">
          A robot reads your resume first.
          <span className="ag-hero__type"><Typewriter lines={HEADLINES} /></span>
        </h1>

        <p className="ag-hero__sub">
          We show you why a line might get rejected and how to fix it.
          Upload your resume, paste the job description, and see your score.
        </p>

        <p className="ag-hand ag-hero__hint">Tip: paste the job post too, your score gets much sharper.</p>

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

      {/* SCROLL ZOOM HERO */}
      <section className="ag-zoom">
        <div className="ag-zoom__text">
          <h2>See what the ATS sees.</h2>
          <p>Keep scrolling and look closer at one resume.</p>
        </div>
        <div className="ag-zoom__stage">
          <div className="ag-zoom__mock">
            <div className="ag-mock__bar ag-mock__bar--name" style={{ width: "45%" }} />
            <small>Skills</small>
            <div><span className="ag-tag">React</span><span className="ag-tag">JavaScript</span><span className="ag-tag">REST API</span></div>
            <small>Experience</small>
            <div className="ag-mock__bar" style={{ width: "92%" }} />
            <div className="ag-mock__bar" style={{ width: "70%" }} />
            <span className="ag-warn">TypeScript is in the job post but not on your resume</span>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="ag-band ag-band--cream">
        <div className="ag-section">
          <div className="ag-stats">
            {STATS.map((s) => (
              <div key={s.label} className="ag-card">
                <div className="ag-num">{s.value}</div>
                <p>{s.label}</p>
              </div>
            ))}
          </div>
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
      <section className="ag-band ag-band--cream">
        <div className="ag-section ag-features">
          <h2 className="ag-title">Not just a score. The fixes too.</h2>
          <div className="ag-features__grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="ag-card">
                <div className="ag-icon ag-float">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VOICES */}
      <section className="ag-band ag-band--navy">
        <div className="ag-section ag-voices">
          <h2 className="ag-title">People who raised their score</h2>
          <div className="ag-voices__grid">
            {VOICES.map((v) => (
              <figure key={v.name} className="ag-card ag-voice">
                <blockquote>{v.quote}</blockquote>
                <figcaption>
                  <span className="ag-hand">{v.name}</span>
                  <small>{v.role}</small>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ag-band ag-band--cream">
        <div className="ag-section ag-faq">
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
        </div>
      </section>

      {/* CTA */}
      <section className="ag-cta">
        <h2>Ready to get past the robot?</h2>
        <button className="ag-btn" onClick={() => (lenisRef.current ? lenisRef.current.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" }))}>
          Check my resume
        </button>
      </section>

      <Footer />
    </div>
  );
}