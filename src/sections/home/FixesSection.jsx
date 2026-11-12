import StaggerFromEdges from "../../components/animations/StaggerFromEdges";
import { Card } from "../../components/Card";
import FloatingWrapper from "../../components/animations/FloatingWrapper";
import { LayoutTemplate, Target, BarChart3, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function FixesSection() {
  const fixes = [
    {
      title: "ATS Format & Parsing Check",
      desc: "Eliminates multi-column tables, text boxes, and image headers that turn candidate resumes into unreadable scrambled code for ATS bots.",
      icon: <LayoutTemplate size={24} className="text-c-100" />,
      tag: "Hygiene",
      link: "/tools/format-check",
    },
    {
      title: "AI Keyword Gap Analysis",
      desc: "Extracts high-priority skills, methodologies, and certifications from your target job description and pinpoints exact omissions.",
      icon: <Target size={24} className="text-c-success" />,
      tag: "Relevance",
      link: "/tools/keyword-gap",
    },
    {
      title: "Measurable Impact Rewriting",
      desc: "Upgrades generic 'responsible for' bullet points into XYZ achievement formulas (Accomplished [X], measured by [Y], by doing [Z]).",
      icon: <BarChart3 size={24} className="text-c-warning" />,
      tag: "Metrics",
      link: "/tools/bullet-rewriter",
    },
    {
      title: "Encrypted & 100% Private",
      desc: "Processed in isolated memory sessions. Your career data is never used to train public models or shared with third-party recruiters.",
      icon: <ShieldCheck size={24} className="text-c-300" />,
      tag: "Privacy",
      link: "/policy",
    },
  ];

  return (
    <section className="relative w-full py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="font-accent text-2xl text-c-300 block mb-1">
          Precision engine
        </span>
        <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-c-100 tracking-tight">
          Four checks that stop silent rejections.
        </h2>
        <p className="mt-3 text-c-300 font-sans max-w-lg mx-auto text-sm md:text-base">
          Every floating diagnostic is tailored to the exact algorithms used by Fortune 500 hiring software.
        </p>
      </div>

      <StaggerFromEdges
        itemSelector=".fix-card"
        staggerTime={0.1}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {fixes.map((fix, idx) => (
          <FloatingWrapper
            key={idx}
            y={idx % 2 === 0 ? 10 : 14}
            duration={idx % 2 === 0 ? 6.2 : 7.1}
            delay={idx * 0.3}
            className="fix-card"
          >
            <Card
              className="p-8 md:p-10 flex flex-col justify-between h-full group"
              glow={true}
              interactive={true}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-c-700/60 border border-c-600/60 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    {fix.icon}
                  </div>
                  <span className="text-xs font-heading font-bold px-3 py-1 rounded-full bg-c-900 border border-c-700 text-c-300">
                    {fix.tag}
                  </span>
                </div>

                <h3 className="font-heading font-extrabold text-xl md:text-2xl text-c-100 mb-3 group-hover:text-white transition-colors">
                  {fix.title}
                </h3>
                <p className="text-sm text-c-300 font-sans leading-relaxed">
                  {fix.desc}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-c-700/50 flex items-center justify-between text-xs font-heading font-semibold text-c-100">
                <Link to={fix.link} className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
                  <span>Explore this diagnostic</span>
                  <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </Card>
          </FloatingWrapper>
        ))}
      </StaggerFromEdges>
    </section>
  );
}

