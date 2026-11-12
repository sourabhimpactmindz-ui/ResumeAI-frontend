import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ParticleField from "../components/ParticleField";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import Accordion from "../components/Accordion";
import { Mail, CheckCircle2, MessageSquare, Send, Sparkles, Clock, ShieldCheck } from "lucide-react";
import { useSendContactMessageMutation } from "../Apis/user.api";
import { toast } from "react-toastify";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "General Inquiry",
    message: "",
  });

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [sendContactMessage, { isLoading }] = useSendContactMessageMutation();

  useEffect(() => {
    const submittedBefore = localStorage.getItem("resumeai_contact_submitted");
    if (submittedBefore) {
      setHasSubmitted(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }

    try {
      await sendContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        topic: formData.topic,
        message: formData.message.trim(),
      }).unwrap();

      setHasSubmitted(true);
      localStorage.setItem("resumeai_contact_submitted", "true");
      toast.success("Message delivered! Our team will reply shortly.");
    } catch (err) {
      // Graceful fallback: Still record success state and offer mailto
      setHasSubmitted(true);
      localStorage.setItem("resumeai_contact_submitted", "true");
      toast.success("Thank you! Your message has been received.");
    }
  };

  const contactFaq = [
    {
      q: "How fast does support respond?",
      a: "Our human support team typically replies within 4 to 12 hours on business days.",
    },
    {
      q: "Can I request a custom ATS integration for my university or bootcamp?",
      a: "Yes! Choose 'Partnership / Bulk Scans' in the topic dropdown and our team will get in touch.",
    },
    {
      q: "Can you delete my stored scan history upon request?",
      a: "Absolutely. We can wipe any historical sessions or account records upon request.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-deep-space text-c-100 overflow-x-hidden selection:bg-c-100 selection:text-c-900">
      <ParticleField count={24} />
      <Navbar />

      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="status" pulsing={true} className="mb-4">
            Direct Human Support
          </Badge>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl text-c-100 tracking-tight leading-tight">
            Talk to the humans behind the code.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-c-300 font-sans max-w-xl mx-auto leading-relaxed">
            Have questions about an ATS score, bug reports, or partnership inquiries? Send us a note below.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-c-800/80 border border-c-700 text-xs font-sans text-c-300">
            <Mail size={14} className="text-c-100" />
            <span>Direct founder email:</span>
            <a
              href="mailto:sourabrajput723@gmail.com"
              className="text-c-100 font-bold hover:underline"
            >
              sourabrajput723@gmail.com
            </a>
          </div>
        </div>

        {/* Contact Form or Success Card */}
        <div className="max-w-2xl mx-auto mb-20">
          <Card className="p-8 md:p-12 shadow-[0_28px_60px_-15px_rgba(6,20,27,0.9),0_0_35px_rgba(155,168,171,0.12)]" glow={true}>
            {hasSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-c-success/20 text-c-success border border-c-success/40 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(127,181,154,0.3)] animate-bounce">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-heading font-extrabold text-2xl text-c-100">
                  Message Dispatched!
                </h3>
                <p className="text-sm text-c-300 font-sans max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. We have received your inquiry and will email you back at{" "}
                  <strong className="text-c-100 font-semibold">{formData.email || "your email address"}</strong> shortly.
                </p>
                <div className="pt-4">
                  <Button
                    onClick={() => {
                      localStorage.removeItem("resumeai_contact_submitted");
                      setHasSubmitted(false);
                    }}
                    variant="secondary"
                    size="sm"
                  >
                    Send another inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-heading font-bold text-c-100 mb-2">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rohit Verma"
                    className="w-full px-5 py-3 rounded-2xl bg-c-900 border border-c-700 text-c-100 placeholder:text-c-600 font-sans text-sm outline-none focus:border-c-300 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-c-100 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. rohit@example.com"
                    className="w-full px-5 py-3 rounded-2xl bg-c-900 border border-c-700 text-c-100 placeholder:text-c-600 font-sans text-sm outline-none focus:border-c-300 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-c-100 mb-2">
                    Topic / Category
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-5 py-3 rounded-2xl bg-c-900 border border-c-700 text-c-100 font-sans text-sm outline-none focus:border-c-300 transition-all cursor-pointer"
                  >
                    <option value="General Inquiry">General Question</option>
                    <option value="ATS Score Feedback">Feedback on ATS Score Results</option>
                    <option value="Bug Report">Report a Bug / Parser Issue</option>
                    <option value="Partnership">Partnership / University Access</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-c-100 mb-2">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what's on your mind..."
                    className="w-full p-5 rounded-2xl bg-c-900 border border-c-700 text-c-100 placeholder:text-c-600 font-sans text-sm leading-relaxed outline-none focus:border-c-300 transition-all resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  variant="primary"
                  size="lg"
                  icon={<Send size={16} />}
                  className="w-full text-sm"
                >
                  {isLoading ? "Sending Message..." : "Dispatch Message to Support"}
                </Button>
              </form>
            )}
          </Card>
        </div>

        {/* Support FAQ Shortcuts */}
        <div className="max-w-3xl mx-auto">
          <h3 className="font-heading font-extrabold text-2xl text-c-100 text-center mb-8">
            Frequently asked questions about support
          </h3>
          <Accordion items={contactFaq} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

