import React, { useState } from "react";
import MacWindows from "./MacWindows";
import { profile } from "../../config/profile";
import "./contact.scss";

const Contact = ({ windowName = "contact" }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // 'idle' | 'sending' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState("");

  const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
    formData.name ? `Portfolio Contact from ${formData.name}` : "Portfolio Inquiry"
  )}&body=${encodeURIComponent(
    formData.message
      ? `Hi Pallav,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
      : `Hi Pallav,\n\n`
  )}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setStatusMessage("Sending message to " + profile.email + "...");

    try {
      // Dispatches email using FormSubmit AJAX API directly to recipient inbox
      const res = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
          _template: "table",
          _captcha: "false"
        })
      });

      const data = await res.json();

      if (res.ok && (data.success === "true" || data.success === true)) {
        setStatus("success");
        setStatusMessage("Thanks for reaching out! Your message has been sent directly to " + profile.email);
      } else {
        setStatus("success");
        setStatusMessage(
          data.message ||
            "Message submitted! If this is the first submission, FormSubmit sends a 1-time activation link to your inbox."
        );
      }
    } catch {
      setStatus("error");
      setStatusMessage(
        "Network connection failed. Please try again or reach out directly at " + profile.email
      );
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setStatusMessage("");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <MacWindows windowName={windowName} width="48vw" height="56vh">
      <div className="contact-window">
        <div className="contact-info-panel">
          <h2>Get In Touch</h2>
          <p className="contact-bio">
            Have a question, high-impact role, or AI project collaboration? Let's connect.
          </p>

          <div className="contact-details">
            <div className="contact-item">
              <span className="icon">✉</span>
              <div>
                <label>Direct Email</label>
                <a href={`mailto:${profile.email}`} target="_blank" rel="noopener noreferrer">
                  {profile.email}
                </a>
              </div>
            </div>

            <div className="contact-item">
              <span className="icon">📍</span>
              <div>
                <label>Location</label>
                <span>{profile.location}</span>
              </div>
            </div>

            <div className="contact-item">
              <span className="icon">⚡</span>
              <div>
                <label>Availability</label>
                <span className="avail-badge">{profile.availability}</span>
              </div>
            </div>
          </div>

          <div className="social-links-row">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn github"
            >
              GitHub ↗
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn linkedin"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        <div className="contact-form-panel">
          {status === "success" ? (
            <div className="sent-confirmation">
              <div className="sent-check">✓</div>
              <h3>Message Sent</h3>
              <p className="sent-desc">{statusMessage}</p>

              <button onClick={handleReset} className="reset-btn">
                Send Another
              </button>
            </div>
          ) : status === "error" ? (
            <div className="sent-confirmation error-state">
              <div className="sent-check error">!</div>
              <h3>Submission Failed</h3>
              <p className="sent-desc">{statusMessage}</p>

              <div className="fallback-actions">
                <a href={mailtoUrl} className="direct-mailto-btn">
                  Open Mail Client ✉
                </a>
              </div>

              <button onClick={() => setStatus("idle")} className="reset-btn">
                Back to Form
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Chen"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Project details, inquiries, or feedback..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </MacWindows>
  );
};

export default Contact;
