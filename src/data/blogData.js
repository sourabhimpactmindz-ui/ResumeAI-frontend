export const BLOG_POSTS = [
  {
    slug: "how-ats-parses-resumes-2026",
    title: "How ATS Parses Resumes in 2026: The Deep Architecture Guide",
    excerpt: "Modern Applicant Tracking Systems don't just count keywords. Here's a breakdown of optical layout parsing, tokenization trees, and semantic vector indexing.",
    category: "Algorithm Truths",
    readTime: "6 min read",
    date: "November 4, 2026",
    author: {
      name: "Rohit Verma",
      role: "Ex-Recruiter & Fullstack Eng",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    featured: true,
    content: `
### The Illusion of the Human Reviewer

Almost every job seeker assumes a human eyes their resume first. In reality, **over 75% of resumes submitted to Fortune 500 portals are filtered or ranked by automated parsing engines** before a recruiter spends even three seconds reviewing a candidate pool.

When you upload a PDF or DOCX file to an enterprise job portal (Workday, Greenhouse, Taleo, iCIMS, or Lever), the system does not view your document as a visual flyer. It passes the binary payload through an Optical Character Recognition (OCR) and Abstract Syntax Tree (AST) parser to convert your visual layout into serialized text.

> "If the parser cannot reliably extract your company names, job titles, and bullet points in chronological order, your score is set to near zero regardless of how qualified you actually are."

### The Three Layers of ATS Evaluation

1. **Document Structure & Flow Sanitization**: The parser checks for linear single-column flow. Complex two-column templates, floating text frames, and table headers often get scrambled, causing the parser to merge your 2024 skills with your 2018 education.
2. **Entity & Terminology Extraction**: The engine identifies candidate names, locations, hard technical skills, and degrees.
3. **Semantic Vector Similarity**: Rather than simple string matching, modern engines embed job descriptions and candidate resumes into multi-dimensional vectors to calculate cosine similarity scores.

### How to Guarantee a 90+ Parse Rate

- Always stick to single-column linear layouts.
- Use universal standard section headings: *Experience*, *Education*, *Skills*, *Projects*.
- Never place critical contact information or certifications in PDF headers or footers — many enterprise OCR engines skip headers completely to avoid repeating company names.
    `,
  },
  {
    slug: "semantic-keyword-matching-tips",
    title: "Semantic Keyword Matching: Stop Keyword Stuffing and Start Vector Aligning",
    excerpt: "Why repeating 'Python' 40 times gets your resume flagged as spam, and how semantic clustering helps you pass modern ATS filters cleanly.",
    category: "Keyword Strategy",
    readTime: "5 min read",
    date: "October 28, 2026",
    author: {
      name: "Ananya Iyer",
      role: "Product Designer & Career Coach",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    },
    featured: false,
    content: `
### The Death of Keyword Stuffing

A decade ago, candidates would paste a wall of keywords in 1pt white font in their resume margins. In 2026, **modern ATS algorithms immediately flag hidden text and disproportionate keyword density as adversarial spam**.

Modern systems use semantic similarity models (such as BERT and transformer embeddings). The algorithm understands that if a candidate mentions:

- PostgreSQL, Query Optimization, and Read Replicas → The candidate understands Relational Database Architecture.
- Docker, Helm, and GitHub Actions → The candidate understands CI/CD & Containerization.

### The Cluster Technique

Instead of repeating the same core buzzword repeatedly, build **thematic clusters** within each job bullet point:

\`\`\`
Weak (Repetitive):
- Used React to build features. Tested React components. Updated React state.

Strong (Clustered):
- Built dynamic UI dashboards using React and TypeScript, managing server state with React Query and testing critical user flows via Jest.
\`\`\`

Notice how the second bullet point naturally hits four high-value keywords without sounding robotic to a human recruiter.
    `,
  },
  {
    slug: "transforming-bullet-points-to-metrics",
    title: "Transforming Bullet Points to Metrics: The Google XYZ Formula",
    excerpt: "Learn how to turn passive 'Responsible for' job bullets into quantified business achievements that recruiters and ATS algorithms reward.",
    category: "Writing Guides",
    readTime: "7 min read",
    date: "October 19, 2026",
    author: {
      name: "Marcus Chen",
      role: "DevOps Engineer & Hiring Lead",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    featured: false,
    content: `
### The XYZ Formula Explained

Laszlo Bock, former SVP of People Operations at Google, codified the gold standard for resume bullets:

> **"Accomplished [X], as measured by [Y], by doing [Z]."**

Every bullet on your resume should clearly answer three questions:
1. What was the business outcome or result?
2. What was the quantifiable baseline or percentage improvement?
3. What specific tools or methodologies did you use to achieve it?

### Real Transformations

#### Example 1: Software Engineer
- **Before**: Responsible for backend APIs and bug fixes.
- **After**: Re-engineered core authentication and billing APIs in Go, slashing p99 latency by 38% and supporting 1.2M daily active users.

#### Example 2: Product & Design
- **Before**: Designed new checkout screens for the e-commerce mobile app.
- **After**: Redesigned 5-step checkout flow into a single-page frictionless experience, lifting mobile checkout conversion by 22.4% within 90 days of launch.
    `,
  },
  {
    slug: "why-two-column-templates-fail",
    title: "Why Two-Column Graphic Templates Fail the ATS Screening Stage",
    excerpt: "That stylish two-column Canva resume looks great to your eye, but it is the number one reason qualified candidates receive instant rejections.",
    category: "Design Pitfalls",
    readTime: "4 min read",
    date: "October 12, 2026",
    author: {
      name: "Rohit Verma",
      role: "Ex-Recruiter & Fullstack Eng",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    featured: false,
    content: `
### How Screen Scrapers Read Columns

When humans look at a two-column page, our eyes read the left column top-to-bottom, then move to the right column.

However, standard PDF text extractors (pdftotext, Apache Tika, and native ATS parsers) read across the horizontal raster coordinates.

\`\`\`
Visual Layout:
[Left Column: Skills]        [Right Column: Experience]
- React                       Software Engineer at Acme
- TypeScript                  2022 - Present
- Node.js                     Led checkout redesign

Scraped Output by ATS:
- React Software Engineer at Acme
- TypeScript 2022 - Present
- Node.js Led checkout redesign
\`\`\`

The parsed text is now completely scrambled! The system fails to recognize your job title and dates of employment, scoring your resume with zero points for experience.
    `,
  },
  {
    slug: "fresher-resume-optimization-strategy",
    title: "Fresher & Early Career Resume Strategy: Beating Zero-Experience Bias",
    excerpt: "How to structure projects, open source contributions, and coursework so ATS algorithms view you as an experienced hire.",
    category: "Freshers & Students",
    readTime: "5 min read",
    date: "October 02, 2026",
    author: {
      name: "Ananya Iyer",
      role: "Product Designer & Career Coach",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    },
    featured: false,
    content: `
### Shifting the Weight to Production Projects

If you have less than two years of full-time commercial experience, your **Projects** section must be formatted identically to an **Experience** section.

Never list your project as just a GitHub link:
\`\`\`
Weak:
- Portfolio Website: github.com/user/portfolio
- Built a clone of Netflix using React.

Strong:
- StreamPulse — Fullstack Video Streaming Engine (React, WebRTC, Node.js)
  • Implemented real-time peer-to-peer video streaming pipeline supporting 50+ concurrent low-latency viewers.
  • Integrated Redis caching for metadata queries, achieving sub-40ms response times.
  • Deployed on Docker container instances with automated CI/CD unit testing.
\`\`\`

When parsed by an ATS, the project bullets register with the exact same semantic weight as commercial experience.
    `,
  },
];

