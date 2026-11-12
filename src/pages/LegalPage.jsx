import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ParticleField from "../components/ParticleField";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { ShieldCheck, FileText, AlertCircle, ArrowLeft } from "lucide-react";

export default function LegalPage({ type = "privacy" }) {
  const location = useLocation();

  // Determine active document type
  let currentType = type;
  if (location.pathname.includes("terms")) currentType = "terms";
  else if (location.pathname.includes("disclaimer")) currentType = "disclaimer";
  else currentType = "privacy";

  const legalContent = {
    privacy: {
      title: "Privacy Policy",
      subtitle: "How we protect, process, and respect your resume and candidate data.",
      lastUpdated: "November 4, 2026",
      toc: [
        { id: "memory-processing", title: "1. Ephemeral In-Memory Processing" },
        { id: "zero-selling", title: "2. Zero Data Selling or Broker Sharing" },
        { id: "model-training", title: "3. No LLM Weight Training" },
        { id: "analytics", title: "4. Telemetry & Analytics" },
        { id: "contact-privacy", title: "5. Data Deletion Requests" },
      ],
      body: `
### 1. Ephemeral In-Memory Processing
When you submit a resume or job description to ResumeAI, the document payload is parsed inside an isolated, encrypted volatile memory container. We extract tokenized keywords, heading AST nodes, and layout structures to calculate your diagnostic score. Once your session terminates or you refresh your browser, temporary parsing buffers are immediately unallocated.

### 2. Zero Data Selling or Broker Sharing
ResumeAI is built by candidates who detest recruiters selling contact information. We never sell, rent, monetize, or barter your name, employment history, email address, phone number, or personal details to third-party recruitment agencies, lead brokers, or marketing syndicates.

### 3. No LLM Weight Training
Your career history, project proprietary descriptions, and job descriptions are never used to train, tune, or refine public language models (such as open-weights models or public generative APIs). All AI prompts are scoped with strict zero-retention flags.

### 4. Telemetry & Analytics
We record privacy-preserving diagnostic metrics (e.g., aggregate score lift percentage, count of scans executed) to ensure server reliability and track algorithmic model precision. These metrics contain zero personally identifiable information (PII).

### 5. Data Deletion Requests
If you create an account and later wish to permanently wipe your scan history, email us directly at **sourabrajput723@gmail.com** or use our Contact page. All associated database records will be erased within 24 business hours.
      `,
    },
    terms: {
      title: "Terms of Service",
      subtitle: "Clear, transparent terms governing the use of ResumeAI diagnostics.",
      lastUpdated: "November 4, 2026",
      toc: [
        { id: "acceptance", title: "1. Acceptance of Terms" },
        { id: "use-license", title: "2. Permitted Diagnostic Use" },
        { id: "no-guarantee", title: "3. Algorithmic Guidance & No Hire Guarantee" },
        { id: "intellectual-property", title: "4. Intellectual Property" },
        { id: "liability", title: "5. Limitation of Liability" },
      ],
      body: `
### 1. Acceptance of Terms
By accessing or using ResumeAI (the "Platform"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may discontinue use of the Platform at any time.

### 2. Permitted Diagnostic Use
ResumeAI grants you a personal, non-exclusive, non-transferable license to benchmark, inspect, and optimize your personal employment materials. You agree not to attempt automated scrapers, denial of service attacks, or reverse-engineering of proprietary parsing models.

### 3. Algorithmic Guidance & No Hire Guarantee
ResumeAI provides mathematical benchmark scoring based on publicly documented enterprise ATS behavior (including Workday, Greenhouse, Taleo, Lever, and iCIMS). However, hiring decisions ultimately rest with human recruiters and individual corporate requirements. While our recommendations dramatically improve parse rates, ResumeAI does not guarantee employment offers or callback interviews.

### 4. Intellectual Property
You retain 100% full copyright and ownership over your uploaded resumes, job titles, and career descriptions. ResumeAI retains all rights to its proprietary diagnostic software, animations, brand assets, and algorithmic scoring code.

### 5. Limitation of Liability
ResumeAI is provided on an "as is" and "as available" basis without warranties of any kind. Under no circumstances shall ResumeAI or its operators be held liable for missed job opportunities, hiring rejections, or indirect consequential damages.
      `,
    },
    disclaimer: {
      title: "Disclaimer & Compliance",
      subtitle: "Transparency regarding applicant tracking systems and third-party trademarks.",
      lastUpdated: "November 4, 2026",
      toc: [
        { id: "trademarks", title: "1. Third-Party Trademarks" },
        { id: "independent-platform", title: "2. Independent Diagnostic Platform" },
        { id: "scoring-methodology", title: "3. Scoring Methodology Transparency" },
        { id: "ethical-ai", title: "4. Ethical AI Standards" },
      ],
      body: `
### 1. Third-Party Trademarks
Workday®, Greenhouse®, Taleo®, Lever®, iCIMS®, and other company, software, or product names referenced on this site are the registered trademarks of their respective owners. Reference to these software systems is strictly for identification, interoperability, and educational comparison purposes, and does not imply endorsement, affiliation, or sponsorship.

### 2. Independent Diagnostic Platform
ResumeAI is an independent technology platform developed to audit document parsing hygiene. We are not officially affiliated with or endorsed by any ATS software vendor or employer.

### 3. Scoring Methodology Transparency
Our 0-100 ATS scores reflect optical AST extraction reliability, cosine keyword similarity, section heading recognition, and quantifiable metric density. We disclose these scoring criteria publicly to foster algorithmic transparency for candidates.

### 4. Ethical AI Standards
ResumeAI strictly discourages deceitful resume padding or fabricating work experience. Our AI rewriter aids candidates in articulating their genuine accomplishments with clarity, strong action verbs, and quantifiable metrics that adhere to ethical recruiting standards.
      `,
    },
  };

  const doc = legalContent[currentType] || legalContent.privacy;

  return (
    <div className="relative min-h-screen bg-deep-space text-c-100 overflow-x-hidden selection:bg-c-100 selection:text-c-900">
      <ParticleField count={20} />
      <Navbar />

      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-32 pb-24">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-c-300 hover:text-c-100 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Home</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to="/policy"
              className={`px-3 py-1.5 rounded-full text-xs font-heading font-bold transition-all ${
                currentType === "privacy"
                  ? "bg-c-100 text-c-900"
                  : "bg-c-800 text-c-300 border border-c-700 hover:text-c-100"
              }`}
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className={`px-3 py-1.5 rounded-full text-xs font-heading font-bold transition-all ${
                currentType === "terms"
                  ? "bg-c-100 text-c-900"
                  : "bg-c-800 text-c-300 border border-c-700 hover:text-c-100"
              }`}
            >
              Terms
            </Link>
            <Link
              to="/disclaimer"
              className={`px-3 py-1.5 rounded-full text-xs font-heading font-bold transition-all ${
                currentType === "disclaimer"
                  ? "bg-c-100 text-c-900"
                  : "bg-c-800 text-c-300 border border-c-700 hover:text-c-100"
              }`}
            >
              Disclaimer
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <Badge variant="status">
              Legal Transparency
            </Badge>
            <span className="text-xs text-c-600 font-sans">
              Last Updated: {doc.lastUpdated}
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-c-100 tracking-tight">
            {doc.title}
          </h1>
          <p className="mt-2 text-base text-c-300 font-sans">
            {doc.subtitle}
          </p>
        </div>

        {/* Content Layout with Sticky TOC on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Sticky Table of Contents */}
          <div className="hidden lg:block lg:col-span-4 sticky top-28">
            <Card className="p-6 space-y-3" glow={false}>
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-c-600 block">
                Table of Contents
              </span>
              <ul className="space-y-2 text-xs font-sans">
                {doc.toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-c-300 hover:text-c-100 transition-colors block py-0.5"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Legal Document Prose */}
          <div className="lg:col-span-8">
            <Card className="p-8 sm:p-12 shadow-[0_24px_50px_-15px_rgba(6,20,27,0.8)]" glow={true}>
              <div
                className="space-y-6 text-c-100 font-sans text-sm sm:text-base leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: doc.body
                    .replace(/### (.*)/g, '<h3 class="font-heading font-extrabold text-xl sm:text-2xl text-c-100 mt-8 mb-3 pt-4 border-t border-c-700/60 first:border-0 first:pt-0 first:mt-0">$1</h3>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-c-100 font-bold">$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em class="text-c-300">$1</em>'),
                }}
              />
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

