import { useEffect, useState } from "react";
import { CheckCircle2, AlertTriangle, Zap, Bot } from "lucide-react";
import "../styles/AnalysisPanel.css";
import Badge from "./Badge";

const DURATION = 1500; 

export default function AnalysisPanel({
  atsScore = 0,
  matchingSkills = [],
  missingSkills = [],
  strengths = [],
  aiSuggestions = [],
}) {
  const [animatedScore, setAnimatedScore] = useState(0); 
  const [ready, setReady] = useState(false); 

  useEffect(() => {
    setReady(false);
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setReady(true))
    );
    return () => cancelAnimationFrame(id);
  }, [atsScore]);

  useEffect(() => {
    setAnimatedScore(0);
    let startTime = null;
    let raf;

    const tick = (ts) => {
      if (startTime === null) startTime = ts;
      const t = Math.min((ts - startTime) / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimatedScore(Math.round(eased * atsScore));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [atsScore]);

  const radius = 75;
  const circumference = 2 * Math.PI * radius;
  const safeScore = Math.min(100, Math.max(0, Number(atsScore) || 0));
  const offset = circumference - ((ready ? safeScore : 0) / 100) * circumference;

  const getColor = (score) => {
    if (score >= 80) return "#9fbfa4";
    if (score >= 60) return "#e0b15c";
    return "#e27a84";
  };

  const getNote = (score) => {
    if (score >= 80) return "Excellent ATS compatibility!";
    if (score >= 60) return "Good ATS compatibility. Some improvements recommended.";
    return "Resume needs optimization for ATS systems.";
  };

  const color = getColor(safeScore);

  return (
    <div className="analysis-panel">
      <div className="analysis-panel__title-row">
        <div>
          <h3 className="analysis-panel__title">Your ATS report</h3>
          <p className="analysis-panel__subtitle">
            Here is how your resume matches this job.
          </p>
        </div>
      </div>

      <div className="analysis-panel__grid">
        {/* ATS SCORE */}
        <div className="analysis-panel__ats">
          <span className="analysis-panel__ats-label">
            ATS compatibility score
          </span>

          <div className="ats-donut">
            <svg width="180" height="180" viewBox="0 0 180 180">
              <circle
                className="ats-donut__track"
                cx="90"
                cy="90"
                r={radius}
              />
              <circle
                className="ats-donut__fill"
                cx="90"
                cy="90"
                r={radius}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                stroke={color}
              />
            </svg>
            <div className="ats-donut__value" style={{ color }}>
              {animatedScore}
            </div>
          </div>

          <p className="analysis-panel__ats-note">{getNote(safeScore)}</p>
        </div>

        {/* MATCHING SKILLS */}
        <div className="analysis-panel__cell">
          <div className="analysis-panel__cell-title">
            <CheckCircle2 size={22} color="#5b7560" />
            Matching skills
          </div>
          <div className="analysis-panel__cell-tags">
            {matchingSkills?.length > 0 ? (
              matchingSkills.map((skill) => (
                <Badge key={skill} label={skill} variant="skill" />
              ))
            ) : (
              <p>No matching skills found.</p>
            )}
          </div>
        </div>

        {/* MISSING SKILLS */}
        <div className="analysis-panel__cell">
          <div className="analysis-panel__cell-title">
            <AlertTriangle size={22} color="#b7791f" />
            Missing skills
          </div>
          <div className="analysis-panel__cell-tags">
            {missingSkills?.length > 0 ? (
              missingSkills.map((skill) => (
                <Badge key={skill} label={skill} variant="missing" />
              ))
            ) : (
              <p>No missing skills detected.</p>
            )}
          </div>
        </div>

        {/* STRENGTHS */}
        <div className="analysis-panel__cell">
          <div className="analysis-panel__cell-title">
            <Zap size={22} color="#415A77" />
            Strengths
          </div>
          {strengths?.length > 0 ? (
            <ul className="analysis-panel__cell-list">
              {strengths.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>No strengths identified.</p>
          )}
        </div>

        <div className="analysis-panel__cell">
          <div className="analysis-panel__cell-title">
            <Bot size={22} color="#1B263B" />
            Suggestions
          </div>
          {aiSuggestions?.length > 0 ? (
            <ul className="analysis-panel__cell-list">
              {aiSuggestions.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>No suggestions available.</p>
          )}
        </div>
      </div>
    </div>
  );
}