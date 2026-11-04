import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import { toast } from "react-toastify";
import { Mail, Clock, MessageSquare, Send, ArrowLeft, CheckCircle } from "lucide-react";
import "../../styles/legal-pages.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitted(true);
    toast.success("Thank you! Your message has been sent.");

    const mailto = `mailto:support@resumeai.com?subject=${encodeURIComponent(
      form.subject || "Support Request"
    )}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    )}`;

    window.open(mailto, "_blank");
  };

  return (
    <div className="legal-page-wrapper">
      <Navbar />

      <div className="legal-container legal-container-wide">
        <Link to="/home" className="legal-back-nav">
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>

        <div className="legal-header">
          <span className="legal-badge">✦ Direct Support</span>
          <h1 className="legal-title">Get in Touch with ResumeAI</h1>
          <p className="legal-subtitle">
            Have questions about ATS scoring, need help with your account, or want to share feedback?
            Our support team is ready to assist you.
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
                  <h4>Email Support</h4>
                  <p>support@resumeai.com</p>
                  <p style={{ fontSize: "12px", color: "#888" }}>For general queries and technical help</p>
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
                  <h4>Live Feedback</h4>
                  <p>Product Suggestions</p>
                  <p style={{ fontSize: "12px", color: "#888" }}>We build updates directly from user feedback</p>
                </div>
              </div>
            </div>

            <div className="legal-callout" style={{ marginTop: "28px" }}>
              <p>
                <strong>Need an instant scan?</strong> Head over to your{" "}
                <Link to="/home" style={{ textDecoration: "underline", color: "#000" }}>
                  Dashboard
                </Link>{" "}
                to check your resume match rate immediately.
              </p>
            </div>
          </div>

          {/* CONTACT FORM COLUMN */}
          <div className="contact-card">
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 10px" }}>
                <CheckCircle size={48} color="#16a34a" style={{ margin: "0 auto 16px" }} />
                <h3>Message Sent Successfully!</h3>
                <p style={{ color: "var(--muted)", marginTop: "8px" }}>
                  Thank you for reaching out, {form.name}. We have received your inquiry and our team will get back to you shortly.
                </p>
                <button
                  type="button"
                  className="contact-submit-btn"
                  style={{ marginTop: "24px" }}
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2>Send Us a Message</h2>
                <p style={{ color: "var(--muted)", fontSize: "14px", marginBottom: "20px" }}>
                  Fill out the form below and we will get back to you as soon as possible.
                </p>

                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="contact-form-group">
                    <label className="contact-label">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Rohit Sharma"
                      className="contact-input"
                      required
                    />
                  </div>

                  <div className="contact-form-group">
                    <label className="contact-label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="e.g. rohit@example.com"
                      className="contact-input"
                      required
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
                    />
                  </div>

                  <button type="submit" className="contact-submit-btn">
                    <Send size={15} />
                    <span>Send Message →</span>
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
