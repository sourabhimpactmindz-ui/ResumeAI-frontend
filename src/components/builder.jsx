import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { templates } from "./templates";

export default function Builder() {
  const { templateId } = useParams();
  const Template = templates.find(t => t.id === templateId).component;
  const printRef = useRef();
  const handlePrint = useReactToPrint({ contentRef: printRef });

  const [data, setData] = useState({
    name: "", email: "", phone: "", summary: "", skills: "", experience: "", education: ""
  });
  const onChange = e => setData({ ...data, [e.target.name]: e.target.value });

  return (
    <div style={{ display: "flex", gap: 24 }}>
      <form>
        <input name="name" placeholder="Full name" onChange={onChange} />
        <input name="email" placeholder="Email" onChange={onChange} />
        <input name="phone" placeholder="Phone" onChange={onChange} />
        <textarea name="summary" placeholder="Summary" onChange={onChange} />
        <textarea name="skills" placeholder="Skills (comma separated)" onChange={onChange} />
        <textarea name="experience" placeholder="Experience" onChange={onChange} />
        <textarea name="education" placeholder="Education" onChange={onChange} />
        <button type="button" onClick={handlePrint}>Download PDF</button>
      </form>

      <div ref={printRef}><Template data={data} /></div>
    </div>
  );
}