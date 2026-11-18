
import "../styles/creative.css";
import { Phone, Mail, MapPin, Globe } from "lucide-react";

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

function Block({ title, children }) {
  return (
    <section className="mn-sec">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

/* ---------- template ---------- */
export default function MinimalTemplate({ data = {} }) {
  const {
    name = "", title = "", email, phone, location, linkedin, github,
    summary, skills, experience, projects, education,
  } = data;

  // first names are light, the last name is bold
  const words = (name || "Your Name").split(" ").filter(Boolean);
  const last = words.length > 1 ? words.pop() : "";
  const first = words.join(" ");

  const contact = [
    [Phone, phone],
    [Mail, email],
    [MapPin, location],
    [Globe, linkedin],
    [Globe, github],
  ].filter(([, value]) => value);

  const schools = parseEntries(education);
  const jobs = parseEntries(experience);
  const projectList = parseEntries(projects);
  const skillLines = parseLines(skills);

  return (
    <div className="mn-resume">
      {/* ---------- gray header ---------- */}
      <header className="mn-head">
        <div className="mn-head__name">
          <h1>
            <span>{first}</span>
            {last && <strong> {last}</strong>}
          </h1>
          {title && <p className="mn-title">{title}</p>}
        </div>

        <ul className="mn-contact">
          {contact.map(([Icon, value], i) => (
            <li key={i}>
              <span>{value}</span>
              <i><Icon size={11} /></i>
            </li>
          ))}
        </ul>
      </header>
      <div className="mn-bar" />

      {summary && (
        <section className="mn-summary">
          <h2>Summary</h2>
          <p>{summary}</p>
        </section>
      )}

      {/* ---------- two columns ---------- */}
      <div className="mn-cols">
        <div className="mn-left">
          {schools.length > 0 && (
            <Block title="Education">
              {schools.map((e, i) => (
                <div className="mn-item" key={i}>
                  <p className="mn-item__title">{e.head[1] || e.head[0]}</p>
                  {e.head[1] && e.head[0] && <p className="mn-item__meta">{e.head[0]}</p>}
                  {e.head[2] && <p className="mn-item__meta">{e.head[2]}</p>}
                </div>
              ))}
            </Block>
          )}

          {skillLines.length > 0 && (
            <Block title="Skills">
              <ul className="mn-list">
                {skillLines.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </Block>
          )}

          {projectList.length > 0 && (
            <Block title="Projects">
              {projectList.map((p, i) => (
                <div className="mn-item" key={i}>
                  <p className="mn-item__title">{p.head[0]}</p>
                  {(p.head[1] || p.head[2]) && (
                    <p className="mn-item__meta">{[p.head[1], p.head[2]].filter(Boolean).join(" | ")}</p>
                  )}
                  {p.bullets.length > 0 && (
                    <ul className="mn-list">
                      {p.bullets.map((b, k) => <li key={k}>{b}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </Block>
          )}
        </div>

        <div className="mn-divider" aria-hidden="true" />

        <div className="mn-right">
          {jobs.length > 0 && (
            <Block title="Professional Experience">
              {jobs.map((j, i) => (
                <div className="mn-item" key={i}>
                  <p className="mn-item__title">{j.head[0]}</p>
                  {(j.head[1] || j.head[2]) && (
                    <p className="mn-item__meta">{[j.head[1], j.head[2]].filter(Boolean).join(" | ")}</p>
                  )}
                  {j.bullets.length > 0 && (
                    <ul className="mn-list mn-list--gap">
                      {j.bullets.map((b, k) => <li key={k}>{b}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </Block>
          )}
        </div>
      </div>
    </div>
  );
}