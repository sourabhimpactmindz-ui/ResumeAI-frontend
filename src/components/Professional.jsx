import "../styles/professional.css";


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

function Section({ label, children }) {
  return (
    <section className="pf-sec">
      <h2 className="pf-label">{label}</h2>
      <div className="pf-body">{children}</div>
    </section>
  );
}

export default function ProfessionalTemplate({ data = {} }) {
  const {
    name = "", title = "", email, phone, location, linkedin, github,
    summary, skills, experience, projects, education,
  } = data;

  const contact = [email, phone, location].filter(Boolean).join("  |  ");
  const links = [linkedin, github].filter(Boolean).join("  |  ");
  const jobs = parseEntries(experience);
  const projectList = parseEntries(projects);
  const schools = parseEntries(education);
  const skillList = parseSkills(skills);

  return (
    <div className="pf-resume">
      <header className="pf-head">
        <h1>{name || "Your Name"}</h1>
        {title && <p className="pf-title">{title}</p>}
        {contact && <p className="pf-contact">{contact}</p>}
        {links && <p className="pf-contact">{links}</p>}
      </header>

      {summary && (
        <Section label="Summary">
          <p className="pf-text">{summary}</p>
        </Section>
      )}

      {jobs.length > 0 && (
        <Section label="Work Experience">
          {jobs.map((j, i) => (
            <div className="pf-entry" key={i}>
              <div className="pf-row">
                <strong>{[j.head[0], j.head[1]].filter(Boolean).join(", ")}</strong>
                {j.head[2] && <span className="pf-date">{j.head[2]}</span>}
              </div>
              {j.bullets.length > 0 && (
                <ul className="pf-list">
                  {j.bullets.map((b, k) => <li key={k}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {projectList.length > 0 && (
        <Section label="Projects">
          {projectList.map((p, i) => (
            <div className="pf-entry" key={i}>
              <div className="pf-row">
                <strong>{p.head[0]}</strong>
                {p.head[2] && <span className="pf-date">{p.head[2]}</span>}
              </div>
              {p.head[1] && <p className="pf-text">{p.head[1]}</p>}
              {p.bullets.length > 0 && (
                <ul className="pf-list">
                  {p.bullets.map((b, k) => <li key={k}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {schools.length > 0 && (
        <Section label="Education">
          {schools.map((e, i) => (
            <div className="pf-entry" key={i}>
              <div className="pf-row">
                <strong>{e.head[0]}</strong>
                {e.head[2] && <span className="pf-date">{e.head[2]}</span>}
              </div>
              {e.head[1] && <p className="pf-text">{e.head[1]}</p>}
              {e.bullets.length > 0 && (
                <ul className="pf-list">
                  {e.bullets.map((b, k) => <li key={k}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {skillList.length > 0 && (
        <Section label="Key Skills">
          <ul className="pf-list pf-skills">
            {skillList.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </Section>
      )}
    </div>
  );
}