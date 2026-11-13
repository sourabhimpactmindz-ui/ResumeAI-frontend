import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./simplepage.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";

gsap.registerPlugin(ScrollTrigger);

/* ---------- helpers ---------- */
function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setSeen(true); io.disconnect(); }
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
    <div ref={ref} className={`lp-reveal ${seen ? "is-in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
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

/* Typewriter: types, deletes, then changes to the next line */
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
  return (<><span>{text}</span><span className="lp-cursor" aria-hidden="true" /></>);
}

/* ---------- content ---------- */
const HEADLINES = [
  "before any recruiter does.",
  "in just 6 seconds.",
  "so you don’t get rejected.",
  "and shows exactly how to fix it.",
];

const steps = [
  { t: "Upload your resume", d: "Drop in a PDF or DOCX. We read the text, headings and layout the same way an ATS does.", e: "📄" },
  { t: "Paste the job description", d: "The AI pulls the key skills from the job post and matches them against your resume.", e: "🎯" },
  { t: "Get your score and fixes", d: "Every issue comes with a clear fix that you can apply in one click.", e: "✨" },
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
  { q: "My score went from 48 to 86 and I got two interview calls within three weeks.", a: "Rohit S.", r: "Frontend Developer" },
  { q: "I learned my two-column template wasn't being parsed at all. One format change fixed it.", a: "Neha K.", r: "Marketing Executive" },
  { q: "The bullet rewrite added numbers and results to my lines. My resume finally reads like real work.", a: "Aman V.", r: "Data Analyst" },
];

const faqs = [
  { q: "What is an ATS?", a: "An Applicant Tracking System is software companies use to filter resumes. It converts your resume to text and matches it against the job description." },
  { q: "Do I need a score of 100?", a: "No. A score of 80 or above is considered very good. What matters is that your resume contains the real keywords for the role." },
  { q: "Which file formats are supported?", a: "Both PDF and DOCX. A text-based PDF works best. Scanned image PDFs are harder to parse." },
  { q: "Is my resume safe?", a: "Yes. Your resume is used only for the scan, and you can delete it at any time." },
  { q: "Can freshers use this?", a: "Absolutely. Freshers get focused suggestions for the projects, skills and education sections." },
];

/* ---------- page ---------- */
export default function Homee() {
  const token = localStorage.getItem("accessToken");
  const [scoreRef, scoreSeen] = useInView(0.4);
  const [barsRef, barsSeen] = useInView(0.3);
  const [statsRef, statsSeen] = useInView(0.4);
  const [open, setOpen] = useState(0);
  const root = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Lenis smooth scroll, synced with ScrollTrigger
    const lenis = new Lenis({ lerp: 0.08 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // Scroll Zoom Hero: pinned resume zooms in while you scroll
      gsap.timeline({ scrollTrigger: { trigger: ".lp-zoom", start: "top top", end: "+=150%", pin: true, scrub: 1 } })
        .fromTo(".lp-zoom__doc", { scale: 0.8, rotateX: 10 }, { scale: 2.4, rotateX: 0, ease: "power1.in" }, 0)
        .to(".lp-zoom__text", { y: -140, opacity: 0, duration: 0.5 }, 0);

      // Card stack: the 3 steps slide up and stack on each other
      const cards = gsap.utils.toArray(".lp-stack__card");
      gsap.set(cards.slice(1), { yPercent: 130 });
      gsap.timeline({ scrollTrigger: { trigger: ".lp-steps", start: "top top", end: "+=220%", pin: true, scrub: 1 } })
        .to(cards[0], { scale: 0.92, y: -40, opacity: 0.6 }, 0)
        .to(cards[1], { yPercent: 0 }, 0)
        .to(cards[1], { scale: 0.96, y: -20, opacity: 0.8 }, 1)
        .to(cards[2], { yPercent: 0 }, 1);

      // Stagger from edges
      [".lp-stats", ".lp-features", ".lp-reviews"].forEach((wrap) => {
        gsap.from(`${wrap} .lp-card`, {
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
    };
  }, []);

  return (
    <div className="lp" ref={root}>
      <Navbar />

      {/* HERO */}
      <section className="lp-hero" id="top">
        <p className="lp-hand">Hi, quick question: will a robot read your resume?</p>
        <h1>
          An ATS reads your resume
          <span className="lp-type"><Typewriter lines={HEADLINES} /></span>
        </h1>
        <p className="lp-lead">
          Our AI matches your resume against the job description, gives you an ATS score
          and shows exactly why a line might get you rejected.
        </p>
        <div className="lp-actions">
          <Link className="lp-btn" to={token ? "/home" : "/login"}>Check it free</Link>
          <a className="lp-btn lp-btn--ghost" href="#how">See how it works</a>
        </div>
      </section>

      {/* SCROLL ZOOM */}
      <section className="lp-zoom" aria-label="Resume preview">
        <div className="lp-zoom__text">
          <h2>See what the ATS sees.</h2>
          <p>Keep scrolling to look closer.</p>
        </div>
        <div className="lp-zoom__doc" aria-hidden="true">
          <div className="lp-scan" />
          <div className="lp-doc__name" />
          <div className="lp-doc__sub" />
          <span className="lp-doc__h">Skills</span>
          <p>
            <mark className="lp-hit">React</mark>, <mark className="lp-hit">JavaScript</mark>,{" "}
            <mark className="lp-hit">REST API</mark>, Git, <mark className="lp-miss">TypeScript</mark>
          </p>
          <span className="lp-doc__h">Experience</span>
          <div className="lp-line" style={{ width: "90%" }} />
          <div className="lp-line" style={{ width: "75%" }} />
          <div className="lp-line" style={{ width: "85%" }} />
          <span className="lp-doc__tag">TypeScript is in the job post, not in your resume</span>
        </div>
      </section>

      {/* STATS */}
      <section className="lp-band lp-band--cream" ref={statsRef}>
        <div className="lp-wrap">
          <div className="lp-stats">
            {stats.map((x) => (
              <div key={x.l} className="lp-card">
                <strong><CountUp to={x.n} run={statsSeen} />{x.s}</strong>
                <p>{x.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS: CARD STACK */}
      <section className="lp-steps" id="how">
        <div className="lp-stack">
          {steps.map((s, i) => (
            <div key={s.t} className="lp-stack__card">
              <span className="lp-stack__emoji" aria-hidden="true">{s.e}</span>
              <div className="lp-stack__n">{i + 1}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SCORE */}
      <section className="lp-band lp-band--cream" id="score">
        <div className="lp-wrap">
          <Reveal><h2>A score that shows where to improve</h2></Reveal>
          <div className="lp-score">
            <div className="lp-ring" ref={scoreRef}>
              <svg viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" className="lp-ring__bg" />
                <circle cx="60" cy="60" r="52" className={`lp-ring__fg ${scoreSeen ? "go" : ""}`} pathLength="100" />
              </svg>
              <div className="lp-ring__num">
                <strong><CountUp to={78} run={scoreSeen} /></strong>
                <span>/ 100</span>
              </div>
            </div>
            <div ref={barsRef}>
              {bars.map((b, i) => (
                <div className="lp-bar" key={b.l}>
                  <div className="lp-bar__top"><span>{b.l}</span><span>{b.v}%</span></div>
                  <div className="lp-track">
                    <div className="lp-fill" style={{ width: barsSeen ? `${b.v}%` : "0%", transitionDelay: `${i * 150}ms` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="lp-band lp-band--navy" id="features">
        <div className="lp-wrap">
          <Reveal><h2>Not just a score, the fixes too</h2></Reveal>
          <div className="lp-features">
            {features.map((f) => (
              <div key={f.t} className="lp-card">
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="lp-band lp-band--cream">
        <div className="lp-wrap">
          <Reveal><h2>One line, two very different results</h2></Reveal>
          <div className="lp-compare">
            <Reveal className="lp-cmp lp-cmp--before">
              <h3>Before · Score 52</h3>
              <p>Responsible for building website pages and fixing bugs in the team.</p>
              <ul>
                <li>No numbers or results</li>
                <li>Job post keywords missing</li>
                <li>Passive wording</li>
              </ul>
            </Reveal>
            <Reveal delay={150} className="lp-cmp lp-cmp--after">
              <h3>After · Score 88</h3>
              <p>Built 12 React pages with REST APIs and cut page load time by 38%, lifting sign-ups by 15%.</p>
              <ul>
                <li>Measurable result</li>
                <li>React and REST API keywords</li>
                <li>Starts with an action verb</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MYTHS */}
      <section className="lp-band lp-band--navy">
        <div className="lp-wrap">
          <Reveal><h2>Common myths about the ATS</h2></Reveal>
          <div className="lp-myths">
            {myths.map((x, i) => (
              <Reveal key={x.m} delay={i * 90} className="lp-myth">
                <p className="lp-myth__m">{x.m}</p>
                <p className="lp-myth__f">{x.f}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      {/* <section className="lp-band lp-band--cream">
        <div className="lp-wrap">
          <Reveal><h2>In the words of people who raised their score</h2></Reveal>
          <div className="lp-reviews">
            {reviews.map((r) => (
              <figure key={r.a} className="lp-card lp-review">
                <blockquote>{r.q}</blockquote>
                <figcaption><span className="lp-hand">{r.a}</span><small>{r.r}</small></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section> */}

      {/* FAQ */}
      <section className="lp-band lp-band--ink" id="faq">
        <div className="lp-wrap">
          <Reveal><h2>Frequently asked questions</h2></Reveal>
          <div className="lp-faq">
            {faqs.map((f, i) => (
              <div key={f.q} className={`lp-faq__item ${open === i ? "open" : ""}`}>
                <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  {f.q}<span>{open === i ? "−" : "+"}</span>
                </button>
                <div className="lp-faq__a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* <section className="lp-cta">
        <h2>Ready to get past the robot?</h2>
        <Link className="lp-btn" to={token ? "/home" : "/login"}>Check my resume</Link>
      </section> */}

      <Footer />
    </div>
  );
}