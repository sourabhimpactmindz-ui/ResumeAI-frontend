import { useEffect, useState } from 'react';
import { CheckCircle2, AlertTriangle, Zap, Bot } from 'lucide-react';
import '../styles/AnalysisPanel.css';
import Badge from './Badge';

export default function AnalysisPanel({
  atsScore = 0,
  matchingSkills = [],
  missingSkills = [],
  strengths = [],
  aiSuggestions = [],
}) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    setAnimatedScore(0);
    let start = 0;
    const duration = 1500;
    const increment = atsScore / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= atsScore) {
        setAnimatedScore(atsScore);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [atsScore]);

  const radius = 75;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  const getColor = (score) => {
    if (score >= 80) return "#16a34a";
    if (score >= 60) return "#f59e0b";
    return "#dc2626";
  };

  const color = getColor(atsScore);

  const getNote = (score) => {
    if (score >= 80) return "Excellent ATS compatibility!";
    if (score >= 60) return "Good ATS compatibility. Some improvements recommended.";
    return "Resume needs optimization for ATS systems.";
  };

  return (
    <div className="analysis-panel">
      <div className="analysis-panel__title-row">
        <div>
          <h3 className="analysis-panel__title">AI Analysis Report</h3>
          <p className="analysis-panel__subtitle">Real-time feedback for your current resume.</p>
        </div>
      </div>

      <div className="analysis-panel__grid">

        {/* ATS SCORE */}
        <div className="analysis-panel__ats">
          <span className="analysis-panel__ats-label">ATS Compatibility Score</span>

          <div className="ats-donut">
            <svg width="180" height="180" viewBox="0 0 180 180">
              <circle className="ats-donut__track" cx="90" cy="90" r={radius} />
              <circle
                className="ats-donut__fill"
                cx="90" cy="90" r={radius}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                stroke={color}
                style={{ transition: 'stroke-dashoffset 0.05s ease, stroke 0.3s ease' }}
              />
            </svg>
            <div className="ats-donut__value" style={{ color }}>
              {animatedScore}
            </div>
          </div>

          <p className="analysis-panel__ats-note">{getNote(atsScore)}</p>
        </div>

        {/* MATCHING SKILLS */}
        <div className="analysis-panel__cell">
          <div className="analysis-panel__cell-title">
            <CheckCircle2 size={22} color="#16a34a" />
            Matching Skills
          </div>
          <div className="analysis-panel__cell-tags">
            {matchingSkills?.length > 0
              ? matchingSkills.map((skill) => (
                  <Badge key={skill} label={skill} variant="skill" />
                ))
              : <p>No matching skills found.</p>}
          </div>
        </div>

        {/* MISSING SKILLS */}
        <div className="analysis-panel__cell">
          <div className="analysis-panel__cell-title">
            <AlertTriangle size={22} color="#f59e0b" />
            Missing Skills
          </div>
          <div className="analysis-panel__cell-tags">
            {missingSkills?.length > 0
              ? missingSkills.map((skill) => (
                  <Badge key={skill} label={skill} variant="missing" />
                ))
              : <p>No missing skills detected.</p>}
          </div>
        </div>

        {/* STRENGTHS */}
        <div className="analysis-panel__cell">
          <div className="analysis-panel__cell-title">
            <Zap size={22} color="#2563eb" />
            Strengths
          </div>
          {strengths?.length > 0
            ? <ul className="analysis-panel__cell-list">
                {strengths.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            : <p>No strengths identified.</p>}
        </div>

        {/* AI SUGGESTIONS */}
        <div className="analysis-panel__cell">
          <div className="analysis-panel__cell-title">
            <Bot size={22} color="#7c3aed" />
            AI Suggestions
          </div>
          {aiSuggestions?.length > 0
            ? <ul className="analysis-panel__cell-list">
                {aiSuggestions.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            : <p>No suggestions available.</p>}
        </div>

      </div>
    </div>
  );
}