import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import { toast } from "react-toastify";
import { Mail, Clock, MessageSquare, Send, CheckCircle, ExternalLink, ShieldCheck } from "lucide-react";
import { useSendContactMessageMutation } from "../../Apis/user.api";
import "../../styles/legal-pages.css";

const SUPPORT_EMAIL = "sourabrajput723@gmail.com";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [sendContactMessage, { isLoading }] = useSendContactMessageMutation();

  // Check if user already submitted a message in this browser session
  useEffect(() => {
    try {
      const saved = localStorage.getItem("resumeai_contact_submitted");
      if (saved) {
        const parsed = JSON.parse(saved);
        setSubmitted(true);
        setSubmittedData(parsed);
      }
    } catch {
      // ignore JSON errors
    }
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitted) {
      toast.info("You have already submitted a message. Only one inquiry can be sent at a time.");
      return;
    }

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all required fields (Name, Email, Message).");
      return;
    }

    try {
      // 1. Send via Backend API
      await sendContactMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim() || "General Inquiry",
        message: form.message.trim(),
      }).unwrap();

      const record = {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        time: new Date().toLocaleDateString(),
      };

      localStorage.setItem("resumeai_contact_submitted", JSON.stringify(record));
      setSubmittedData(record);
      setSubmitted(true);
      toast.success("Thank you! Your message has been sent to our team.");
    } catch (err) {
      console.warn("Backend contact error, activating direct email delivery:", err);

      // Fallback: trigger direct Gmail compose link so user never loses their message
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${SUPPORT_EMAIL}&su=${encodeURIComponent(
        form.subject || "Support Request from " + form.name
      )}&body=${encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
      )}`;

      window.open(gmailUrl, "_blank");

      const record = {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        time: new Date().toLocaleDateString(),
      };

      localStorage.setItem("resumeai_contact_submitted", JSON.stringify(record));
      setSubmittedData(record);
      setSubmitted(true);
      toast.success("Your inquiry has been initiated directly via email.");
    }
  };

  return (
    <div className="legal-page-wrapper">
      <Navbar />

      <div className="legal-container legal-container-wide">
        <div className="legal-header">
          <span className="legal-badge">✦ Direct Support</span>
          <h1 className="legal-title">Get in Touch with ResumeAI</h1>
          <p className="legal-subtitle">
            Have questions about ATS scoring, need help with your account, or want to share feedback?
            Our support desk is ready to assist you.
          </p>
        </div>

        <div className="contact-grid">
          {/* CONTACT INFO COLUMN */}
          <div className="contact-card">
            <h2>Support Channels</h2>
            <p style={{ color: "var(--muted)", fontSize: "14px" }}>
              Reach out directly or send us a message through the form. We usually respond within 24 hours.
            </p>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="contact-icon-box">
                  <Mail size={20} />
                </div>
                <div>
                  <h4>Primary Support Email</h4>
                  <a
                    href={`mailto:${SUPPORT_EMAIL}`}
                    style={{ color: "#000", fontWeight: "700", textDecoration: "underline", wordBreak: "break-all" }}
                  >
                    {SUPPORT_EMAIL}
                  </a>
                  <p style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}>
                    Official inbox for technical help & account queries
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-box">
                  <Clock size={20} />
                </div>
                <div>
                  <h4>Response Time</h4>
                  <p>Within 24 Hours</p>
                  <p style={{ fontSize: "12px", color: "#888" }}>Monday to Friday · 9 AM – 6 PM IST</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-box">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h4>Feature Requests & Feedback</h4>
                  <p>Direct Developer Review</p>
                  <p style={{ fontSize: "12px", color: "#888" }}>We build updates directly from candidate feedback</p>
                </div>
              </div>
            </div>

            <div className="legal-callout" style={{ marginTop: "28px" }}>
              <p>
                <strong>Need an instant scan?</strong> Head over to your{" "}
                <Link to="/home" style={{ textDecoration: "underline", color: "#000", fontWeight: "700" }}>
                  Dashboard
                </Link>{" "}
                to check your resume match rate immediately.
              </p>
            </div>
          </div>

          {/* CONTACT FORM COLUMN */}
          <div className="contact-card">
            {submitted ? (
              <div style={{ textAlign: "center", padding: "36px 16px" }}>
                <CheckCircle size={52} color="#16a34a" style={{ margin: "0 auto 16px" }} />
                <h3 style={{ fontSize: "22px", fontWeight: "800", marginBottom: "8px" }}>
                  Message Sent Successfully!
                </h3>
                <p style={{ color: "var(--muted)", fontSize: "14.5px", lineHeight: "1.6", maxWidth: "48ch", margin: "0 auto 16px" }}>
                  Thank you for reaching out{submittedData?.name ? `, ${submittedData.name}` : ""}. Your message has been
                  delivered to our support team at <strong>{SUPPORT_EMAIL}</strong>. We will review your inquiry and reply
                  to <strong>{submittedData?.email || "your email"}</strong> shortly.
                </p>

                <div
                  style={{
                    background: "#f7f7f7",
                    border: "1px solid #e4e4e4",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    margin: "20px auto 28px",
                    fontSize: "13px",
                    color: "#555",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <ShieldCheck size={16} color="#16a34a" />
                  <span>Single Submission Enforced: Message locked to prevent duplicate spam.</span>
                </div>

                <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                  <Link
                    to="/home"
                    className="contact-submit-btn"
                    style={{ textDecoration: "none" }}
                  >
                    <span>Back to Dashboard →</span>
                  </Link>
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${SUPPORT_EMAIL}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-submit-btn"
                    style={{
                      background: "#fff",
                      color: "#000",
                      border: "1.5px solid #000",
                      textDecoration: "none",
                    }}
                  >
                    <span>Open in Gmail</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ) : (
              <>
                <h2>Send Us a Message</h2>
                <p style={{ color: "var(--muted)", fontSize: "14px", marginBottom: "20px" }}>
                  Fill out the form below. Messages are sent directly to <strong>{SUPPORT_EMAIL}</strong>.
                </p>

                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="contact-form-group">
                    <label className="contact-label">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="contact-input"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="contact-form-group">
                    <label className="contact-label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className="contact-input"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="contact-form-group">
                    <label className="contact-label">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="e.g. Question about ATS score breakdown"
                      className="contact-input"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="contact-form-group">
                    <label className="contact-label">Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      className="contact-textarea"
                      rows="5"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <button
                    type="submit"
                    className="contact-submit-btn"
                    disabled={isLoading || submitted}
                  >
                    {isLoading ? (
                      <>
                        <span className="upload-spinner" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>Send Message →</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
