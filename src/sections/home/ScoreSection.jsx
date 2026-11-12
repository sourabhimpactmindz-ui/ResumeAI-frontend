import ScoreRing from "../../components/ScoreRing";
import ProgressBar from "../../components/ProgressBar";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { Sparkles, ArrowRight, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function ScoreSection() {
  return (
    <section className="relative w-full py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="font-accent text-2xl text-c-300 block mb-1">
          Deep diagnostic breakdown
        </span>
        <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-c-100 tracking-tight">
          How the algorithm grades your resume.
        </h2>
        <p className="mt-3 text-c-300 font-sans max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          ATS parsers don't guess. They calculate strict weighted scores across keywords, layout traps, section hierarchy, and quantifiable outcomes.
        </p>
      </div>

      <Card
        className="w-full p-8 md:p-14 rounded-[36px] bg-gradient-to-br from-c-800/90 to-c-800/60 border border-c-700/80 backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-[0_28px_60px_-15px_rgba(6,20,27,0.9),0_0_35px_rgba(155,168,171,0.12)]"
        glow={true}
      >
        {/* Left: Score Ring */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 border-b lg:border-b-0 lg:border-r border-c-700/60">
          <ScoreRing
            score={64}
            maxScore={100}
            size={200}
            strokeWidth={14}
            label="Baseline Candidate Score"
            sublabel="Benchmark against senior software role"
          />

          <div className="mt-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-c-warning/15 border border-c-warning/30 text-c-warning text-xs font-heading font-semibold">
            <AlertTriangle size={14} />
            <span>Passes baseline, but risks recruiter cut-off</span>
          </div>
        </div>

        {/* Right: 4 Progress Bars + Recommendations */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <ProgressBar
              label="Keyword Relevance & Depth"
              hint="Core technologies & frameworks"
              value={64}
              delay={0.2}
            />
            <ProgressBar
              label="Format & Parsing Hygiene"
              hint="No broken columns, clean UTF-8 text"
              value={88}
              delay={0.4}
            />
            <ProgressBar
              label="Section Structure & Standard Headings"
              hint="Experience, Education, Skills"
              value={92}
              delay={0.6}
            />
            <ProgressBar
              label="Measurable Business Results"
              hint="Action verbs & quantified metric data"
              value={58}
              delay={0.8}
            />
          </div>

          <div className="p-4 rounded-2xl bg-c-900/80 border border-c-700/80 flex items-start gap-3">
            <Sparkles size={18} className="text-c-100 shrink-0 mt-0.5" />
            <div className="text-xs font-sans text-c-300">
              <span className="font-heading font-bold text-c-100 block mb-0.5">
                Targeted AI Improvement Advice:
              </span>
              Adding 3 missing keywords (Docker, Redis, CI/CD pipeline) and rewriting 2 passive verbs increases this score to <strong className="text-c-success">86/100</strong> instantly.
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <Button to="/scanner" variant="primary" size="md" icon={<ArrowRight size={16} />}>
              Scan my resume for free
            </Button>
            <span className="text-xs text-c-600 font-sans">
              No account required to inspect
            </span>
          </div>
        </div>
      </Card>
    </section>
  );
}

