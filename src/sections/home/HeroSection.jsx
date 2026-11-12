import { Sparkles, ArrowRight, CheckCircle2, Shield } from "lucide-react";
import ScrollZoomHero from "../../components/animations/ScrollZoomHero";
import Typewriter from "../../components/animations/Typewriter";
import { Button } from "../../components/Button";
import { Badge } from "../../components/Badge";
import FloatingWrapper from "../../components/animations/FloatingWrapper";

export default function HeroSection() {
  const typewriterLines = [
    "before any recruiter does.",
    "in just 6 seconds.",
    "so you don't get rejected.",
    "and shows exactly how to fix it.",
  ];

  const visualResume = (
    <div className="relative mx-auto w-full max-w-2xl p-6 md:p-8 rounded-[36px] bg-c-800/85 border border-c-700/80 backdrop-blur-2xl shadow-[0_30px_70px_-15px_rgba(6,20,27,0.9),0_0_40px_rgba(155,168,171,0.15)] overflow-hidden">
      {/* Scan bar beam moving vertically */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-c-100 to-transparent shadow-[0_0_20px_#CCD0CF] animate-[scan_3.8s_ease-in-out_infinite]" />

      {/* Mock Resume Header */}
      <div className="flex items-start justify-between border-b border-c-700/60 pb-5 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-4 w-36 rounded-md bg-c-100/90" />
            <Badge variant="success" className="text-[10px] py-0.5">
              ATS Passed 88%
            </Badge>
          </div>
          <div className="h-2.5 w-52 rounded-md bg-c-600/70" />
        </div>
        <div className="text-right flex flex-col items-end">
          <span className="text-[11px] font-heading font-semibold text-c-300">
            Target: Senior Fullstack Engineer
          </span>
          <span className="text-[10px] text-c-600">Scan duration: 1.4s</span>
        </div>
      </div>

      {/* Mock Resume Body Blocks */}
      <div className="space-y-4">
        {/* Experience Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="h-3 w-28 rounded bg-c-300/80" />
            <span className="text-[10px] font-accent text-c-300 text-sm">
              +4 keywords detected
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-c-success shrink-0" />
              <div className="h-2.5 w-11/12 rounded bg-c-700/80" />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-c-success shrink-0" />
              <div className="h-2.5 w-4/5 rounded bg-c-700/80" />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-c-warning shrink-0" />
              <div className="h-2.5 w-5/6 rounded bg-c-700/80" />
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-c-warning/20 text-c-warning border border-c-warning/30 shrink-0">
                Weak Verb
              </span>
            </div>
          </div>
        </div>

        {/* Floating live score pill attached to card */}
        <div className="mt-4 pt-3 border-t border-c-700/50 flex items-center justify-between text-xs font-sans text-c-300">
          <div className="flex items-center gap-2">
            <Shield size={14} className="text-c-success" />
            <span>Zero parsing traps detected</span>
          </div>
          <span className="text-c-100 font-heading font-bold text-sm">
            Top 8% Candidate Pool
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <ScrollZoomHero visual={visualResume}>
      {/* Top Floating Status Pill */}
      <div className="inline-flex items-center gap-2 mb-6">
        <Badge variant="status" pulsing={true} className="py-1.5 px-4 text-xs">
          <span>Live ATS scanning</span>
          <span className="text-c-600">·</span>
          <span className="text-c-300">Over 12,400+ resumes benchmarked</span>
        </Badge>
      </div>

      {/* Main Headline with Anti-Gravity Typography & Human Copy */}
      <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-7xl text-c-100 tracking-tight leading-[1.08] max-w-4xl mx-auto">
        Your resume gets read by a robot first.{" "}
        <span className="text-c-300 block mt-2 text-3xl sm:text-4xl md:text-5xl font-semibold">
          We benchmark it <br className="hidden sm:inline" />
          <Typewriter lines={typewriterLines} className="text-c-100 underline decoration-c-300/40 decoration-wavy underline-offset-8" />
        </span>
      </h1>

      {/* Friendly Humanized Subtitle */}
      <p className="mt-6 text-base sm:text-lg md:text-xl text-c-300 max-w-2xl mx-auto font-sans leading-relaxed">
        We show you exactly why a bullet might get discarded by applicant tracking systems, and how to fix it in one click with quantified impact.
      </p>

      {/* CTA Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
          to="/scanner"
          variant="primary"
          size="lg"
          icon={<Sparkles size={18} />}
        >
          Check my resume — free
        </Button>
        <Button
          to="/tools/live-demo"
          variant="secondary"
          size="lg"
          icon={<ArrowRight size={18} />}
        >
          See how it works
        </Button>
      </div>

      {/* Human Reassurance Micro-Copy */}
      <p className="mt-4 text-xs font-sans text-c-600 flex items-center justify-center gap-2">
        <CheckCircle2 size={13} className="text-c-success" />
        <span>No sign-up needed to preview · Takes 12 seconds · 100% private in-memory scan</span>
      </p>
    </ScrollZoomHero>
  );
}

