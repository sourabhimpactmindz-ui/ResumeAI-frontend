const ensureUrl = (u) => (/^https?:\/\//i.test(u) ? u : `https://${u}`);
const shortUrl = (u) => u.replace(/^https?:\/\/(www\.)?/i, "").replace(/\/$/, "");
const stripBullet = (l) => l.replace(/^\s*[-•*▪]\s*/, "").trim();

// "Role | Company, City | Jan 2022 – Present" + bullets, entries khali line se alag
function parseBlocks(text) {
  return (text || "")
    .split(/\n\s*\n/)
    .map((b) => b.split("\n").map((l) => l.trim()).filter(Boolean))
    .filter((b) => b.length)
    .map(([head, ...rest]) => ({
      parts: head.split("|").map((p) => p.trim()).filter(Boolean),
      bullets: rest.map(stripBullet).filter(Boolean),
    }));
}

function Entry({ parts, bullets }) {
  const left = parts[0] || "";
  const right = parts.length >= 2 ? parts[parts.length - 1] : "";
  const sub = parts.length >= 3 ? parts.slice(1, -1).join(", ") : "";
  return (
    <div className="rc-entry">
      <div className="rc-row">
        <strong>{left}</strong>
        {right && <span>{right}</span>}
      </div>
      {sub && <div className="rc-sub">{sub}</div>}
      {bullets.length > 0 && (
        <ul>
          {bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function Classic({ data }) {
  const contact = [
    data.email && <a href={`mailto:${data.email}`}>{data.email}</a>,
    data.phone,
    data.location,
    data.linkedin && <a href={ensureUrl(data.linkedin)}>{shortUrl(data.linkedin)}</a>,
    data.github && <a href={ensureUrl(data.github)}>{shortUrl(data.github)}</a>,
  ].filter(Boolean);

  const skillLines = (data.skills || "").split("\n").map((l) => l.trim()).filter(Boolean);
  const experience = parseBlocks(data.experience);
  const projects = parseBlocks(data.projects);
  const education = parseBlocks(data.education);

  return (
    <div className="rc">
      <style>{css}</style>

      <header>
        <h1>{data.name || "Your Name"}</h1>
        {data.title && <div className="rc-title">{data.title}</div>}
        {contact.length > 0 && (
          <div className="rc-contact">
            {contact.map((c, i) => (
              <span key={i}>{i > 0 && "  |  "}{c}</span>
            ))}
          </div>
        )}
      </header>

      {data.summary && (
        <Section title="Professional Summary">
          <p>{data.summary}</p>
        </Section>
      )}

      {skillLines.length > 0 && (
        <Section title="Skills">
          {skillLines.map((l, i) => {
            const idx = l.indexOf(":");
            return idx > 0 ? (
              <p key={i}><strong>{l.slice(0, idx + 1)}</strong>{l.slice(idx + 1)}</p>
            ) : (
              <p key={i}>{l}</p>
            );
          })}
        </Section>
      )}

      {experience.length > 0 && (
        <Section title="Work Experience">
          {experience.map((e, i) => <Entry key={i} {...e} />)}
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Projects">
          {projects.map((e, i) => <Entry key={i} {...e} />)}
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education">
          {education.map((e, i) => <Entry key={i} {...e} />)}
        </Section>
      )}
    </div>
  );
}

const css = `
.rc{width:794px;min-height:1123px;box-sizing:border-box;padding:48px 56px;background:#fff;color:#111;
  font-family:Calibri,Arial,Helvetica,sans-serif;font-size:13.5px;line-height:1.45;text-align:left}
.rc h1{margin:0;font-size:30px;font-weight:700;letter-spacing:.5px;text-align:center}
.rc .rc-title{text-align:center;font-size:15px;color:#333;margin-top:2px}
.rc .rc-contact{text-align:center;font-size:12.5px;color:#333;margin-top:8px}
.rc a{color:inherit;text-decoration:none}
.rc h2{margin:18px 0 8px;padding-bottom:3px;font-size:13px;font-weight:700;letter-spacing:1.2px;
  text-transform:uppercase;border-bottom:1px solid #111;break-after:avoid}
.rc p{margin:0 0 4px}
.rc .rc-entry{margin-bottom:10px;break-inside:avoid}
.rc .rc-row{display:flex;justify-content:space-between;gap:16px}
.rc .rc-row span{white-space:nowrap;color:#333}
.rc .rc-sub{font-style:italic;color:#333}
.rc ul{margin:4px 0 0;padding-left:18px}
.rc li{margin-bottom:2px}
@media print{.rc{width:auto;min-height:0;padding:0}}
`;