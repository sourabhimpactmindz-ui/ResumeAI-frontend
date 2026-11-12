import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ParticleField from "../components/ParticleField";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import CardStack from "../components/animations/CardStack";
import FloatingWrapper from "../components/animations/FloatingWrapper";
import StaggerFromEdges from "../components/animations/StaggerFromEdges";
import { Sparkles, Heart, Users, ShieldCheck, Target, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const team = [
    {
      name: "Rohit Verma",
      role: "Co-Founder & Core Systems",
      bio: "Applied to 200+ engineering roles in 2023. Realized his two-column Canva resume was scrambling his work history in Workday. Built the first parser prototype in a weekend.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    },
    {
      name: "Ananya Iyer",
      role: "Head of Product & Career Intelligence",
      bio: "Ex-tech recruiter who reviewed over 40,000 resumes. Passionate about democratizing algorithmic transparency so deserving talent doesn't get discarded by naive software filters.",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80",
    },
    {
      name: "Marcus Chen",
      role: "NLP & Semantic Search Lead",
      bio: "Machine learning engineer specializing in AST syntax parsing and semantic embedding spaces. Obsessed with high-speed, client-side, weightless document analysis.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    },
  ];

  const valueCards = [
    (
      <div
        key="v1"
        className="w-full p-8 md:p-12 rounded-[36px] bg-gradient-to-br from-c-800 to-c-900 border border-c-700/80 shadow-[0_24px_50px_-10px_rgba(6,20,27,0.9),0_0_35px_rgba(155,168,171,0.12)] flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="max-w-md">
          <span className="text-xs font-heading font-extrabold uppercase px-3 py-1 rounded-full bg-c-success/20 text-c-success border border-c-success/30 inline-block mb-4">
            Principle 01
          </span>
          <h3 className="font-heading font-extrabold text-3xl text-c-100">
            Absolute Privacy by Design
          </h3>
          <p className="mt-3 text-c-300 font-sans text-sm md:text-base leading-relaxed">
            Your career trajectory and personal contact information should never be sold to marketing data aggregators or leaked to recruiters. We run all scans ephemerally in-memory.
          </p>
        </div>
        <div className="w-16 h-16 rounded-full bg-c-700/60 border border-c-600 flex items-center justify-center text-c-success shrink-0">
          <ShieldCheck size={32} />
        </div>
      </div>
    ),
    (
      <div
        key="v2"
        className="w-full p-8 md:p-12 rounded-[36px] bg-gradient-to-br from-c-800 to-c-900 border border-c-700/80 shadow-[0_24px_50px_-10px_rgba(6,20,27,0.9),0_0_35px_rgba(155,168,171,0.12)] flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="max-w-md">
          <span className="text-xs font-heading font-extrabold uppercase px-3 py-1 rounded-full bg-c-warning/20 text-c-warning border border-c-warning/30 inline-block mb-4">
            Principle 02
          </span>
          <h3 className="font-heading font-extrabold text-3xl text-c-100">
            No Algorithmic Shaming
          </h3>
          <p className="mt-3 text-c-300 font-sans text-sm md:text-base leading-relaxed">
            A low ATS score does not mean you are an unqualified professional. It simply means the parser failed to extract your skills. We show you the exact syntax fix in plain English.
          </p>
        </div>
        <div className="w-16 h-16 rounded-full bg-c-700/60 border border-c-600 flex items-center justify-center text-c-warning shrink-0">
          <Heart size={32} />
        </div>
      </div>
    ),
    (
      <div
        key="v3"
        className="w-full p-8 md:p-12 rounded-[36px] bg-gradient-to-br from-c-800 to-c-900 border border-c-700/80 shadow-[0_24px_50px_-10px_rgba(6,20,27,0.9),0_0_35px_rgba(155,168,171,0.12)] flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="max-w-md">
          <span className="text-xs font-heading font-extrabold uppercase px-3 py-1 rounded-full bg-c-100 text-c-900 font-bold inline-block mb-4">
            Principle 03
          </span>
          <h3 className="font-heading font-extrabold text-3xl text-c-100">
            Truth Over Gimmicks
          </h3>
          <p className="mt-3 text-c-300 font-sans text-sm md:text-base leading-relaxed">
            We will never advise you to paste white text or hack keyword density. We teach sustainable, high-impact XYZ writing formulas that impress both the parser and the hiring manager.
          </p>
        </div>
        <div className="w-16 h-16 rounded-full bg-c-700/60 border border-c-600 flex items-center justify-center text-c-100 shrink-0">
          <Target size={32} />
        </div>
      </div>
    ),
  ];

  return (
    <div className="relative min-h-screen bg-deep-space text-c-100 overflow-x-hidden selection:bg-c-100 selection:text-c-900">
      <ParticleField count={28} />
      <Navbar />

      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-32 pb-24">
        {/* Mission Hero */}
        <div className="text-center mb-20">
          <Badge variant="status" pulsing={true} className="mb-4">
            Our Human Mission
          </Badge>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl text-c-100 tracking-tight leading-tight max-w-3xl mx-auto">
            We built this because we've been rejected too.
          </h1>

          <p className="mt-5 text-base sm:text-lg text-c-300 font-sans max-w-2xl mx-auto leading-relaxed">
            Job hunting in 2026 feels like whispering into a black hole. We created ResumeAI to give candidates the exact diagnostic tools enterprise recruiters use behind closed doors.
          </p>
        </div>

        {/* Narrative Card */}
        <Card className="p-8 md:p-14 mb-24 shadow-[0_28px_60px_-15px_rgba(6,20,27,0.9),0_0_35px_rgba(155,168,171,0.12)] space-y-6" glow={true}>
          <span className="font-accent text-2xl text-c-300 block -rotate-1">
            The Story Behind ResumeAI
          </span>

          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-c-100 leading-snug">
            75% of rejected resumes belong to candidates who were qualified for the job.
          </h2>

          <div className="space-y-4 font-sans text-sm sm:text-base text-c-300 leading-relaxed">
            <p>
              In 2023, our founding team sent out hundreds of applications for engineering and design roles. Weeks turned into months of total silence. No human ever called. No feedback was ever offered.
            </p>
            <p>
              When we finally spoke with hiring directors and enterprise HR administrators, the reality was shocking: our resumes weren't being read and rejected by humans. They were being <strong className="text-c-100 font-semibold">silently truncated and discarded by automated applicant tracking software</strong> because of two-column table layouts and missing keyword tokens.
            </p>
            <p>
              ResumeAI is our answer: a humanized, weightless diagnostic suite that restores agency to job seekers. We level the playing field so your true accomplishments shine through the machine filter.
            </p>
          </div>
        </Card>

        {/* Team Section with Floating Avatars */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <span className="font-accent text-xl text-c-300 block mb-1">
              The humans building this
            </span>
            <h3 className="font-heading font-extrabold text-2xl md:text-4xl text-c-100">
              Meet the team
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <FloatingWrapper
                key={idx}
                y={idx === 1 ? 12 : 8}
                duration={idx === 1 ? 6.2 : 7.4}
                delay={idx * 0.3}
              >
                <Card className="p-8 flex flex-col justify-between h-full group" glow={true}>
                  <div>
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-20 h-20 rounded-3xl object-cover border-2 border-c-700 shadow-lg mb-6 group-hover:scale-105 transition-transform"
                    />
                    <h4 className="font-heading font-bold text-xl text-c-100 mb-1">
                      {member.name}
                    </h4>
                    <span className="text-xs font-heading font-semibold text-c-300 block mb-4">
                      {member.role}
                    </span>
                    <p className="text-xs sm:text-sm text-c-600 font-sans leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </Card>
              </FloatingWrapper>
            ))}
          </div>
        </div>

        {/* Values CardStack */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <span className="font-accent text-xl text-c-300 block mb-1">
              Core Principles
            </span>
            <h3 className="font-heading font-extrabold text-2xl md:text-4xl text-c-100">
              What we stand for
            </h3>
          </div>

          <CardStack cards={valueCards} />
        </div>

        {/* Final CTA */}
        <div className="p-10 md:p-14 rounded-[36px] bg-gradient-to-r from-c-800 to-c-800/60 border border-c-700 text-center flex flex-col items-center">
          <h3 className="font-heading font-extrabold text-2xl md:text-4xl text-c-100 mb-3">
            Ready to test your resume against ATS bots?
          </h3>
          <p className="text-sm md:text-base text-c-300 font-sans max-w-lg mb-8 leading-relaxed">
            Takes 12 seconds. No credit card, no sign-up required to see your baseline diagnostic score.
          </p>
          <Button to="/scanner" variant="primary" size="lg" icon={<Sparkles size={18} />}>
            Check my resume — free
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

