import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import { templates } from "./templates";
import "./tools.css";

const sample = {
  name: "Your Name",
  title: "Frontend Developer",
  email: "you@email.com",
  phone: "+91 98765 43210",
  location: "Delhi, India",
  linkedin: "linkedin.com/in/yourname",
  github: "github.com/XYZ",
  summary:
    "Frontend Developer with 2+ years of experience building fast, responsive web applications using React and JavaScript. Skilled in REST API integration, state management and performance optimization. Looking to contribute to a product-focused team.",
  skills: "Languages: JavaScript, Python\nFrontend: React, HTML, CSS\nTools: Git, Figma",
  experience:
    "Frontend Developer | ABC Pvt Ltd, Delhi | 2022 – Present\n- Built 10+ React pages\n- Improved load time by 35%",
  projects: "AI-AUTOMATIOM.com",
  education: "B.Tech in Computer Science | XYZ University | 2018 – 2022",
};

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
                <div className="tl-frame">
                  <div className="tl-preview">
                    <div className="tl-preview__inner">
                      <Template data={sample} />
                    </div>
                  </div>
                </div>

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