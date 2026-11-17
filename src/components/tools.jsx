import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
// import { templates } from "./templates";
import { templates } from "../services/templates";
// import { sampleData } from "./sampleData";
import { sampleData } from "../services/simplerData";
// import ScaledPreview from "./ScaledPreview";
import ScaledPreview from "./ScaledPreview";
import "../styles/tools.css";

export default function Tools() {
  return (
    <div className="tl-page">
      <Navbar />

      <header className="tl-hero">
        <p className="tl-hand">Step 1 of 2</p>
        <h1>Choose a template</h1>
        <p className="tl-hero__sub">
          Pick a clean layout. You can fill in your details on the next page.
        </p>
      </header>

      <main className="tl-main">
        <div className="tl-grid">
          {templates.map((t) => {
            const Template = t.component;
            // templates without photo support never get a photo in the preview
            const data = t.supportsPhoto ? sampleData : { ...sampleData, photo: "" };

            return (
              <Link key={t.id} to={`/tools/builder/${t.id}`} className="tl-card">
                <ScaledPreview className="tl-preview">
                  <Template data={data} />
                </ScaledPreview>

                <div className="tl-card__foot">
                  <h3>{t.name}</h3>
                  {t.supportsPhoto && <span className="tl-badge">Photo supported</span>}
                  <span className="tl-card__use">
                    Use this template <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}