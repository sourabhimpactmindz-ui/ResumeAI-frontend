import { useEffect, useState } from 'react';
import { TrendingUp, Users, Award } from 'lucide-react';
import '../styles/StatCard.css';

const STAT_ICONS = {
  "Total Analyses": <TrendingUp size={22} color="#2563eb" />,
  "Avg ATS Score": <Award size={22} color="#7c3aed" />,
  "Success Rate": <Users size={22} color="#16a34a" />,
};

// "12,400+" → 12400, "78" → 78, "92%" → 92
const parseValue = (val) => {
  const num = parseInt(val.replace(/[^0-9]/g, ''));
  return isNaN(num) ? 0 : num;
};

// suffix nikalo — "+" ya "%" ya ""
const getSuffix = (val) => {
  if (val.includes('+')) return '+';
  if (val.includes('%')) return '%';
  return '';
};

// prefix nikalo — comma wale numbers ke liye
const formatNumber = (num, original) => {
  if (original.includes(',')) {
    return num.toLocaleString();  // 12400 → 12,400
  }
  return num.toString();
};

function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
}

export default function StatCard({ value, label }) {
  const numericTarget = parseValue(value);
  const suffix = getSuffix(value);
  const animatedCount = useCountUp(numericTarget);

  return (
    <div className="stat-card">
      <div className="stat-card__icon">
        {STAT_ICONS[label]}
      </div>
      <div className="stat-card__content">
        <span className="stat-card__value">
          {formatNumber(animatedCount, value)}{suffix}
        </span>
        <span className="stat-card__label">{label}</span>
      </div>
    </div>
  );
}