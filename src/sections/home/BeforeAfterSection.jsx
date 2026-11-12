import { useState, useEffect } from "react";
import { Card } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Sparkles, ArrowRight, XCircle, CheckCircle2, RefreshCw } from "lucide-react";
import { Button } from "../../components/Button";

export default function BeforeAfterSection() {
  const [activeTab, setActiveTab] = useState("improved"); // "before" | "improved"

  const comparisons = [
    {
      role: "Backend Engineer",
      before: {
        text: "Responsible for managing database and optimizing backend queries for the company web portal.",
        score: 52,
        critique: "Passive voice ('Responsible for'), zero metrics, missing core tech keywords (PostgreSQL, Redis, Latency).",
      },
      after: {
        text: "Architected PostgreSQL read replicas and Redis caching layer, slashing p99 query latency by 42% across 2.4M daily API requests.",
        score: 88,
        critique: "Strong action verb ('Architected'), quantified business impact (-42% latency), explicit tech keywords.",
      },
    },
    {
      role: "Frontend Developer",
      before: {
        text: "Worked on UI components in React and fixed bugs reported by users in Jira.",
        score: 48,
        critique: "Vague impact ('Worked on'), no scale or methodology mentioned, weak recruiter search index.",
      },
      after: {
        text: "Refactored 40+ legacy React components into reusable design system primitives, reducing core web vitals LCP from 3.8s to 1.1s.",
        score: 91,
        critique: "Quantified scope (40+ components, 3.8s to 1.1s), industry standard metrics (Core Web Vitals, LCP).",
      },
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const current = comparisons[currentIndex];

  return (
    <section className="relative w-full py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="font-accent text-2xl text-c-300 block mb-1">
          Real bullet point transformations
        </span>
        <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-c-100 tracking-tight">
          See how AI rewrites weak bullets.
        </h2>
        <p className="mt-3 text-c-300 font-sans max-w-lg mx-auto text-sm md:text-base">
          Notice how quantified metrics and strong verbs trigger ATS keyword matchers without exaggeration.
        </p>

        {/* Role Switcher Pills */}
        <div className="flex items-center justify-center gap-3 mt-6">
          {comparisons.map((c, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`px-4 py-2 rounded-full text-xs font-heading font-bold transition-all cursor-pointer ${
                currentIndex === idx
                  ? "bg-c-100 text-c-900 shadow-md"
                  : "bg-c-800 text-c-300 border border-c-700 hover:border-c-600"
              }`}
            >
              {c.role}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* BEFORE CARD */}
        <Card className="p-8 md:p-10 flex flex-col justify-between border-c-error/30 bg-c-800/60" glow={false}>
          <div>
            <div className="flex items-center justify-between mb-6">
              <Badge variant="error" icon={<XCircle size={14} />}>
                BEFORE · Generic & Weak
              </Badge>
              <div className="text-right">
                <span className="text-xs text-c-600 uppercase font-heading font-semibold block">ATS Score</span>
                <span className="font-heading font-extrabold text-2xl text-c-error">
                  {current.before.score} <span className="text-xs text-c-600">/ 100</span>
                </span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-c-900/90 border border-c-700/60 text-c-300 font-sans text-sm md:text-base leading-relaxed italic mb-6">
              "{current.before.text}"
            </div>

            <div className="space-y-2 text-xs font-sans text-c-600">
              <span className="font-heading font-bold text-c-300 block">ATS Algorithm Verdict:</span>
              <p>{current.before.critique}</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-c-700/40 text-xs text-c-600">
            Filtered out by 75% of high-volume candidate screens.
          </div>
        </Card>

        {/* AFTER CARD */}
        <Card className="p-8 md:p-10 flex flex-col justify-between border-c-success/50 bg-gradient-to-br from-c-800/95 to-c-800/70" glow={true}>
          <div>
            <div className="flex items-center justify-between mb-6">
              <Badge variant="success" icon={<CheckCircle2 size={14} />}>
                AFTER · AI Quantified & Tailored
              </Badge>
              <div className="text-right">
                <span className="text-xs text-c-300 uppercase font-heading font-semibold block">ATS Score</span>
                <span className="font-heading font-extrabold text-2xl text-c-success">
                  {current.after.score} <span className="text-xs text-c-300">/ 100</span>
                </span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-c-900/90 border border-c-success/30 text-c-100 font-sans text-sm md:text-base leading-relaxed font-medium mb-6 shadow-sm">
              "{current.after.text}"
            </div>

            <div className="space-y-2 text-xs font-sans text-c-300">
              <span className="font-heading font-bold text-c-100 block">Why this passes ATS filters:</span>
              <p className="text-c-300">{current.after.critique}</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-c-700/60 flex items-center justify-between">
            <span className="text-xs text-c-success font-heading font-semibold flex items-center gap-1.5">
              <Sparkles size={14} />
              <span>Ranked in top 10% recruiter bracket</span>
            </span>

            <Button to="/tools/bullet-rewriter" variant="secondary" size="sm">
              Rewrite my bullets
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}

