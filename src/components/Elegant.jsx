import { Phone, Mail, Globe, MapPin } from "lucide-react";
import "../styles/elegant.css";

/* ---------- helpers: turn the plain text fields into lists ---------- */

// "Title | Company | Dates" on one line, "- bullet" lines below it
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

// "Frontend: React, HTML" -> ["React", "HTML"]
function parseSkills(text = "") {
  return text
    .split("\n")
    .flatMap((l) => {
      const part = l.includes(":") ? l.split(":").slice(1).join(":") : l;
      return part.split(",").map((s) => s.trim()).filter(Boolean);
    })
    .slice(0, 6);
}

function parseList(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  return (value || "").split(/[,\n]/).map((s) => s.trim()).filter(Boolean);
}

function MainSection({ title, children }) {
  return (
    <section className="el-sec">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

/* ---------- template ---------- */
export default function ElegantTemplate({ data = {} }) {
  const {
    name = "", title = "", email, phone, location, linkedin, github,
    summary, skills, experience, projects, education, languages,
  } = data;

  const jobs = parseEntries(experience);
  const projectList = parseEntries(projects);
  const schools = parseEntries(education);
  const skillList = parseSkills(skills);
  const langList = parseList(languages);

  return (
    <div className="el-resume">
      <div className="el-frame" aria-hidden="true" />

      <div className="el-inner">
        {/* ---------- header ---------- */}
        <header className="el-head">
          <h1>{name || "Your Name"}</h1>
          {title && <p className="el-title">{title}</p>}
        </header>

        <div className="el-cols">
          {/* ---------- navy sidebar ---------- */}
          <aside className="el-side">
            {summary && (
              <section className="el-side__sec">
                <h3>About Me</h3>
                <p className="el-side__text">{summary}</p>
              </section>
            )}

            <section className="el-side__sec">
              <h3>Contact</h3>
              <ul className="el-contact">
                {phone && <li><Phone size={13} /><span>{phone}</span></li>}
                {email && <li><Mail size={13} /><span>{email}</span></li>}
                {linkedin && <li><Globe size={13} /><span>{linkedin}</span></li>}
                {github && <li><Globe size={13} /><span>{github}</span></li>}
                {location && <li><MapPin size={13} /><span>{location}</span></li>}
              </ul>
            </section>

            {skillList.length > 0 && (
              <section className="el-side__sec">
                <h3>Skills</h3>
                <ul className="el-bullets">
                  {skillList.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </section>
            )}

            {langList.length > 0 && (
              <section className="el-side__sec">
                <h3>Language</h3>
                <ul className="el-bullets">
                  {langList.map((l, i) => <li key={i}>{l}</li>)}
                </ul>
              </section>
            )}
          </aside>

          {/* ---------- main column ---------- */}
          <div className="el-main">
            {jobs.length > 0 && (
              <MainSection title="Work Experience">
                {jobs.map((j, i) => (
                  <div className="el-entry" key={i}>
                    <div className="el-row">
                      <strong>{j.head[0]}</strong>
                      {j.head[2] && <span className="el-date">{j.head[2]}</span>}
                    </div>
                    {j.head[1] && <p className="el-org">{j.head[1]}</p>}
                    {j.bullets.length > 0 && (
                      <ul className="el-list">
                        {j.bullets.map((b, k) => <li key={k}>{b}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </MainSection>
            )}

            {projectList.length > 0 && (
              <MainSection title="Projects">
                {projectList.map((p, i) => (
                  <div className="el-entry" key={i}>
                    <div className="el-row">
                      <strong>{p.head[0]}</strong>
                      {p.head[2] && <span className="el-date">{p.head[2]}</span>}
                    </div>
                    {p.head[1] && <p className="el-org">{p.head[1]}</p>}
                    {p.bullets.length > 0 && (
                      <ul className="el-list">
                        {p.bullets.map((b, k) => <li key={k}>{b}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </MainSection>
            )}

            {schools.length > 0 && (
              <MainSection title="Education">
                {schools.map((e, i) => (
                  <div className="el-entry" key={i}>
                    <div className="el-row">
                      <strong>{e.head[1] || e.head[0]}</strong>
                      {e.head[2] && <span className="el-date">{e.head[2]}</span>}
                    </div>
                    {e.head[1] && e.head[0] && <p className="el-org">{e.head[0]}</p>}
                  </div>
                ))}
              </MainSection>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}