import { Link } from "react-router-dom";
import { templates } from "./templates";

export default function Tools() {
  return (
    <div className="grid">
      {templates.map(t => (
        <Link key={t.id} to={`/tools/builder/${t.id}`} className="card">
          <img src={t.preview} alt={t.name} />
          <h3>{t.name}</h3>
        </Link>
      ))}
    </div>
  );
}