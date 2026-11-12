import StaggerFromEdges from "../../components/animations/StaggerFromEdges";
import { Card } from "../../components/Card";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function MythsSection() {
  const myths = [
    {
      myth: "Putting white text keywords in the footer beats the ATS.",
      reality: "Modern ATS software extracts plain ASCII and flags hidden or zero-point text as deliberate spam, resulting in immediate blacklisting.",
    },
    {
      myth: "A multi-column creative Canva template stands out more.",
      reality: "Parsers read horizontally across columns, conflating unrelated job dates and skills into unparseable text soup.",
    },
    {
      myth: "You need a 100% exact keyword match to get shortlisted.",
      reality: "Semantic ATS algorithms look for semantic clusters (e.g. knowing React implies JavaScript and state management). Over-stuffing triggers keyword-density penalties.",
    },
    {
      myth: "Cover letters compensate for a poorly formatted resume.",
      reality: "Cover letters are only indexed if your resume passes the initial automated score threshold. The resume is your gatekeeper.",
    },
  ];

  return (
    <section className="relative w-full py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="font-accent text-2xl text-c-300 block mb-1">
          Busting bad career advice
        </span>
        <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-c-100 tracking-tight">
          Common ATS myths that cost people interviews.
        </h2>
        <p className="mt-3 text-c-300 font-sans max-w-lg mx-auto text-sm md:text-base">
          Stop following TikTok resume hacks that cause automated rejections.
        </p>
      </div>

      <StaggerFromEdges
        itemSelector=".myth-card"
        staggerTime={0.12}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {myths.map((item, idx) => (
          <Card
            key={idx}
            className="myth-card p-8 md:p-9 flex flex-col justify-between hover:-translate-y-1.5 transition-transform"
            glow={true}
          >
            <div>
              {/* Myth with animated strike-through styling */}
              <div className="flex items-start gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-c-error/15 text-c-error border border-c-error/30 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertCircle size={15} />
                </span>
                <div>
                  <span className="text-[11px] font-heading font-bold text-c-error uppercase tracking-wider block mb-1">
                    MYTH #{idx + 1}
                  </span>
                  <p className="font-heading font-bold text-lg text-c-300 line-through decoration-c-error decoration-2">
                    "{item.myth}"
                  </p>
                </div>
              </div>

              {/* Reality */}
              <div className="flex items-start gap-3 pl-10 border-l border-c-700/60 mt-4">
                <div>
                  <span className="text-[11px] font-heading font-bold text-c-success uppercase tracking-wider block mb-1">
                    REALITY & ALGORITHM TRUTH
                  </span>
                  <p className="font-sans text-sm text-c-100 leading-relaxed">
                    {item.reality}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </StaggerFromEdges>
    </section>
  );
}

