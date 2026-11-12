import StaggerFromEdges from "../../components/animations/StaggerFromEdges";
import { Card } from "../../components/Card";
import { Zap, Clock, ShieldCheck, TrendingUp } from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      value: "29%",
      label: "Average ATS Score Lift",
      desc: "Typical improvement within one revision pass.",
      icon: <TrendingUp size={22} className="text-c-success" />,
    },
    {
      value: "2 sec",
      label: "Instant Diagnostic Time",
      desc: "Complete parsing of PDF structure & semantics.",
      icon: <Zap size={22} className="text-c-100" />,
    },
    {
      value: "15+",
      label: "ATS Systems Covered",
      desc: "Tested against Workday, Greenhouse, Lever, Taleo, iCIMS.",
      icon: <ShieldCheck size={22} className="text-c-300" />,
    },
    {
      value: "12 sec",
      label: "Time to First Fix",
      desc: "From file drag-drop to actionable bullet suggestions.",
      icon: <Clock size={22} className="text-c-warning" />,
    },
  ];

  return (
    <section className="relative w-full py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <span className="font-accent text-xl text-c-300 block mb-1">
          Measurable outcomes
        </span>
        <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-c-100">
          Engineered for candidates who want callbacks, not silence.
        </h2>
      </div>

      <StaggerFromEdges
        itemSelector=".stat-item"
        staggerTime={0.08}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, idx) => (
          <Card
            key={idx}
            className="stat-item flex flex-col items-start justify-between p-7 hover:-translate-y-2 transition-transform duration-300"
            glow={true}
          >
            <div className="w-12 h-12 rounded-2xl bg-c-700/50 border border-c-600/50 flex items-center justify-center mb-6">
              {stat.icon}
            </div>
            <div>
              <span className="font-heading font-extrabold text-4xl text-c-100 tracking-tight">
                {stat.value}
              </span>
              <h3 className="font-heading font-bold text-sm text-c-100 mt-2">
                {stat.label}
              </h3>
              <p className="font-sans text-xs text-c-600 mt-1 leading-relaxed">
                {stat.desc}
              </p>
            </div>
          </Card>
        ))}
      </StaggerFromEdges>
    </section>
  );
}

