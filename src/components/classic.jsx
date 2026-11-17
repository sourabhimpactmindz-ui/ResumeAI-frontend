const Section = ({ title, children }) => (
  <section style={{ marginBottom: 22 }}>
    <h3 style={{
      margin: "0 0 8px", fontSize: 14, letterSpacing: 1.5, textTransform: "uppercase",
      borderBottom: "1.5px solid #111", paddingBottom: 4,
    }}>{title}</h3>
    {children}
  </section>
);

export default function Classic({ data }) {
  const skills = (data.skills || "").split(",").map(s => s.trim()).filter(Boolean);
  const contact = [data.email, data.phone, data.location].filter(Boolean).join("  |  ");
  const lines = txt => (txt || "").split("\n").filter(l => l.trim());

  return (
    <div style={{
      width: 794, minHeight: 1123, boxSizing: "border-box", padding: "48px 56px",
      background: "#fff", color: "#111", fontFamily: "Georgia, 'Times New Roman', serif",
      fontSize: 14, lineHeight: 1.55,
    }}>
      <header style={{ textAlign: "center", marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 34, letterSpacing: 1 }}>{data.name || "Your Name"}</h1>
        {data.title && <div style={{ fontSize: 16, color: "#444", marginTop: 4 }}>{data.title}</div>}
        {contact && <div style={{ fontSize: 13, color: "#555", marginTop: 8 }}>{contact}</div>}
      </header>

      {data.summary && (
        <Section title="Summary"><p style={{ margin: 0 }}>{data.summary}</p></Section>
      )}

      {skills.length > 0 && (
        <Section title="Skills">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {skills.map(s => (
              <span key={s} style={{ border: "1px solid #999", borderRadius: 4, padding: "2px 10px", fontSize: 13 }}>{s}</span>
            ))}
          </div>
        </Section>
      )}

      {lines(data.experience).length > 0 && (
        <Section title="Experience">
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {lines(data.experience).map((l, i) => <li key={i}>{l}</li>)}
          </ul>
        </Section>
      )}

      {lines(data.education).length > 0 && (
        <Section title="Education">
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {lines(data.education).map((l, i) => <li key={i}>{l}</li>)}
          </ul>
        </Section>
      )}
    </div>
  );
}