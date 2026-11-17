import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { templates } from "../../components/templates";
import "./builder.css";

const fields = [
  { name: "name", label: "Full Name", placeholder: "Sourabh Kumar" },
  { name: "title", label: "Job Title", placeholder: "Frontend Developer" },
  { name: "email", label: "Email", placeholder: "you@email.com" },
  { name: "phone", label: "Phone", placeholder: "+91 98765 43210" },
  { name: "location", label: "Location", placeholder: "Sonipat, Haryana" },
  { name: "summary", label: "Summary", placeholder: "2-3 lines about you", area: true },
  { name: "skills", label: "Skills (comma separated)", placeholder: "React, Node.js, SQL", area: true },
  { name: "experience", label: "Experience (ek line mein ek point)", placeholder: "Company - Role (2022-Present)\nBuilt dashboards using React", area: true },
  { name: "education", label: "Education", placeholder: "B.Tech CSE, XYZ University (2018-2022)", area: true },
];

const empty = Object.fromEntries(fields.map(f => [f.name, ""]));

export default function Builder() {
  const { templateId } = useParams();
  const found = templates.find(t => t.id === templateId);
  const printRef = useRef(null);

  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem("resumeData");
      return saved ? { ...empty, ...JSON.parse(saved) } : empty;
    } catch {
      return empty;
    }
  });

  useEffect(() => {
    try { localStorage.setItem("resumeData", JSON.stringify(data)); } catch {}
  }, [data]);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: data.name ? `${data.name} - Resume` : "Resume",
    pageStyle: "@page { size: A4; margin: 0; } body { margin: 0; }",
  });

  if (!found) return <p style={{ padding: 24 }}>Template not found</p>;
  const Template = found.component;

  const onChange = e => setData({ ...data, [e.target.name]: e.target.value });

  return (
    <div className="builder">
      <aside className="builder-form">
        <h2>Resume Details</h2>
        {fields.map(f => (
          <label key={f.name} className="field">
            <span>{f.label}</span>
            {f.area ? (
              <textarea name={f.name} rows={4} value={data[f.name]} placeholder={f.placeholder} onChange={onChange} />
            ) : (
              <input name={f.name} value={data[f.name]} placeholder={f.placeholder} onChange={onChange} />
            )}
          </label>
        ))}
        <button type="button" className="download-btn" onClick={handlePrint}>
          Download PDF
        </button>
      </aside>

      <main className="builder-preview">
        <div className="paper-wrap">
          <div className="paper-scale">
            <div ref={printRef}>
              <Template data={data} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}