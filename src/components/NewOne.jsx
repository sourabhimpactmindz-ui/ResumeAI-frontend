import "../styles/newone.css";


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

function parseSkillGroups(text = "") {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const hasLabel = line.includes(":");
      const label = hasLabel ? line.split(":")[0].trim() : "";
      const rest = hasLabel ? line.split(":").slice(1).join(":") : line;
      return { label, items: rest.split(",").map((s) => s.trim()).filter(Boolean) };
    })
    .filter((g) => g.items.length);
}

function parseList(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  return (value || "").split(/[,\n]/).map((s) => s.trim()).filter(Boolean);
}

function Section({ title, children }) {
  return (
    <section className="cl-sec">
      <h2 className="cl-bar">{title}</h2>
      <div className="cl-sec__body">{children}</div>
    </section>
  );
}

export default function ClassicTemplate({ data = {} }) {
  const {
    name = "", title = "", email, phone, location, linkedin, github,
    summary, skills, experience, education, awards, languages,
  } = data;

  const jobs = parseEntries(experience);
  const schools = parseEntries(education);
  const awardList = parseEntries(awards);
  const skillGroups = parseSkillGroups(skills);
  const langList = parseList(languages);
  const contact = [phone, email, location, linkedin, github].filter(Boolean);

  return (
    <div className="cl-resume">
      <header className="cl-head">
        <div className="cl-head__left">
          <h1>{name || "Your Name"}</h1>
          {title && <p className="cl-title">{title}</p>}
        </div>
        {contact.length > 0 && (
          <ul className="cl-contact">
            {contact.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        )}
      </header>

      {summary && <p className="cl-summary">{summary}</p>}

      {jobs.length > 0 && (
        <Section title="Work Experience">
          {jobs.map((j, i) => (
            <div className="cl-item" key={i}>
              <div className="cl-row">
                <p className="cl-strong">
                  {j.head[0]}
                  {j.head[1] && <> — {j.head[1]}</>}
                </p>
                {j.head[2] && <p className="cl-date">{j.head[2]}</p>}
              </div>
              {j.bullets.length > 0 && (
                <ul className="cl-list">
                  {j.bullets.map((b, k) => <li key={k}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {schools.length > 0 && (
        <Section title="Education">
          {schools.map((e, i) => (
            <div className="cl-item" key={i}>
              <div className="cl-row">
                <p className="cl-strong">{e.head[0]}</p>
                {e.head[2] && <p className="cl-date">{e.head[2]}</p>}
              </div>
              {e.head[1] && <p className="cl-sub">{e.head[1]}</p>}
            </div>
          ))}
        </Section>
      )}

      {skillGroups.length > 0 && (
        <Section title="Skills">
          <div className="cl-skills">
            {skillGroups.map((g, i) => (
              <div className="cl-skillgroup" key={i}>
                {g.label && <p className="cl-strong">{g.label}</p>}
                <ul className="cl-list">
                  {g.items.map((s, k) => <li key={k}>{s}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      )}

      {awardList.length > 0 && (
        <Section title="Awards & Recognition">
          {awardList.map((a, i) => (
            <div className="cl-item" key={i}>
              <div className="cl-row">
                <p className="cl-strong">{a.head[0]}</p>
                {a.head[1] && <p className="cl-date">{a.head[1]}</p>}
              </div>
              {a.bullets.map((b, k) => <p className="cl-sub" key={k}>{b}</p>)}
            </div>
          ))}
        </Section>
      )}

      {langList.length > 0 && (
        <Section title="Languages">
          <p className="cl-sub">{langList.join("  •  ")}</p>
        </Section>
      )}
    </div>
  );
}