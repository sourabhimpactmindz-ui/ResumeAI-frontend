export default function Classic({ data }) {
  return (
    <div style={{ width: 794, padding: 40, background: "#fff", color: "#000", fontFamily: "serif" }}>
      <h1>{data.name || "Your Name"}</h1>
      <p>{data.email} | {data.phone}</p>
      <hr />
      <h3>Summary</h3><p>{data.summary}</p>
      <h3>Skills</h3><p>{data.skills}</p>
      <h3>Experience</h3><p style={{ whiteSpace: "pre-line" }}>{data.experience}</p>
      <h3>Education</h3><p style={{ whiteSpace: "pre-line" }}>{data.education}</p>
    </div>
  );
}