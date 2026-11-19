import {
  User, Lightbulb, Languages, GraduationCap, Briefcase, Phone, Mail, MapPin, Globe,
} from "lucide-react";
import "../styles/azure.css";

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
    .slice(0, 5);
}

function parseList(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  return (value || "").split(/[,\n]/).map((s) => s.trim()).filter(Boolean);
}

const initials = (name = "") =>
  name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");

function Heading({ icon, children }) {
  return (
    <h2 className="az-h">
      <span className="az-h__ic">{icon}</span>
      {children}
    </h2>
  );
}

export default function AzureTemplate({ data = {} }) {
  const {
    name = "", title = "", email, phone, location, linkedin, github,
    summary, skills, experience, education, photo, languages,
  } = data;

  const [first, ...rest] = (name || "Your Name").split(" ");
  const schools = parseEntries(education);
  const jobs = parseEntries(experience);
  const skillList = parseSkills(skills);
  const langList = parseList(languages);

  const contact = [
    [Phone, phone],
    [Mail, email],
    [MapPin, location],
    [Globe, linkedin],
    [Globe, github],
  ].filter(([, value]) => value);

  return (
    <div className="az-resume">
      <i className="az-deco az-deco--line" aria-hidden="true" />
      <i className="az-deco az-deco--blue-top" aria-hidden="true" />
      <i className="az-deco az-deco--navy-top" aria-hidden="true" />
      <i className="az-deco az-deco--wash" aria-hidden="true" />
      <i className="az-deco az-deco--blue-bottom" aria-hidden="true" />
      <i className="az-deco az-deco--navy-bottom" aria-hidden="true" />

      <div className="az-band" aria-hidden="true" />
      <div className="az-photo">
        {photo ? <img src={photo} alt="" /> : <span>{initials(name) || "YN"}</span>}
      </div>
      <header className="az-head">
        <h1>
          {first}
          {rest.length > 0 && <><br />{rest.join(" ")}</>}
        </h1>
        {title && <p className="az-title">{title}</p>}
      </header>

      <div className="az-body">
        <div className="az-left">
          {summary && (
            <section className="az-sec">
              <Heading icon={<User size={21} fill="currentColor" />}>About Me</Heading>
              <p className="az-about">{summary}</p>
            </section>
          )}

          {contact.length > 0 && (
            <section className="az-sec">
              <Heading icon={<span className="az-icon"><User size={13} fill="currentColor" /></span>}>Contact</Heading>
              <ul className="az-contact">
                {contact.map(([Icon, value], i) => (
                  <li key={i}><Icon size={13} fill="currentColor" strokeWidth={2.2} /><span>{value}</span></li>
                ))}
              </ul>
            </section>
          )}

          {skillList.length > 0 && (
            <section className="az-sec">
              <Heading icon={<Lightbulb size={21} />}>Skills</Heading>
              <ul className="az-bullets">
                {skillList.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </section>
          )}

          {langList.length > 0 && (
            <section className="az-sec">
              <Heading icon={<span className="az-icon"><Languages size={14} /></span>}>Language</Heading>
              <ul className="az-bullets">
                {langList.map((l, i) => <li key={i}>{l}</li>)}
              </ul>
            </section>
          )}
        </div>

        <div className="az-right">
          {schools.length > 0 && (
            <section className="az-sec">
              <Heading icon={<GraduationCap size={23} fill="currentColor" />}>Education</Heading>
              {schools.map((e, i) => (
                <div className="az-entry" key={i}>
                  {e.head[2] && <p className="az-entry__date">({e.head[2]})</p>}
                  {e.head[1] && <p className="az-entry__org">{e.head[1]}</p>}
                  {e.head[0] && <p className="az-entry__text">{e.head[0]}</p>}
                </div>
              ))}
            </section>
          )}

          {jobs.length > 0 && (
            <section className="az-sec">
              <Heading icon={<Briefcase size={21} />}>Experience</Heading>
              {jobs.map((j, i) => (
                <div className="az-entry" key={i}>
                  {j.head[2] && <p className="az-entry__date">({j.head[2]})</p>}
                  {j.head[0] && <p className="az-entry__org">{j.head[0]}</p>}
                  {j.head[1] && <p className="az-entry__text">{j.head[1]}</p>}
                  {j.bullets.length > 0 && (
                    <ul className="az-list">
                      {j.bullets.map((b, k) => <li key={k}>{b}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}