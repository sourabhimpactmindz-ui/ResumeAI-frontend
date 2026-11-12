import Accordion from "../../components/Accordion";

export default function FaqSection() {
  const faqItems = [
    {
      q: "Why do 75% of resumes get rejected by ATS filters before a human sees them?",
      a: "Recruiter software (like Workday, Taleo, Greenhouse, and Lever) parses raw resume text looking for exact title, hard skill, and tool matches. Complex two-column layouts, graphics, tables, and missing critical keywords often result in an automatic low match score, causing the application to be filtered out before any human recruiter reviews your portfolio.",
    },
    {
      q: "What is an acceptable ATS benchmark score to get interviews?",
      a: "A score of 80 or higher places you in the top 10% of applicants for that specific role. Scores between 60-79 pass baseline filters but risk being displaced by candidates with tighter keyword density. Anything below 60 is typically discarded automatically.",
    },
    {
      q: "How does ResumeAI differ from generic spell-checkers?",
      a: "Unlike grammar checkers, ResumeAI runs full structural AST parsing and semantic similarity models against the actual job post. It checks for ATS parsing traps (headers, tables, multi-column errors), detects missing technical competencies, and writes quantified impact metrics.",
    },
    {
      q: "Are my resumes stored, sold, or used for model training?",
      a: "Never. All documents and job descriptions are processed ephemerally in-memory. We never sell your career history to recruiting brokers or use your resume to train open LLM weights.",
    },
    {
      q: "Do I have to rewrite my entire resume for every single job application?",
      a: "No! Keep your foundational experience and career timeline intact. Use our scanner to swap out 3 to 5 targeted keywords and adapt 2 or 3 bullet points to mirror the specific phrasing in the job description.",
    },
  ];

  return (
    <section className="relative w-full py-24 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <span className="font-accent text-2xl text-c-300 block mb-1">
          Everything explained
        </span>
        <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-c-100 tracking-tight">
          Frequently asked questions.
        </h2>
        <p className="mt-3 text-c-300 font-sans max-w-lg mx-auto text-sm md:text-base">
          Straight answers from people who've audited both sides of the hiring equation.
        </p>
      </div>

      <Accordion items={faqItems} />
    </section>
  );
}

