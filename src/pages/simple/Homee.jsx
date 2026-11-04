import { useEffect, useRef, useState } from "react";
import "./simplepage.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";

/* Returns true once the element has scrolled into view */
function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, seen] = useInView(0.15);
  return (
    <div
      ref={ref}
      className={`reveal ${seen ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function CountUp({ to, run, duration = 1400 }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to, duration]);
  return <>{n}</>;
}

const steps = [
  { t: "Upload your resume", d: "Drop in a PDF or DOCX. We read the text, headings and layout the same way an ATS does." },
  { t: "Paste the job description", d: "The AI pulls the key skills and keywords from the job post and matches them against your resume." },
  { t: "Get your score and fixes", d: "Every issue comes with a clear fix that you can apply in one click." },
];

const bars = [
  { l: "Keyword match", v: 82 },
  { l: "Format and parsing", v: 94 },
  { l: "Section structure", v: 76 },
  { l: "Measurable results", v: 61 },
];

const features = [
  { t: "ATS-safe format check", d: "Catches tables, columns and images that break parsing." },
  { t: "Keyword gap", d: "A single list of the skills in the job post that your resume is missing." },
  { t: "Bullet rewrite", d: "Turns weak lines into strong bullets with numbers and outcomes." },
  { t: "Role-specific tips", d: "Suggestions tailored to frontend, data, marketing and more." },
];

const stats = [
  { n: 75, s: "%", l: "of resumes are rejected by an ATS before a human sees them" },
  { n: 6, s: " sec", l: "is how long a recruiter spends on a first look" },
  { n: 40, s: "+", l: "format and keyword checks in every scan" },
  { n: 30, s: " sec", l: "to get your full score and report" },
];

const myths = [
  { m: "A beautiful design impresses the ATS.", f: "An ATS only reads text. Columns, icons and images often break parsing." },
  { m: "Listing your skills once is enough.", f: "Every job post uses different keywords. Tailor your resume for each role." },
  { m: "The longer the resume, the better.", f: "One page is enough for freshers and two for experienced candidates." },
  { m: "Putting contact details in the header is fine.", f: "Many systems skip headers and footers entirely. Keep contact details in the body." },
];

const reviews = [
  { q: "My score went from 48 to 86 and I got two interview calls within three weeks.", a: "Rohit S., Frontend Developer" },
  { q: "I learned my two-column template wasn't being parsed at all. One format change fixed it.", a: "Neha K., Marketing Executive" },
  { q: "The bullet rewrite added numbers and results to my lines. My resume finally reads like real work.", a: "Aman V., Data Analyst" },
];

const faqs = [
  { q: "What is an ATS?", a: "An Applicant Tracking System is software companies use to filter resumes. It converts your resume to text and matches it against the job description." },
  { q: "Do I need a score of 100?", a: "No. A score of 80 or above is considered very good. What matters is that your resume contains the real keywords for the role." },
  { q: "Which file formats are supported?", a: "Both PDF and DOCX. A text-based PDF works best. Scanned image PDFs are harder to parse." },
  { q: "Is my resume safe?", a: "Yes. Your resume is used only for the scan, and you can delete it at any time." },
  { q: "Can freshers use this?", a: "Absolutely. Freshers get focused suggestions for the projects, skills and education sections." },
];

export default function Homee() {
  const token = localStorage.getItem("accessToken");
  const [scoreRef, scoreSeen] = useInView(0.4);
  const [barsRef, barsSeen] = useInView(0.3);
  const [statsRef, statsSeen] = useInView(0.4);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setProgress(h.scrollTop / (h.scrollHeight - h.clientHeight || 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="landing-page">
      <div className="progress" style={{ transform: `scaleX(${progress})` }} />

      {/* Unified Global Navbar */}
      <Navbar />

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-copy">
          <h1>An ATS reads your resume before any recruiter does.</h1>
          <p className="lead">
            Our AI matches your resume against the job description, gives you an
            ATS score and shows exactly why a line might get you rejected.
          </p>
          <div className="hero-actions">
            <Link className="btn" to={token ? "/home" : "/login"}>
              Check it free
            </Link>
            <a className="btn btn-ghost" href="#how">See how it works</a>
          </div>
        </div>

        <div className="doc" aria-hidden="true">
          <div className="scan-line" />
          <div className="doc-head">
            <div className="doc-name" />
            <div className="doc-sub" />
          </div>
          <div className="doc-block">
            <span className="doc-h">Skills</span>
            <p>
              <mark className="hit">React</mark>, <mark className="hit">JavaScript</mark>,{" "}
              <mark className="hit">REST API</mark>, Git, <mark className="miss">TypeScript</mark>
            </p>
          </div>
          <div className="doc-block">
            <span className="doc-h">Experience</span>
            <div className="line w90" />
            <div className="line w75" />
            <div className="line w85" />
          </div>
          <div className="doc-block">
            <span className="doc-h">Projects</span>
            <div className="line w80" />
            <div className="line w60" />
          </div>
          <div className="doc-tag">TypeScript is in the job post, not in your resume</div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats" ref={statsRef}>
        {stats.map((x) => (
          <div key={x.l} className="stat">
            <strong><CountUp to={x.n} run={statsSeen} />{x.s}</strong>
            <p>{x.l}</p>
          </div>
        ))}
      </section>

      {/* HOW */}
      <section className="section" id="how">
        <Reveal>
          <h2>Three steps to an ATS-ready resume</h2>
          <span className="mobile-slide-hint">← Swipe steps →</span>
        </Reveal>
        <div className="steps">
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 120} className="step">
              <span className="step-n">{i + 1}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SCORE */}
      <section className="section score" id="score">
        <Reveal><h2>A score that shows where to improve</h2></Reveal>
        <div className="score-grid">
          <div className="ring-wrap" ref={scoreRef}>
            <svg viewBox="0 0 120 120" className="ring">
              <circle cx="60" cy="60" r="52" className="ring-bg" />
              <circle
                cx="60" cy="60" r="52"
                className={`ring-fg ${scoreSeen ? "go" : ""}`}
                pathLength="100"
              />
            </svg>
            <div className="ring-num">
              <strong><CountUp to={78} run={scoreSeen} /></strong>
              <span>/ 100</span>
            </div>
          </div>

          <div className="bars" ref={barsRef}>
            {bars.map((b, i) => (
              <div className="bar" key={b.l}>
                <div className="bar-top">
                  <span>{b.l}</span>
                  <span>{b.v}%</span>
                </div>
                <div className="track">
                  <div
                    className="fill"
                    style={{
                      width: barsSeen ? `${b.v}%` : "0%",
                      transitionDelay: `${i * 150}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section" id="features">
        <Reveal>
          <h2>Not just a score, the fixes too</h2>
          <span className="mobile-slide-hint">← Swipe fixes →</span>
        </Reveal>
        <div className="features">
          {features.map((f, i) => (
            <Reveal key={f.t} delay={i * 100} className="feature">
              <h3>{f.t}</h3>
              <p>{f.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="section">
        <Reveal>
          <h2>One line, two very different results</h2>
          <span className="mobile-slide-hint">← Swipe comparison →</span>
        </Reveal>
        <div className="compare">
          <Reveal className="cmp cmp-before">
            <h3>Before · Score 52</h3>
            <p>Responsible for building website pages and fixing bugs in the team.</p>
            <ul>
              <li>No numbers or results</li>
              <li>Job post keywords missing</li>
              <li>Passive wording</li>
            </ul>
          </Reveal>
          <Reveal delay={150} className="cmp cmp-after">
            <h3>After · Score 88</h3>
            <p>Built 12 React pages with REST APIs and cut page load time by 38%, lifting sign-ups by 15%.</p>
            <ul>
              <li>Measurable result</li>
              <li>React and REST API keywords</li>
              <li>Starts with an action verb</li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* MYTHS */}
      <section className="section">
        <Reveal>
          <h2>Common myths about the ATS</h2>
          <span className="mobile-slide-hint">← Swipe myths →</span>
        </Reveal>
        <div className="myths">
          {myths.map((x, i) => (
            <Reveal key={x.m} delay={i * 90} className="myth">
              <p className="myth-m">{x.m}</p>
              <p className="myth-f">{x.f}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section">
        <Reveal>
          <h2>In the words of people who raised their score</h2>
          <span className="mobile-slide-hint">← Swipe reviews →</span>
        </Reveal>
        <div className="reviews">
          {reviews.map((r, i) => (
            <Reveal key={r.a} delay={i * 120} className="review">
              <blockquote>{r.q}</blockquote>
              <cite>{r.a}</cite>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <Reveal><h2>Frequently asked questions</h2></Reveal>
        <div className="faq">
          {faqs.map((f, i) => (
            <div key={f.q} className={`faq-item ${open === i ? "open" : ""}`}>
              <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                {f.q}<span>{open === i ? "−" : "+"}</span>
              </button>
              <div className="faq-a"><p>{f.a}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPREHENSIVE RESPONSIVE FOOTER */}
      <Footer />
    </div>
  );
}
