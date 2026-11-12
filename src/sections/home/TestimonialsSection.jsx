import { Card } from "../../components/Card";
import FloatingWrapper from "../../components/animations/FloatingWrapper";
import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Rohit Verma",
      role: "Full Stack Engineer at Stripe",
      scoreChange: "54 → 91",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      content:
        "I sent 110 applications with zero replies. ResumeAI flagged that my Canva two-column format wasn't even parsing my company names! Switched layout, added 4 missing Redis & Docker keywords, and got 3 recruiter DMs in 2 weeks.",
    },
    {
      name: "Ananya Iyer",
      role: "Product Designer at Figma",
      scoreChange: "61 → 89",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      content:
        "The bullet point metric rewriter is incredible. It transformed my fuzzy bullets into clear business outcome statements. Landed interviews at two YC startups within days.",
    },
    {
      name: "Marcus Chen",
      role: "DevOps Engineer at Datadog",
      scoreChange: "58 → 94",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      content:
        "Seeing the exact keyword gap before hitting apply gave me huge confidence. The dark weightless UI feels like a high-end IDE tool rather than boring HR software.",
    },
  ];

  return (
    <section className="relative w-full py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="font-accent text-2xl text-c-300 block mb-1">
          Candidate success stories
        </span>
        <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-c-100 tracking-tight">
          From silent rejection to top 5% candidate callbacks.
        </h2>
        <p className="mt-3 text-c-300 font-sans max-w-lg mx-auto text-sm md:text-base">
          Built for job hunters who are tired of algorithmic black holes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <FloatingWrapper
            key={idx}
            y={idx === 1 ? 14 : 10}
            duration={idx === 1 ? 5.8 : 7.2}
            delay={idx * 0.4}
            className="h-full"
          >
            <Card
              className="p-8 flex flex-col justify-between h-full bg-gradient-to-b from-c-800/90 to-c-800/60"
              glow={true}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1 text-c-warning">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="#D9B26F" />
                    ))}
                  </div>

                  <span className="text-xs font-heading font-extrabold px-2.5 py-0.5 rounded-full bg-c-success/20 text-c-success border border-c-success/30">
                    ATS {t.scoreChange}
                  </span>
                </div>

                <Quote size={24} className="text-c-600 mb-3" />

                <p className="text-sm font-sans text-c-300 leading-relaxed italic mb-8">
                  "{t.content}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-c-700/60">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-c-700 shadow-md"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-heading font-bold text-sm text-c-100">
                    {t.name}
                  </h4>
                  <p className="text-xs text-c-600 font-sans">
                    {t.role}
                  </p>
                </div>
              </div>
            </Card>
          </FloatingWrapper>
        ))}
      </div>
    </section>
  );
}

