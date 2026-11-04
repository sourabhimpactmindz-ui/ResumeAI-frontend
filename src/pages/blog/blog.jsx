import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight, Sparkles } from "lucide-react";
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
    title: "Why Two-Column and Can-va Resume Templates Break Parsing",
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
      "Freshers don't lack experience—they lack presentation. How to structure personal projects, hackathons, and certifications to score 85+ on ATS.",
    date: "Oct 02, 2026",
    readTime: "7 min read",
  },
];

const CATEGORIES = ["All Guides", "ATS Hacks", "Keywords", "Bullet Points", "Formatting", "Career Strategy"];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All Guides");

  const filteredPosts =
    selectedCategory === "All Guides"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.tag === selectedCategory);

  return (
    <div className="legal-page-wrapper">
      <Navbar />

      <div className="legal-container legal-container-wide">
        <Link to="/home" className="legal-back-nav">
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>

        <div className="legal-header">
          <span className="legal-badge">✦ Career Intelligence</span>
          <h1 className="legal-title">ATS Optimization & Resume Guides</h1>
          <p className="legal-subtitle">
            Actionable strategies, algorithm teardowns, and practical templates to help you pass automated recruiter
            screens and land top-tier interviews.
          </p>
        </div>

        {/* CATEGORY FILTER PILLS */}
        <div className="blog-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`blog-filter-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* BLOG POSTS GRID */}
        <div className="blog-grid">
          {filteredPosts.map((post) => (
            <article key={post.id} className="blog-card">
              <div className="blog-card-top">
                <span className="blog-tag">{post.tag}</span>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
              </div>

              <div className="blog-card-meta">
                <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                  <Calendar size={13} /> {post.date}
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                  <Clock size={13} /> {post.readTime}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* CTA CARD */}
        <div className="legal-card" style={{ marginTop: "48px", textAlign: "center" }}>
          <h2>Put These Guides into Practice</h2>
          <p style={{ color: "var(--muted)", maxWidth: "54ch", margin: "8px auto 20px" }}>
            Upload your resume now and get your instant ATS score, keyword breakdown, and bullet point fixes in under 30 seconds.
          </p>
          <Link to="/home" className="contact-submit-btn" style={{ textDecoration: "none" }}>
            <Sparkles size={16} />
            <span>Scan Resume Free on Dashboard →</span>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

