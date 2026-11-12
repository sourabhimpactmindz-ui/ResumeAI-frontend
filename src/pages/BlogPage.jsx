import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ParticleField from "../components/ParticleField";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import Typewriter from "../components/animations/Typewriter";
import StaggerFromEdges from "../components/animations/StaggerFromEdges";
import FloatingWrapper from "../components/animations/FloatingWrapper";
import { BLOG_POSTS } from "../data/blogData";
import { Search, ArrowRight, Clock, BookOpen, Send, Sparkles } from "lucide-react";
import { toast } from "react-toastify";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const typewriterAudience = [
    "developers & software engineers.",
    "product designers & UX leads.",
    "freshers & college graduates.",
    "career switchers & remote applicants.",
  ];

  const categories = [
    "All",
    "Algorithm Truths",
    "Keyword Strategy",
    "Writing Guides",
    "Design Pitfalls",
    "Freshers & Students",
  ];

  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCat =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Subscribed! We'll send algorithm breakdown guides to your inbox.");
    setNewsletterEmail("");
  };

  return (
    <div className="relative min-h-screen bg-deep-space text-c-100 overflow-x-hidden selection:bg-c-100 selection:text-c-900">
      <ParticleField count={28} />
      <Navbar />

      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-32 pb-24">
        {/* Hero with Typewriter */}
        <div className="text-center mb-16">
          <Badge variant="status" pulsing={true} className="mb-4">
            ATS Engineering Intelligence
          </Badge>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl text-c-100 tracking-tight leading-tight max-w-4xl mx-auto">
            Career guides and algorithm breakdowns for{" "}
            <span className="block mt-2 text-c-300 font-semibold text-2xl sm:text-4xl md:text-5xl">
              <Typewriter
                lines={typewriterAudience}
                className="text-c-100 underline decoration-c-300/40 decoration-wavy underline-offset-8"
              />
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-c-300 font-sans max-w-2xl mx-auto leading-relaxed">
            Written by engineers and recruiters who have seen thousands of resumes get silently rejected by automated parsers.
          </p>
        </div>

        {/* Featured Post Card (Large Floating Card) */}
        {featuredPost && (
          <FloatingWrapper y={8} duration={7.5} className="mb-16">
            <Card
              className="p-8 md:p-14 bg-gradient-to-br from-c-800 to-c-800/60 border border-c-700/80 shadow-[0_28px_60px_-15px_rgba(6,20,27,0.9),0_0_40px_rgba(155,168,171,0.15)] flex flex-col lg:flex-row items-center justify-between gap-8 group"
              glow={true}
              interactive={true}
            >
              <div className="max-w-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-heading font-extrabold uppercase px-3 py-1 rounded-full bg-c-100 text-c-900">
                    Featured Guide
                  </span>
                  <span className="text-xs text-c-600 font-sans">
                    {featuredPost.readTime} · {featuredPost.date}
                  </span>
                </div>

                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-c-100 group-hover:text-white transition-colors leading-tight">
                  {featuredPost.title}
                </h2>

                <p className="text-sm sm:text-base text-c-300 font-sans leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-c-700"
                  />
                  <div>
                    <p className="text-xs font-heading font-bold text-c-100">
                      {featuredPost.author.name}
                    </p>
                    <p className="text-[11px] text-c-600 font-sans">
                      {featuredPost.author.role}
                    </p>
                  </div>
                </div>
              </div>

              <div className="shrink-0 w-full lg:w-auto">
                <Button
                  to={`/blog/${featuredPost.slug}`}
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight size={18} />}
                  className="w-full lg:w-auto"
                >
                  Read Full Guide
                </Button>
              </div>
            </Card>
          </FloatingWrapper>
        )}

        {/* Search & Category Filter Pills */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-heading font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-c-100 text-c-900 shadow-md"
                    : "bg-c-800 text-c-300 border border-c-700/80 hover:border-c-600 hover:text-c-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides by keyword..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-c-800/70 border border-c-700/80 text-c-100 placeholder:text-c-600 font-sans text-xs outline-none focus:border-c-300 transition-all"
            />
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-c-600" />
          </div>
        </div>

        {/* Article Grid with StaggerFromEdges */}
        <StaggerFromEdges
          itemSelector=".article-card"
          staggerTime={0.08}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {filteredPosts.map((post) => (
            <Card
              key={post.slug}
              className="article-card p-7 flex flex-col justify-between group"
              glow={true}
              interactive={true}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-heading font-bold text-c-300 px-2.5 py-0.5 rounded-full bg-c-900 border border-c-700">
                    {post.category}
                  </span>
                  <span className="text-[11px] text-c-600 font-sans flex items-center gap-1">
                    <Clock size={12} />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <Link to={`/blog/${post.slug}`}>
                  <h3 className="font-heading font-extrabold text-xl text-c-100 group-hover:text-white transition-colors mb-2 leading-snug">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-xs text-c-300 font-sans leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-c-700/50 flex items-center justify-between">
                <span className="text-xs text-c-600 font-sans">{post.date}</span>

                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-heading font-bold text-c-100 group-hover:text-white"
                >
                  <span>Read</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Card>
          ))}
        </StaggerFromEdges>

        {/* Newsletter Signup Card */}
        <Card className="p-8 md:p-12 rounded-[36px] bg-gradient-to-r from-c-800 to-c-800/50 border border-c-700 text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-c-700/60 border border-c-600/60 flex items-center justify-center text-c-100 mb-4 shadow-md">
            <BookOpen size={22} />
          </div>

          <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-c-100 mb-2">
            Never send a blind resume again.
          </h3>

          <p className="text-sm text-c-300 font-sans max-w-md mb-6 leading-relaxed">
            Get our bi-weekly breakdown of changes to Workday, Greenhouse, and LinkedIn hiring algorithms delivered straight to your inbox.
          </p>

          <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="w-full px-5 py-3 rounded-full bg-c-900 border border-c-700 text-c-100 placeholder:text-c-600 font-sans text-xs outline-none focus:border-c-300 transition-all"
            />
            <Button type="submit" variant="primary" size="md" icon={<Send size={15} />} className="shrink-0 w-full sm:w-auto">
              Subscribe
            </Button>
          </form>

          <span className="text-[11px] text-c-600 font-sans mt-3">
            Zero spam. Unsubscribe anytime with one click.
          </span>
        </Card>
      </main>

      <Footer />
    </div>
  );
}

