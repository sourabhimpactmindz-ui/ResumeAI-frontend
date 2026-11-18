import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Download, ArrowLeft, Maximize2, X } from "lucide-react";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import { templates } from "../../services/templates";
import { sampleData } from "../../services/simplerData";
import { downloadElementAsPdf } from "../../services/DownloadPdf";
import ScaledPreview from "../../components/ScaledPreview";
import PhotoUpload from "../../components/photoUpload";
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
  const params = useParams();
  const id = params.id ?? params.templateId ?? Object.values(params)[0];
  const template = templates.find((t) => String(t.id) === String(id));

  const [data, setData] = useState({ ...sampleData });
  const [busy, setBusy] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const captureRef = useRef(null);

  // full preview: close with Esc, and stop the page behind from scrolling
  useEffect(() => {
    if (!showFull) return;
    const onKey = (e) => e.key === "Escape" && setShowFull(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [showFull]);

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

  const handleDownload = async () => {
    setBusy(true);
    try {
      const fileName = `${(data.name || "resume").trim().replace(/\s+/g, "-")}-resume.pdf`;
      await downloadElementAsPdf(captureRef.current, fileName);
      toast.success("Your resume PDF is downloaded.");
    } catch (err) {
      console.error(err);
      toast.error("Could not create the PDF. Please try again.");
    } finally {
      setBusy(false);
    }
  };

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
          <div className="bd-actions">
            <button type="button" className="bd-btn" onClick={handleDownload} disabled={busy}>
              <Download size={17} /> {busy ? "Preparing PDF..." : "Download PDF"}
            </button>
            <button type="button" className="bd-btn bd-btn--outline" onClick={() => setShowFull(true)}>
              <Maximize2 size={16} /> Full preview
            </button>
          </div>

          <div className="bd-preview-scroll">
            <ScaledPreview autoHeight showPageBreaks className="bd-preview">
              <Template data={templateData} />
            </ScaledPreview>
          </div>

          <p className="bd-hint bd-hint--center">
            The PDF is a picture of your resume. If you need selectable text (better for ATS),{" "}
            <button type="button" className="bd-link" onClick={() => window.print()}>use Print and Save as PDF</button>.
          </p>
        </aside>
      </main>

      <Footer />

      {/* full preview (shows every page, big enough to read) */}
      {showFull && (
        <div className="bd-modal" role="dialog" aria-modal="true" aria-label="Full preview" onClick={() => setShowFull(false)}>
          <div className="bd-modal__bar" onClick={(e) => e.stopPropagation()}>
            <span>Full preview</span>
            <button type="button" className="bd-modal__close" onClick={() => setShowFull(false)} aria-label="Close preview">
              <X size={18} />
            </button>
          </div>
          <div className="bd-modal__sheet" onClick={(e) => e.stopPropagation()}>
            <ScaledPreview autoHeight showPageBreaks className="bd-modal__paper">
              <Template data={templateData} />
            </ScaledPreview>
          </div>
        </div>
      )}

      {/* full-size copy: used for the PDF download and for printing */}
      <div className="bd-print" ref={captureRef} aria-hidden="true">
        <Template data={templateData} />
      </div>
    </div>
  );
}