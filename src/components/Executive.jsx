import "../styles/Executive.css";


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

function Section({ title, children }) {
  return (
    <section className="ex-sec">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function ExecutiveTemplate({ data = {} }) {
  const {
    name = "", title = "", email, phone, location, linkedin, github,
    summary, skills, experience, projects, education, photo, languages,
  } = data;

  const contact = [
    ["Address", location],
    ["Phone", phone],
    ["Email", email],
    ["LinkedIn", linkedin],
    ["GitHub", github],
  ].filter(([, value]) => value);

  const jobs = parseEntries(experience);
  const projectList = parseEntries(projects);
  const schools = parseEntries(education);
  const skillLines = parseLines(skills);
  const langText = Array.isArray(languages) ? languages.join(", ") : (languages || "").trim();

  return (
    <div className="ex-resume">
      <header className="ex-head">
        {photo && (
          <div className="ex-photo">
            <img src={photo} alt="" />
          </div>
        )}

        <div className="ex-head__info">
          <h1>{name || "Your Name"}</h1>
          {title && <p className="ex-title">{title}</p>}
          {contact.length > 0 && (
            <dl className="ex-contact">
              {contact.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}:</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </header>

      {summary && (
        <Section title="Summary">
          <p className="ex-text">{summary}</p>
        </Section>
      )}

      {jobs.length > 0 && (
        <Section title="Work Experience">
          {jobs.map((j, i) => (
            <div className="ex-entry" key={i}>
              <div className="ex-row">
                <strong>{[j.head[0], j.head[1]].filter(Boolean).join(", ")}</strong>
                {j.head[2] && <strong className="ex-date">{j.head[2]}</strong>}
              </div>
              {j.bullets.length > 0 && (
                <ul className="ex-list">
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
            <div className="ex-entry" key={i}>
              <div className="ex-row">
                <strong>{[p.head[0], p.head[1]].filter(Boolean).join(" | ")}</strong>
                {p.head[2] && <strong className="ex-date">{p.head[2]}</strong>}
              </div>
              {p.bullets.length > 0 && (
                <ul className="ex-list">
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
            <div className="ex-entry" key={i}>
              <div className="ex-row">
                <strong>{e.head[0]}</strong>
                {e.head[2] && <strong className="ex-date">{e.head[2]}</strong>}
              </div>
              {e.head[1] && <p className="ex-text">{e.head[1]}</p>}
              {e.bullets.length > 0 && (
                <ul className="ex-list">
                  {e.bullets.map((b, k) => <li key={k}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {(skillLines.length > 0 || langText) && (
        <Section title="Additional Information">
          <ul className="ex-list">
            {skillLines.map((line, i) => {
              const at = line.indexOf(":");
              return at > 0 ? (
                <li key={i}><strong>{line.slice(0, at + 1)}</strong>{line.slice(at + 1)}</li>
              ) : (
                <li key={i}>{line}</li>
              );
            })}
            {langText && <li><strong>Languages:</strong> {langText}</li>}
          </ul>
        </Section>
      )}
    </div>
  );
}