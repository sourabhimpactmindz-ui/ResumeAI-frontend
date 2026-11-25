import { SITE_URL } from "../components/seo";


export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ResumeAI",
  url: SITE_URL,
  logo: `${SITE_URL}/vite.png`, 
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ResumeAI",
  url: SITE_URL,
};

export const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ResumeAI - Free ATS Resume Checker",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "AI resume analyzer that scores your resume for ATS compatibility and matches it against a job description.",
  url: SITE_URL,
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
};

export const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});