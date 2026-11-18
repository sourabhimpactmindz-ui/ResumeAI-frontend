import { Phone, Mail, MapPin, Globe } from "lucide-react";
import "../styles/student.css";

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

function parseLines(text = "") {
  return text.split("\n").map((l) => l.trim()).filter(Boolean);
}

function parseList(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  return (value || "").split(/[,\n]/).map((s) => s.trim()).filter(Boolean);
}

const initials = (name = "") =>
  name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");

/* small arrow shown before each section title */
function Arrow() {
  return (
    <svg className="st-arrow" width="22" height="14" viewBox="0 0 22 14" aria-hidden="true">
      <path d="M0 0h9l7 7-7 7H0l7-7z" fill="currentColor" />
    </svg>
  );
}

function Heading({ children }) {
  return (
    <h2 className="st-h2">
      <Arrow />
      {children}
    </h2>
  );
}

/* ---------- template ---------- */
export default function StudentTemplate({ data = {} }) {
  const {
    name = "", title = "", email, phone, location, linkedin, github,
    summary, skills, experience, projects, education, photo, languages,
  } = data;

  const [first, ...rest] = (name || "Your Name").split(" ");
  const schools = parseEntries(education);
  const jobs = parseEntries(experience);
  const projectList = parseEntries(projects);
  const skillLines = parseLines(skills);
  const langList = parseList(languages);

  return (
    <div className="st-resume">
      <div className="st-band" aria-hidden="true" />

      <div className="st-gutter" aria-hidden="true" />

      {/* ---------- left teal column ---------- */}
      <aside className="st-side">
        <div className="st-photo">
          {photo ? <img src={photo} alt="" /> : <span>{initials(name) || "YN"}</span>}
        </div>

        {summary && (
          <section className="st-side__sec">
            <h3>Profile</h3>
            <p className="st-side__text">{summary}</p>
          </section>
        )}

        <section className="st-side__sec">
          <h3>Contact me</h3>
          <ul className="st-contact">
            {phone && <li><Phone size={14} /><span>{phone}</span></li>}
            {email && <li><Mail size={14} /><span>{email}</span></li>}
            {location && <li><MapPin size={14} /><span>{location}</span></li>}
            {linkedin && <li><Globe size={14} /><span>{linkedin}</span></li>}
            {github && <li><Globe size={14} /><span>{github}</span></li>}
          </ul>
        </section>
      </aside>

      {/* ---------- right column ---------- */}
      <div className="st-main">
        <header className="st-head">
          <h1>
            {first}
            {rest.length > 0 && <><br />{rest.join(" ")}</>}
          </h1>
          {title && <p className="st-title">{title}</p>}
        </header>

        {schools.length > 0 && (
          <section className="st-sec">
            <Heading>Education</Heading>
            {schools.map((e, i) => (
              <div className="st-item" key={i}>
                {e.head[1] && <p className="st-item__org">{e.head[1]}</p>}
                {e.head[0] && <p className="st-item__text">{e.head[0]}</p>}
                {e.head[2] && <p className="st-item__text">{e.head[2]}</p>}
              </div>
            ))}
          </section>
        )}

        {langList.length > 0 && (
          <section className="st-sec">
            <Heading>Language</Heading>
            {langList.map((l, i) => <p className="st-item__text" key={i}>{l}</p>)}
          </section>
        )}

        {skillLines.length > 0 && (
          <section className="st-sec">
            <Heading>Skills</Heading>
            {skillLines.map((s, i) => <p className="st-item__text" key={i}>{s}</p>)}
          </section>
        )}

        {jobs.length > 0 && (
          <section className="st-sec">
            <Heading>Experience</Heading>
            {jobs.map((j, i) => (
              <div className="st-item" key={i}>
                <p className="st-item__org">{j.head[1] || j.head[0]}</p>
                {j.head[1] && j.head[0] && (
                  <p className="st-item__text">{j.head[0]}{j.head[2] ? `, ${j.head[2]}` : ""}</p>
                )}
                {j.bullets.map((b, k) => <p className="st-item__text st-item__line" key={k}>{b}</p>)}
              </div>
            ))}
          </section>
        )}

        {projectList.length > 0 && (
          <section className="st-sec">
            <Heading>Projects</Heading>
            {projectList.map((p, i) => (
              <div className="st-item" key={i}>
                <p className="st-item__org">{p.head[0]}</p>
                {p.head[1] && <p className="st-item__text">{p.head[1]}</p>}
                {p.bullets.map((b, k) => <p className="st-item__text st-item__line" key={k}>{b}</p>)}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}