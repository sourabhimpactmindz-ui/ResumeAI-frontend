import { Phone, Mail, MapPin, Globe } from "lucide-react";
import "../styles/warm.css";

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
    .slice(0, 8);
}

function parseList(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  return (value || "").split(/[,\n]/).map((s) => s.trim()).filter(Boolean);
}

const initials = (name = "") =>
  name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");

// "English - Native" -> dots. Without a level, only the language name is shown.
const LEVELS = [
  [/native|mother|fluent|bilingual/i, 5],
  [/advanced|proficient|full/i, 4],
  [/intermediate|conversational|working/i, 3],
  [/beginner|basic|elementary|limited/i, 2],
];
function parseLanguage(text) {
  const [lang, level] = text.split(/\s+-\s+/);
  const found = level ? LEVELS.find(([re]) => re.test(level)) : null;
  return { lang, level, dots: found ? found[1] : 0 };
}

function Heading({ children }) {
  return <h2 className="wm-h">{children}</h2>;
}

/* ---------- template ---------- */
export default function WarmTemplate({ data = {} }) {
  const {
    name = "", title = "", email, phone, location, linkedin, github,
    summary, skills, experience, projects, education, photo, languages,
  } = data;

  const [first, ...rest] = (name || "Your Name").split(" ");
  const schools = parseEntries(education);
  const jobs = parseEntries(experience);
  const projectList = parseEntries(projects);
  const skillList = parseSkills(skills);
  const langList = parseList(languages).map(parseLanguage);

  const contact = [
    [MapPin, location],
    [Phone, phone],
    [Mail, email],
    [Globe, linkedin],
    [Globe, github],
  ].filter(([, value]) => value);

  return (
    <div className="wm-resume">
      {/* ---------- left beige column ---------- */}
      <aside className="wm-side">
        <div className="wm-photo">
          {photo ? <img src={photo} alt="" /> : <span>{initials(name) || "YN"}</span>}
        </div>

        {contact.length > 0 && (
          <section className="wm-side__sec">
            <Heading>Contact</Heading>
            <ul className="wm-contact">
              {contact.map(([Icon, value], i) => (
                <li key={i}>
                  <i><Icon size={10} /></i>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {schools.length > 0 && (
          <section className="wm-side__sec">
            <Heading>Education</Heading>
            {schools.map((e, i) => (
              <div className="wm-edu" key={i}>
                <p className="wm-edu__title">{e.head[0]}</p>
                {e.head[1] && <p>{e.head[1]}</p>}
                {e.head[2] && <p>{e.head[2]}</p>}
              </div>
            ))}
          </section>
        )}

        {skillList.length > 0 && (
          <section className="wm-side__sec">
            <Heading>Skills</Heading>
            <ul className="wm-bullets">
              {skillList.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </section>
        )}
      </aside>

      {/* ---------- right column ---------- */}
      <div className="wm-main">
        <header className="wm-head">
          <h1>
            {first}
            {rest.length > 0 && <><br />{rest.join(" ")}</>}
          </h1>
          {title && <p className="wm-title">{title}</p>}
        </header>

        {summary && (
          <section className="wm-sec">
            <Heading>Profile</Heading>
            <p className="wm-text">{summary}</p>
          </section>
        )}

        {jobs.length > 0 && (
          <section className="wm-sec">
            <Heading>Experience</Heading>
            {jobs.map((j, i) => (
              <div className="wm-item" key={i}>
                <p className="wm-item__title">{j.head[0]}</p>
                {j.head[1] && <p className="wm-text">{j.head[1]}</p>}
                {j.head[2] && <p className="wm-text">{j.head[2]}</p>}
                {j.bullets.length > 0 && (
                  <ul className="wm-list">
                    {j.bullets.map((b, k) => <li key={k}>{b}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {projectList.length > 0 && (
          <section className="wm-sec">
            <Heading>Projects</Heading>
            {projectList.map((p, i) => (
              <div className="wm-item" key={i}>
                <p className="wm-item__title">{p.head[0]}</p>
                {(p.head[1] || p.head[2]) && (
                  <p className="wm-text">{[p.head[1], p.head[2]].filter(Boolean).join(" | ")}</p>
                )}
                {p.bullets.length > 0 && (
                  <ul className="wm-list">
                    {p.bullets.map((b, k) => <li key={k}>{b}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {langList.length > 0 && (
          <section className="wm-sec">
            <Heading>Languages</Heading>
            <ul className="wm-langs">
              {langList.map((l, i) => (
                <li key={i}>
                  <span>{l.lang}</span>
                  {l.dots > 0 ? (
                    <>
                      <span className="wm-dots" aria-hidden="true">
                        {[1, 2, 3, 4, 5].map((n) => <b key={n} className={n <= l.dots ? "on" : ""} />)}
                      </span>
                      <span className="wm-langs__level">{l.level}</span>
                    </>
                  ) : (
                    <span className="wm-langs__level wm-langs__level--wide">{l.level || ""}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* small leaf decoration, bottom right */}
        <svg className="wm-leaf" viewBox="0 0 80 110" aria-hidden="true">
          <path d="M40 108 C42 80 46 50 62 10" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M44 74 C58 70 66 58 66 46 C54 50 46 60 44 74Z" fill="currentColor" />
          <path d="M45 58 C32 56 24 46 24 34 C36 36 44 46 45 58Z" fill="currentColor" />
          <path d="M52 38 C64 34 70 24 70 14 C60 18 54 26 52 38Z" fill="currentColor" />
          <path d="M43 86 C30 86 20 78 18 66 C30 66 40 74 43 86Z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}