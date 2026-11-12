import { useEffect, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function ScoreRing({
  score = 64,
  maxScore = 100,
  size = 180,
  strokeWidth = 12,
  label = "ATS Match Score",
  sublabel = "",
  showCountUp = true,
}) {
  const [animatedScore, setAnimatedScore] = useState(showCountUp ? 0 : score);
  const reducedMotion = useReducedMotion();

  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(Math.max(score / maxScore, 0), 1);
  const strokeDashoffset = circumference - percentage * circumference;

  // Determine semantic color based on score
  let strokeColor = "#CCD0CF"; // primary highlight
  if (score >= 80) strokeColor = "#7FB59A"; // success
  else if (score >= 60) strokeColor = "#D9B26F"; // warning
  else if (score < 60) strokeColor = "#D98C8C"; // error

  useEffect(() => {
    if (reducedMotion || !showCountUp) {
      setAnimatedScore(score);
      return;
    }

    let start = 0;
    const duration = 1600; // ms
    const startTime = performance.now();

    const step = (timestamp) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * score));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [score, showCountUp, reducedMotion]);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div
        className="relative flex items-center justify-center select-none"
        style={{ width: size, height: size }}
      >
        {/* Soft glow behind circle */}
        <div
          className="absolute inset-4 rounded-full blur-xl opacity-30 transition-all duration-700"
          style={{ backgroundColor: strokeColor }}
        />

        <svg
          width={size}
          height={size}
          className="rotate-[-90deg] drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
        >
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#253745"
            strokeWidth={strokeWidth}
            className="opacity-50"
          />
          {/* Animated Progress Fill */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1200 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${strokeColor}88)`,
            }}
          />
        </svg>

        {/* Center Numbers */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-heading text-4xl md:text-5xl font-extrabold text-c-100 tracking-tight">
            {animatedScore}
          </span>
          <span className="text-xs uppercase font-semibold tracking-widest text-c-300 -mt-1">
            / {maxScore}
          </span>
        </div>
      </div>

      {label && (
        <span className="mt-4 font-heading text-sm font-semibold text-c-100">
          {label}
        </span>
      )}
      {sublabel && (
        <span className="text-xs text-c-300 font-sans mt-0.5 max-w-[200px]">
          {sublabel}
        </span>
      )}
    </div>
  );
}

