import { MapPin, Phone, Globe, Mail, MessageCircle } from "lucide-react";
import "../styles/creative.css";

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

function parseSkillBars(text = "") {
  return text
    .split("\n")
    .flatMap((line) => {
      const hasLabel = line.includes(":") && !/^[^:]*\(\d/.test(line);
      const part = hasLabel ? line.split(":").slice(1).join(":") : line;
      return part.split(",").map((s) => s.trim()).filter(Boolean);
    })
    .map((item) => {
      const m = item.match(/^(.*?)\s*\((\d{1,3})\s*%?\)$/);
      return m
        ? { name: m[1], level: Math.min(100, Number(m[2])) }
        : { name: item, level: 85 };
    })
    .slice(0, 5);
}

function parseList(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  return (value || "").split(/[,\n]/).map((s) => s.trim()).filter(Boolean);
}

const initials = (name = "") =>
  name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");

function Sparkle({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C12.8 7 17 11.2 24 12C17 12.8 12.8 17 12 24C11.2 17 7 12.8 0 12C7 11.2 11.2 7 12 0Z" fill="currentColor" />
    </svg>
  );
}

function Block({ title, children }) {
  return (
    <section className="cr-sec">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function CreativeTemplate({ data = {} }) {
  const {
    name = "", title = "", email, phone, location, linkedin, github,
    summary, skills, experience, education, photo, languages,
  } = data;

  const schools = parseEntries(education);
  const jobs = parseEntries(experience);
  const skillBars = parseSkillBars(skills);
  const langList = parseList(languages);
  const handle = linkedin || github || "";

  return (
    <div className="cr-resume">
      <header className="cr-top">
        <div className="cr-photo">
          <div className="cr-photo__img">
            {photo ? <img src={photo} alt="" /> : <span>{initials(name) || "YN"}</span>}
          </div>
        </div>

        <div className="cr-intro">
          <h1>
            Hello! I'm
            <br />
            <span>{name || "Your Name"}</span>
          </h1>
          {title && <p className="cr-pill">{title}</p>}
          {summary && <p className="cr-summary">{summary}</p>}
        </div>

        <Sparkle className="cr-star cr-star--top" />
      </header>
      <Sparkle className="cr-star cr-star--mid" />

      <div className="cr-body">
        <aside className="cr-left">
          <h3>Contact</h3>
          <ul className="cr-contact">
            {location && <li><i><MapPin size={12} /></i><span>{location}</span></li>}
            {phone && <li><i><Phone size={12} /></i><span>{phone}</span></li>}
            {linkedin && <li><i><Globe size={12} /></i><span>{linkedin}</span></li>}
            {github && <li><i><Globe size={12} /></i><span>{github}</span></li>}
            {email && <li><i><Mail size={12} /></i><span>{email}</span></li>}
          </ul>

          {skillBars.length > 0 && (
            <>
              <h3 className="cr-left__gap">Skill</h3>
              <ul className="cr-skills">
                {skillBars.map((s, i) => (
                  <li key={i}>
                    <span>{s.name}</span>
                    <div className="cr-bar"><b style={{ width: `${s.level}%` }} /></div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </aside>

        <main className="cr-main">
          {schools.length > 0 && (
            <Block title="Education">
              {schools.map((e, i) => (
                <div className="cr-item" key={i}>
                  <p className="cr-item__org">{e.head[1] || e.head[0]}</p>
                  {e.head[1] && e.head[0] && <p>{e.head[0]}</p>}
                  {e.head[2] && <p>{e.head[2]}</p>}
                </div>
              ))}
            </Block>
          )}

          {langList.length > 0 && (
            <Block title="Languages">
              {langList.map((l, i) => {
                const [lang, level] = l.split(/\s+-\s+/);
                return (
                  <p key={i}>
                    <strong>{lang}{level ? " -" : ""}</strong>{level ? ` ${level}` : ""}
                  </p>
                );
              })}
            </Block>
          )}

          {jobs.length > 0 && (
            <Block title="Experience">
              {jobs.map((j, i) => (
                <div className="cr-item" key={i}>
                  <p className="cr-item__org">{j.head[1] || j.head[0]}</p>
                  {j.head[1] && j.head[0] && <p>{j.head[0]}</p>}
                  {j.head[2] && <p>{j.head[2]}</p>}
                  {j.bullets.map((b, k) => <p className="cr-item__line" key={k}>{b}</p>)}
                </div>
              ))}
            </Block>
          )}
        </main>
      </div>

      <footer className="cr-foot">
        <MessageCircle size={14} />
        {handle && <span>{handle}</span>}
      </footer>
    </div>
  );
}