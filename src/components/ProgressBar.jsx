import { useEffect, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function ProgressBar({
  label,
  value = 75,
  max = 100,
  hint = "",
  color = null, // auto-selects if null
  delay = 0,
}) {
  const [fillPercent, setFillPercent] = useState(0);
  const reducedMotion = useReducedMotion();
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  // Semantic color calculation
  let barColor = color;
  if (!barColor) {
    if (percentage >= 80) barColor = "#7FB59A"; // success
    else if (percentage >= 60) barColor = "#D9B26F"; // warning
    else barColor = "#D98C8C"; // error
  }

  useEffect(() => {
    if (reducedMotion) {
      setFillPercent(percentage);
      return;
    }

    const timer = setTimeout(() => {
      setFillPercent(percentage);
    }, delay * 1000 + 100);

    return () => clearTimeout(timer);
  }, [percentage, delay, reducedMotion]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs md:text-sm font-heading font-medium mb-2">
        <span className="text-c-100 flex items-center gap-2">
          {label}
          {hint && <span className="text-c-600 font-sans text-xs">({hint})</span>}
        </span>
        <span className="text-c-300 font-semibold">{Math.round(percentage)}%</span>
      </div>

      <div className="h-2.5 w-full bg-c-900/80 rounded-full overflow-hidden border border-c-700/60 p-[1px]">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${fillPercent}%`,
            backgroundColor: barColor,
            boxShadow: `0 0 10px ${barColor}66`,
          }}
        />
      </div>
    </div>
  );
}

