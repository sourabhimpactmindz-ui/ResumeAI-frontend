import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Download, ArrowLeft } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import { templates } from "../../services/templates";
import ScaledPreview from "../../components/ScaledPreview";
import PhotoUpload from "../../components/photoUpload";
import { sampleData } from "../../services/simplerData";
 import "./builder.css";

const TEXT_FIELDS = [
  { key: "name", label: "Full name", placeholder: "Rohit Sharma" },
  { key: "title", label: "Job title", placeholder: "Frontend Developer" },
  { key: "email", label: "Email", placeholder: "you@email.com" },
  { key: "phone", label: "Phone", placeholder: "+91 98765 43210" },
  { key: "location", label: "Location", placeholder: "Delhi, India" },
  { key: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/yourname" },
  { key: "github", label: "GitHub", placeholder: "github.com/yourname" },
];

const AREA_FIELDS = [
  { key: "summary", label: "Summary", rows: 4, hint: "2 to 3 lines about you." },
  { key: "skills", label: "Skills", rows: 5, hint: "One group per line, like: Frontend: React, HTML, CSS" },
  { key: "experience", label: "Work experience", rows: 10, hint: "Title | Company | Dates, then lines starting with - for bullets." },
  { key: "projects", label: "Projects", rows: 7, hint: "Name | Tech used | Link, then lines starting with - for bullets." },
  { key: "education", label: "Education", rows: 3, hint: "Degree | School | Years, one per line." },
];

export default function Builder() {
  const { id } = useParams();
  const template = templates.find((t) => t.id === id);
  const [data, setData] = useState({ ...sampleData });

  if (!template) {
    return (
      <div className="bd-page">
        <Navbar />
        <main className="bd-missing">
          <h1>Template not found</h1>
          <p>This template does not exist. Please choose one from the list.</p>
          <Link to="/tools" className="bd-btn">Back to templates</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const Template = template.component;
  // photo only goes to templates that allow it
  const templateData = template.supportsPhoto ? data : { ...data, photo: "" };
  const update = (key) => (e) => setData((d) => ({ ...d, [key]: e.target.value }));

  return (
    <div className="bd-page">
      <Navbar />

      <header className="bd-hero">
        <Link to="/tools" className="bd-back"><ArrowLeft size={15} /> All templates</Link>
        <p className="bd-hand">Step 2 of 2</p>
        <h1>Fill in your details</h1>
        <p className="bd-hero__sub">Your {template.name} resume updates live as you type.</p>
      </header>

      <main className="bd-main">
        {/* ---------- form ---------- */}
        <section className="bd-form" aria-label="Resume details">
          {template.supportsPhoto && (
            <div className="bd-field">
              <span className="bd-label">Photo</span>
              <PhotoUpload value={data.photo} onChange={(photo) => setData((d) => ({ ...d, photo }))} />
            </div>
          )}

          <div className="bd-row">
            {TEXT_FIELDS.map((f) => (
              <label className="bd-field" key={f.key}>
                <span className="bd-label">{f.label}</span>
                <input className="bd-input" value={data[f.key] || ""} onChange={update(f.key)} placeholder={f.placeholder} />
              </label>
            ))}
            {template.supportsPhoto && (
              <label className="bd-field">
                <span className="bd-label">Languages</span>
                <input className="bd-input" value={data.languages || ""} onChange={update("languages")} placeholder="English, Hindi" />
              </label>
            )}
          </div>

          {AREA_FIELDS.map((f) => (
            <label className="bd-field" key={f.key}>
              <span className="bd-label">{f.label}</span>
              <textarea className="bd-input bd-area" rows={f.rows} value={data[f.key] || ""} onChange={update(f.key)} />
              <span className="bd-hint">{f.hint}</span>
            </label>
          ))}
        </section>

        {/* ---------- live preview ---------- */}
        <aside className="bd-side" aria-label="Preview">
          <ScaledPreview className="bd-preview">
            <Template data={templateData} />
          </ScaledPreview>

          <button type="button" className="bd-btn" onClick={() => window.print()}>
            <Download size={17} /> Download PDF
          </button>
          <p className="bd-hint bd-hint--center">In the print window, choose "Save as PDF".</p>
        </aside>
      </main>

      <Footer />

      {/* full-size copy that is only used when printing */}
      <div className="bd-print" aria-hidden="true">
        <Template data={templateData} />
      </div>
    </div>
  );
}