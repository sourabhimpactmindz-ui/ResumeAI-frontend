import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { templates } from "./templates";
import "./tools.css"; 
import Footer from "./footer";
import Navbar from "./Navbar";
import { useLayoutEffect, useRef, useState } from "react";


const sample = {
  name: "Your Name",
  title: "Frontend Developer",
  email: "you@email.com",
  phone: "+91 98765 43210",
  location: "Delhi, India",
  linkedin: "linkedin.com/in/yourname",
  github: "",
  summary:
    "Frontend developer with 2 years of experience building fast, responsive web apps using React and JavaScript.",
  skills: "Languages: JavaScript, Python\nFrontend: React, HTML, CSS\nTools: Git, Figma",
  experience:
    "Frontend Developer | ABC Pvt Ltd, Delhi | 2022 – Present\n- Built 10+ React pages\n- Improved load time by 35%",
  projects: "",
  education: "B.Tech in Computer Science | XYZ University | 2018 – 2022",
};

const A4_WIDTH = 794; // the template is built at A4 width

/* Shrinks the A4 template to whatever width the card has, so the preview is responsive */
function Preview({ children }) {
  const box = useRef(null);
  const [scale, setScale] = useState(0.3);

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / A4_WIDTH);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="tl-preview" ref={box}>
      <div className="tl-preview__inner" style={{ transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}

export default function Tools() {
  return (
    <div className="tl-page">
      <Navbar />

      <header className="tl-hero">
        <p className="tl-hand">Step 1 of 2</p>
        <h1>Choose a template</h1>
        <p className="tl-hero__sub">
          Pick a clean, ATS-friendly layout. You can fill in your details on the next page.
        </p>
      </header>

      <main className="tl-main">
        <div className="tl-grid">
          {templates.map((t) => {
            const Template = t.component;
            return (
              <Link key={t.id} to={`/tools/builder/${t.id}`} className="tl-card">
                <Preview>
                  <Template data={sample} />
                </Preview>

                <div className="tl-card__foot">
                  <h3>{t.name}</h3>
                  <span className="tl-card__use">
                    Use this template <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}