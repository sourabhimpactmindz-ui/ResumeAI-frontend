import { Phone, Mail, MapPin, Globe } from "lucide-react";
import "../styles/corporate.css";

function parseEntries(text = "") {
  const entries = [];
  let cur = null;
  text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .forEach((line) => {
      if (/^[-•*]\s*/.test(line)) {
        if (!cur) { cur = { head: [], bullets: [] }; entries.push(cur); }
        cur.bullets.push(line.replace(/^[-•*]\s*/, ""));
      } else {
        cur = { head: line.split("|").map((s) => s.trim()), bullets: [] };
        entries.push(cur);
      }
    });
  return entries;
}

function parseSkills(text = "") {
  return text
    .split("\n")
    .flatMap((l) => {
      const part = l.includes(":") ? l.split(":").slice(1).join(":") : l;
      return part.split(",").map((s) => s.trim()).filter(Boolean);
    })
    .slice(0, 16);
}

function Section({ title, children }) {
  return (
    <section className="cp-sec">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

/* ---------- template ---------- */
export default function CorporateTemplate({ data = {} }) {
  const {
    name = "", title = "", email, phone, location, linkedin, github,
    summary, skills, experience, projects, education,
  } = data;

  const contact = [
    [Phone, phone, true],
    [Mail, email, false],
    [MapPin, location, true],
    [Globe, linkedin, false],
    [Globe, github, false],
  ].filter(([, value]) => value);

  const jobs = parseEntries(experience);
  const projectList = parseEntries(projects);
  const schools = parseEntries(education);
  const skillList = parseSkills(skills);

  return (
    <div className="cp-resume">
      <header className="cp-head">
        <h1>{name || "Your Name"}</h1>
        {title && <p className="cp-title">{title}</p>}
      </header>

      {contact.length > 0 && (
        <ul className="cp-contact">
          {contact.map(([Icon, value, solid], i) => (
            <li key={i}>
              <Icon size={12} fill={solid ? "currentColor" : "none"} strokeWidth={2.2} />
              <span>{value}</span>
            </li>
          ))}
        </ul>
      )}

      {summary && (
        <Section title="Professional Summary">
          <p className="cp-text">{summary}</p>
        </Section>
      )}

      {jobs.length > 0 && (
        <Section title="Professional Experience">
          {jobs.map((j, i) => (
            <div className="cp-entry" key={i}>
              {j.head[1] && <p className="cp-company">{j.head[1]}</p>}
              <p className="cp-role">
                {[j.head[0], j.head[2]].filter(Boolean).join(" | ")}
              </p>
              {j.bullets.length > 0 && (
                <ul className="cp-list">
                  {j.bullets.map((b, k) => <li key={k}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {projectList.length > 0 && (
        <Section title="Projects">
          {projectList.map((p, i) => (
            <div className="cp-entry" key={i}>
              <p className="cp-role">
                {[p.head[0], p.head[1], p.head[2]].filter(Boolean).join(" | ")}
              </p>
              {p.bullets.length > 0 && (
                <ul className="cp-list">
                  {p.bullets.map((b, k) => <li key={k}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {schools.length > 0 && (
        <Section title="Education">
          {schools.map((e, i) => (
            <div className="cp-entry" key={i}>
              {(e.head[1] || e.head[2]) && (
                <p className="cp-school">{[e.head[1], e.head[2]].filter(Boolean).join(" | ")}</p>
              )}
              <p className="cp-role">{e.head[0]}</p>
              {e.bullets.length > 0 && (
                <ul className="cp-list">
                  {e.bullets.map((b, k) => <li key={k}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {skillList.length > 0 && (
        <Section title="Skills">
          <ul className="cp-list">
            <li>{skillList.join("  |  ")}</li>
          </ul>
        </Section>
      )}

      <div className="cp-foot" aria-hidden="true" />
    </div>
  );
}