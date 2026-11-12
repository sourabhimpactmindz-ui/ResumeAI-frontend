import CardStack from "../../components/animations/CardStack";
import { UploadCloud, Search, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "../../components/Button";

export default function StepsStackSection() {
  const steps = [
    (
      <div
        key="step-1"
        className="w-full p-8 md:p-12 rounded-[36px] bg-gradient-to-br from-c-800 to-c-900 border border-c-700/80 shadow-[0_24px_50px_-10px_rgba(6,20,27,0.9),0_0_35px_rgba(155,168,171,0.12)] flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="max-w-md">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-c-700/60 border border-c-600/50 text-xs font-heading font-bold text-c-100 mb-4">
            <span>STEP 01</span>
            <span className="text-c-600">·</span>
            <span className="text-c-300">Fast Upload</span>
          </div>
          <h3 className="font-heading font-extrabold text-3xl md:text-4xl text-c-100 leading-tight">
            Drop your resume in any format.
          </h3>
          <p className="mt-3 text-c-300 font-sans text-sm md:text-base leading-relaxed">
            PDF, DOCX, or text. Our parser reconstructs your document structure exactly as recruiter software sees it — stripping invisible formatting traps and column breaks.
          </p>
        </div>

        <div className="w-full md:w-80 h-52 rounded-3xl bg-c-900/90 border border-c-700 flex flex-col items-center justify-center p-6 text-center shadow-inner">
          <div className="w-14 h-14 rounded-full bg-c-700/60 border border-c-600/60 flex items-center justify-center text-c-100 mb-3 shadow-md">
            <UploadCloud size={26} />
          </div>
          <p className="font-heading font-bold text-sm text-c-100">
            Drag & Drop Resume
          </p>
          <span className="text-xs text-c-600 mt-0.5">
            100% private in-memory processing
          </span>
        </div>
      </div>
    ),
    (
      <div
        key="step-2"
        className="w-full p-8 md:p-12 rounded-[36px] bg-gradient-to-br from-c-800 to-c-900 border border-c-700/80 shadow-[0_24px_50px_-10px_rgba(6,20,27,0.9),0_0_35px_rgba(155,168,171,0.12)] flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="max-w-md">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-c-700/60 border border-c-600/50 text-xs font-heading font-bold text-c-100 mb-4">
            <span>STEP 02</span>
            <span className="text-c-600">·</span>
            <span className="text-c-300">Semantic Matching</span>
          </div>
          <h3 className="font-heading font-extrabold text-3xl md:text-4xl text-c-100 leading-tight">
            Paste the target job description.
          </h3>
          <p className="mt-3 text-c-300 font-sans text-sm md:text-base leading-relaxed">
            Our engine extracts explicit hard skills, implied competencies, and recruiter query weightings to diagnose keyword deficits.
          </p>
        </div>

        <div className="w-full md:w-80 h-52 rounded-3xl bg-c-900/90 border border-c-700 flex flex-col justify-between p-5 text-left shadow-inner">
          <div className="flex items-center justify-between border-b border-c-700/60 pb-2">
            <span className="text-xs font-heading font-bold text-c-300">Job Description Input</span>
            <Search size={14} className="text-c-600" />
          </div>
          <div className="space-y-1.5 py-1">
            <div className="h-2 w-full rounded bg-c-700/60" />
            <div className="h-2 w-5/6 rounded bg-c-700/60" />
            <div className="h-2 w-3/4 rounded bg-c-700/60" />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-c-success/20 text-c-success border border-c-success/30 font-bold">
              +14 Keywords found
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-c-warning/20 text-c-warning border border-c-warning/30 font-bold">
              3 Missing
            </span>
          </div>
        </div>
      </div>
    ),
    (
      <div
        key="step-3"
        className="w-full p-8 md:p-12 rounded-[36px] bg-gradient-to-br from-c-800 to-c-900 border border-c-700/80 shadow-[0_24px_50px_-10px_rgba(6,20,27,0.9),0_0_35px_rgba(155,168,171,0.12)] flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="max-w-md">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-c-700/60 border border-c-600/50 text-xs font-heading font-bold text-c-100 mb-4">
            <span>STEP 03</span>
            <span className="text-c-600">·</span>
            <span className="text-c-300">Instant Fixes</span>
          </div>
          <h3 className="font-heading font-extrabold text-3xl md:text-4xl text-c-100 leading-tight">
            Apply AI-backed bullet enhancements.
          </h3>
          <p className="mt-3 text-c-300 font-sans text-sm md:text-base leading-relaxed">
            Get an instant 0-100 ATS score and rewrite weak bullet points into high-impact, metric-driven achievements in one click.
          </p>

          <div className="mt-6">
            <Button to="/scanner" variant="primary" size="md" icon={<ArrowRight size={16} />}>
              Try it now
            </Button>
          </div>
        </div>

        <div className="w-full md:w-80 h-52 rounded-3xl bg-c-900/90 border border-c-700 flex flex-col items-center justify-center p-6 text-center shadow-inner">
          <div className="w-14 h-14 rounded-full bg-c-success/20 text-c-success border border-c-success/40 flex items-center justify-center mb-2 shadow-[0_0_16px_rgba(127,181,154,0.3)]">
            <CheckCircle2 size={28} />
          </div>
          <p className="font-heading font-extrabold text-2xl text-c-100">
            88 / 100
          </p>
          <span className="text-xs text-c-300 font-semibold mt-0.5">
            Recruiter Ready Score
          </span>
        </div>
      </div>
    ),
  ];

  return (
    <section className="relative w-full py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="font-accent text-2xl text-c-300 block mb-1">
          Simple weightless workflow
        </span>
        <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-c-100 tracking-tight">
          Three steps from ghosted to interviewed.
        </h2>
        <p className="mt-3 text-c-300 font-sans max-w-lg mx-auto text-sm md:text-base">
          Scroll down to stack each step of our diagnostic process.
        </p>
      </div>

      <CardStack cards={steps} />
    </section>
  );
}

