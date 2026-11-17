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
  { name: "linkedin", label: "LinkedIn (optional)", placeholder: "linkedin.com/in/yourname" },
  { name: "github", label: "GitHub / Portfolio (optional)", placeholder: "github.com/yourname" },
  { name: "summary", label: "Professional Summary", area: true, rows: 4,
    placeholder: "Frontend developer with 2 years of experience building React apps..." },
  { name: "skills", label: "Skills", area: true, rows: 4,
    hint: "Har line mein: Category: skill1, skill2",
    placeholder: "Languages: JavaScript, Python\nFrontend: React, HTML, CSS\nTools: Git, Figma" },
  { name: "experience", label: "Work Experience", area: true, rows: 9,
    hint: "Pehli line: Role | Company, City | Jan 2022 – Present. Neeche har line ek bullet. Naye job se pehle ek khali line chhodo.",
    placeholder: "Frontend Developer | ABC Pvt Ltd, Delhi | Jan 2022 – Present\n- Built 10+ React pages, cut load time by 35%\n- Led a team of 3 developers\n\nIntern | XYZ Tech, Noida | Jun 2021 – Dec 2021\n- Fixed 40+ UI bugs" },
  { name: "projects", label: "Projects (optional)", area: true, rows: 6,
    hint: "Project Name | Tech used | Link (same format)",
    placeholder: "Resume Builder | React, Node.js | github.com/you/resume\n- Built a template-based resume maker with PDF export" },
  { name: "education", label: "Education", area: true, rows: 4,
    placeholder: "B.Tech in Computer Science | XYZ University | 2018 – 2022\n- CGPA: 8.2/10" },
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
  pageStyle: "@page { size: A4; margin: 14mm 15mm; } body { margin: 0; }",
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
    {f.hint && <small>{f.hint}</small>}
    {f.area ? (
      <textarea name={f.name} rows={f.rows || 4} value={data[f.name]} placeholder={f.placeholder} onChange={onChange} />
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