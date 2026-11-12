import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ParticleField from "../components/ParticleField";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { BLOG_POSTS } from "../data/blogData";
import { Clock, ArrowLeft, ArrowRight, Share2, Sparkles, BookOpen, Check } from "lucide-react";
import { toast } from "react-toastify";

export default function BlogArticlePage() {
  const { slug } = useParams();
  const [readingProgress, setReadingProgress] = useState(0);

  const post = BLOG_POSTS.find((p) => p.slug === slug) || BLOG_POSTS[0];
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  // Calculate reading progress bar at top
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Article link copied to clipboard!");
    }
  };

  return (
    <div className="relative min-h-screen bg-deep-space text-c-100 overflow-x-hidden selection:bg-c-100 selection:text-c-900">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-c-800 z-[60]">
        <div
          className="h-full bg-gradient-to-r from-c-300 to-c-100 shadow-[0_0_12px_#CCD0CF] transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <ParticleField count={20} />
      <Navbar />

      <main className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-32 pb-24">
        {/* Back navigation */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-heading font-semibold text-c-300 hover:text-c-100 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to All Career Guides</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-12 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="status">{post.category}</Badge>
            <span className="text-xs text-c-600 font-sans flex items-center gap-1.5">
              <Clock size={13} />
              <span>{post.readTime}</span>
            </span>
            <span className="text-xs text-c-600">·</span>
            <span className="text-xs text-c-600 font-sans">{post.date}</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-c-100 tracking-tight leading-[1.15]">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-c-300 font-sans leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author Chip & Share Action */}
          <div className="pt-4 border-t border-c-700/60 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-11 h-11 rounded-full object-cover border border-c-700 shadow-sm"
              />
              <div>
                <p className="text-sm font-heading font-bold text-c-100">
                  {post.author.name}
                </p>
                <p className="text-xs text-c-600 font-sans">
                  {post.author.role}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="p-2.5 rounded-full border border-c-700 bg-c-800/80 hover:bg-c-700 text-c-300 hover:text-c-100 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-heading"
              title="Share article"
            >
              <Share2 size={15} />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </header>

        {/* Article Body Content */}
        <article className="prose prose-invert max-w-[70ch] mx-auto text-c-100 font-sans text-base leading-relaxed space-y-6">
          <div
            className="space-y-6 text-c-100 leading-relaxed font-sans"
            dangerouslySetInnerHTML={{
              __html: post.content
                .replace(/### (.*)/g, '<h3 class="font-heading font-extrabold text-2xl text-c-100 mt-10 mb-4">$1</h3>')
                .replace(/#### (.*)/g, '<h4 class="font-heading font-bold text-xl text-c-100 mt-6 mb-2">$1</h4>')
                .replace(/> "(.*)"/g, '<blockquote class="border-l-2 border-c-100 pl-5 my-6 text-c-300 italic font-sans text-lg">$1</blockquote>')
                .replace(/```([\s\S]*?)```/g, '<pre class="p-5 rounded-2xl bg-c-900/90 border border-c-700/80 font-mono text-xs text-c-100 overflow-x-auto">$1</pre>')
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-c-100 font-bold">$1</strong>')
                .replace(/\*(.*?)\*/g, '<em class="text-c-300">$1</em>'),
            }}
          />

          {/* Inline CTA Card: "Try this in the scanner" */}
          <Card className="my-12 p-8 rounded-[32px] bg-gradient-to-br from-c-800 to-c-800/60 border border-c-700/80 shadow-[0_20px_45px_-10px_rgba(6,20,27,0.8)] flex flex-col sm:flex-row items-center justify-between gap-6" glow={true}>
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-heading font-bold uppercase text-c-300 flex items-center gap-1.5">
                <Sparkles size={14} className="text-c-100" />
                <span>Instant Practical Test</span>
              </span>
              <h4 className="font-heading font-extrabold text-xl text-c-100">
                Audit your resume layout right now
              </h4>
              <p className="text-xs text-c-600 font-sans max-w-sm">
                See if your current format is triggering optical parsing errors.
              </p>
            </div>

            <Button to="/scanner" variant="primary" size="md" className="shrink-0">
              Open ATS Scanner Free
            </Button>
          </Card>
        </article>

        {/* Related Articles Stack */}
        <div className="mt-20 pt-12 border-t border-c-700/60">
          <h3 className="font-heading font-extrabold text-2xl text-c-100 mb-8">
            Related algorithmic guides
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((r) => (
              <Link
                key={r.slug}
                to={`/blog/${r.slug}`}
                className="p-6 rounded-3xl bg-c-800/60 border border-c-700/60 hover:border-c-300 hover:bg-c-800/90 transition-all hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] font-heading font-bold text-c-600 uppercase block mb-2">
                    {r.category}
                  </span>
                  <h4 className="font-heading font-bold text-sm text-c-100 group-hover:text-white line-clamp-2 mb-2">
                    {r.title}
                  </h4>
                  <p className="text-xs text-c-300 font-sans line-clamp-2">
                    {r.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-c-700/40 flex items-center justify-between text-xs text-c-600">
                  <span>{r.readTime}</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

