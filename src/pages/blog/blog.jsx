import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { Clock, Calendar, Sparkles } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import "../../styles/legal-pages.css";

const BLOG_POSTS = [
  {
    id: 1,
    tag: "ATS Hacks",
    title: "How Applicant Tracking Systems (ATS) Actually Parse Resumes in 2026",
    excerpt:
      "Most candidates think ATS is a mystery black box. We break down the exact tokenization, section parsing, and scoring algorithms recruiters use.",
    date: "Nov 3, 2026",
    readTime: "5 min read",
  },
  {
    id: 2,
    tag: "Keywords",
    title: "The Keyword Gap Myth: Tailoring Your Skills Without Spamming Words",
    excerpt:
      "White-fonting keywords no longer works and gets you blacklisted. Here is the modern semantic keyword matching strategy that works.",
    date: "Oct 28, 2026",
    readTime: "4 min read",
  },
  {
    id: 3,
    tag: "Bullet Points",
    title: "Before & After: Transforming Passive Duties into High-Impact Metrics",
    excerpt:
      "See real examples of turning 'Responsible for maintaining code' into 'Engineered React state architecture cutting bundle size by 35%'.",
    date: "Oct 22, 2026",
    readTime: "6 min read",
  },
  {
    id: 4,
    tag: "Formatting",
    title: "Why Two-Column and Canva Resume Templates Break Parsing",
    excerpt:
      "Columns, icons, tables, and image headers often cause text to merge across columns. Learn why single-column text-based PDFs always win.",
    date: "Oct 15, 2026",
    readTime: "4 min read",
  },
  {
    id: 5,
    tag: "Career Strategy",
    title: "The 6-Second Recruiter Test: Optimizing Your Above-the-Fold Space",
    excerpt:
      "A hiring manager glances at your name, title, current role, and top 3 metrics first. How to structure your top third for maximum impact.",
    date: "Oct 08, 2026",
    readTime: "5 min read",
  },
  {
    id: 6,
    tag: "ATS Hacks",
    title: "How Freshers Can Beat the ATS Without Years of Experience",
    excerpt:
      "Freshers don't lack experience, they lack presentation. How to structure personal projects, hackathons, and certifications to score 85+ on ATS.",
    date: "Oct 02, 2026",
    readTime: "7 min read",
  },
];

const CATEGORIES = ["All Guides", "ATS Hacks", "Keywords", "Bullet Points", "Formatting", "Career Strategy"];

const TAG_CLASS = {
  "ATS Hacks": "ats",
  Keywords: "keywords",
  "Bullet Points": "bullets",
  Formatting: "format",
  "Career Strategy": "career",
};

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All Guides");
  const root = useRef(null);

  const filteredPosts =
    selectedCategory === "All Guides"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.tag === selectedCategory);

  // Cards animate in from the edges whenever the filter changes
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".blog-card", {
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 0.6,
        ease: "power3.out",
        stagger: { each: 0.08, from: "edges" },
        clearProps: "transform,opacity",
      });
    }, root);
    return () => ctx.revert();
  }, [selectedCategory]);

  return (
    <div className="blog-page" ref={root}>
      <Navbar />

      {/* HEADER */}
      <header className="blog-hero">
        <p className="blog-hand">Short, practical reads</p>
        <h1>ATS and resume guides</h1>
        <p className="blog-hero__sub">
          Clear strategies and real examples to help you get past automated screening
          and into the interview.
        </p>
      </header>

      {/* LIST */}
      <main className="blog-main">
        <div className="blog-filters" role="group" aria-label="Filter guides">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`blog-filter-btn ${selectedCategory === cat ? "active" : ""}`}
              aria-pressed={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="blog-grid">
          {filteredPosts.map((post, i) => (
            <article key={post.id} className={`blog-card blog-card--${TAG_CLASS[post.tag]}`}>
              <span className="blog-card__num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="blog-tag">{post.tag}</span>
              <h3 className="blog-card__title">{post.title}</h3>
              <p className="blog-card__excerpt">{post.excerpt}</p>

              <div className="blog-card__meta">
                <span><Calendar size={13} /> {post.date}</span>
                <span><Clock size={13} /> {post.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* CTA */}
      <section className="blog-cta">
        <div className="blog-cta__card">
          <h2>Put these guides to work</h2>
          <p>
            Upload your resume and get your ATS score, keyword gaps and bullet fixes in about 30 seconds.
          </p>
          <Link to="/dashboard" className="blog-cta__btn">
            <Sparkles size={16} />
            <span>Scan my resume free</span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}