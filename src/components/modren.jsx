import {
  User, Contact, Settings, Languages, GraduationCap, Briefcase, FolderGit2,
  Phone, Mail, MapPin,
} from "lucide-react";
import "../styles/modren.css";

function Linkedin({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3V9.75zm6.5 0h3.83v1.54h.05c.53-1 1.84-2.04 3.78-2.04 4.04 0 4.79 2.66 4.79 6.1V21h-4v-4.95c0-1.18-.02-2.7-1.65-2.7-1.65 0-1.9 1.29-1.9 2.62V21h-4V9.75z" />
    </svg>
  );
}

function Github({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" />
    </svg>
  );
}


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