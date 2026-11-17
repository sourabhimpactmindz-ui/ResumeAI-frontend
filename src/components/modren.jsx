import {
  User, Contact, Settings, Languages, GraduationCap, Briefcase, FolderGit2,
  Phone, Mail, MapPin, Linkedin, Github,
} from "lucide-react";
import "../styles/modren.css";


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
    .slice(0, 10);
}

function parseList(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  return (value || "").split(/[,\n]/).map((s) => s.trim()).filter(Boolean);
}

const initials = (name = "") =>
  name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");

/* ---------- template ---------- */
export default function ModernTemplate({ data = {} }) {
  const {
    name = "", title = "", email, phone, location, linkedin, github,
    summary, skills, experience, projects, education, photo, languages,
  } = data;

  const [first, ...rest] = (name || "Your Name").split(" ");
  const skillList = parseSkills(skills);
  const langList = parseList(languages);
  const jobs = parseEntries(experience);
  const projectList = parseEntries(projects);
  const schools = parseEntries(education);

  return (
    <div className="mt-resume">
      {/* ---------- left sidebar ---------- */}
      <aside className="mt-side">
        <div className="mt-photo">
          {photo ? <img src={photo} alt="" /> : <span>{initials(name) || "YN"}</span>}
        </div>

        {summary && (
          <section className="mt-side__sec">
            <h3><User size={16} /> About Me</h3>
            <p className="mt-side__text">{summary}</p>
          </section>
        )}

        <section className="mt-side__sec">
          <h3><Contact size={16} /> Contact</h3>
          <ul className="mt-contact">
            {phone && <li><Phone size={13} /> <span>{phone}</span></li>}
            {email && <li><Mail size={13} /> <span>{email}</span></li>}
            {location && <li><MapPin size={13} /> <span>{location}</span></li>}
            {linkedin && <li><Linkedin size={13} /> <span>{linkedin}</span></li>}
            {github && <li><Github size={13} /> <span>{github}</span></li>}
          </ul>
        </section>

        {skillList.length > 0 && (
          <section className="mt-side__sec">
            <h3><Settings size={16} /> Skills</h3>
            <ul className="mt-bullets">
              {skillList.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </section>
        )}

        {langList.length > 0 && (
          <section className="mt-side__sec">
            <h3><Languages size={16} /> Language</h3>
            <ul className="mt-bullets">
              {langList.map((l) => <li key={l}>{l}</li>)}
            </ul>
          </section>
        )}
      </aside>

      {/* ---------- main column ---------- */}
      <main className="mt-main">
        <div className="mt-deco" aria-hidden="true">
          <i className="mt-deco__bar mt-deco__bar--1" />
          <i className="mt-deco__bar mt-deco__bar--2" />
          <i className="mt-deco__bar mt-deco__bar--3" />
          <i className="mt-deco__ring" />
          <i className="mt-deco__dot" />
        </div>

        <header className="mt-head">
          <h1>
            {first}
            {rest.length > 0 && <><br />{rest.join(" ")}</>}
          </h1>
          {title && <p className="mt-title">{title}</p>}
        </header>

        {schools.length > 0 && (
          <section className="mt-sec">
            <h2><GraduationCap size={18} /> Education</h2>
            {schools.map((e, i) => (
              <div className="mt-entry" key={i}>
                {e.head[2] && <p className="mt-entry__date">({e.head[2]})</p>}
                {e.head[1] && <p className="mt-entry__org">{e.head[1]}</p>}
                {e.head[0] && <p className="mt-entry__role">{e.head[0]}</p>}
              </div>
            ))}
          </section>
        )}

        {jobs.length > 0 && (
          <section className="mt-sec">
            <h2><Briefcase size={18} /> Work Experience</h2>
            {jobs.map((j, i) => (
              <div className="mt-entry" key={i}>
                {j.head[2] && <p className="mt-entry__date">({j.head[2]})</p>}
                {j.head[0] && <p className="mt-entry__org">{j.head[0]}</p>}
                {j.head[1] && <p className="mt-entry__role">{j.head[1]}</p>}
                {j.bullets.length > 0 && (
                  <ul className="mt-entry__list">
                    {j.bullets.map((b, k) => <li key={k}>{b}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {projectList.length > 0 && (
          <section className="mt-sec">
            <h2><FolderGit2 size={18} /> Projects</h2>
            {projectList.map((p, i) => (
              <div className="mt-entry" key={i}>
                {p.head[2] && <p className="mt-entry__date">{p.head[2]}</p>}
                {p.head[0] && <p className="mt-entry__org">{p.head[0]}</p>}
                {p.head[1] && <p className="mt-entry__role">{p.head[1]}</p>}
                {p.bullets.length > 0 && (
                  <ul className="mt-entry__list">
                    {p.bullets.map((b, k) => <li key={k}>{b}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}