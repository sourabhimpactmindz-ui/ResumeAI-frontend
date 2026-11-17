import { Link } from "react-router-dom";
import { templates } from "./templates";
import "./tools.css";

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

export default function Tools() {
  return (
    <div className="tools-page">
      <h2>Choose a template</h2>
      <div className="tools-grid">
        {templates.map(t => {
          const Template = t.component;
          return (
            <Link key={t.id} to={`/tools/builder/${t.id}`} className="tool-card">
              <div className="tool-preview">
                <div className="tool-preview-inner">
                  <Template data={sample} />
                </div>
              </div>
              <h3>{t.name}</h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
}