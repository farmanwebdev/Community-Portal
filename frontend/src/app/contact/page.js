"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import api    from "@/utils/api";

export default function Contact() {
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [sent, setSent] = useState(false);
  const [err,  setErr]  = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await api.post("/messages", form);
      setSent(true);
      setForm({ name:"", email:"", subject:"", message:"" });
      setTimeout(() => setSent(false), 5000);
    } catch (error) {
      setErr(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <>
      <Navbar />

      {/* Banner */}
      <div style={{
        marginTop: 68, height: 260,
        background: "linear-gradient(135deg, #1a2a3a 0%, #0f1610 100%)",
        display: "flex", alignItems: "center",
        borderBottom: "1px solid var(--clr-border)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: .05,
          backgroundImage: "linear-gradient(var(--clr-border) 1px, transparent 1px), linear-gradient(90deg, var(--clr-border) 1px, transparent 1px)",
          backgroundSize: "60px 60px" }}/>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="section-label">Reach Us</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)" }}>
            Contact <span style={{ color: "var(--clr-accent)" }}>Us</span>
          </h1>
        </div>
      </div>

      <section style={{ padding: "80px 0 120px" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 64, alignItems: "start" }}>

          {/* Info cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {[
              { icon: "📍", title: "Address",  text: "123 Community Lane\nGreen Valley, GV 10001" },
              { icon: "📧", title: "Email",    text: "info@cdportal.org" },
              { icon: "📞", title: "Phone",    text: "+1 (555) 012-3456" },
              { icon: "🕐", title: "Hours",    text: "Mon–Fri  9:00 AM – 5:00 PM" },
            ].map((c,i) => (
              <div key={i} style={{
                background: "var(--clr-surface)", border: "1px solid var(--clr-border)",
                borderRadius: "var(--radius)", padding: "22px 24px",
                display: "flex", gap: 18, alignItems: "flex-start",
              }}>
                <div style={{ fontSize: "1.6rem" }}>{c.icon}</div>
                <div>
                  <h4 style={{ fontSize: ".95rem", marginBottom: 4 }}>{c.title}</h4>
                  <p style={{ color: "var(--clr-text-muted)", fontSize: ".88rem", whiteSpace: "pre-line" }}>{c.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div style={{
            background: "var(--clr-surface)", border: "1px solid var(--clr-border)",
            borderRadius: "var(--radius)", padding: 44,
          }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: 8 }}>Send a Message</h2>
            <p style={{ color: "var(--clr-text-muted)", fontSize: ".88rem", marginBottom: 28 }}>
              Fill out the form below and our team will get back to you within 24 hours.
            </p>

            {sent && <div className="toast toast--success" style={{ position: "relative", bottom: "auto", right: "auto", marginBottom: 20 }}>✓ Message sent successfully!</div>}
            {err  && <div className="toast toast--error"   style={{ position: "relative", bottom: "auto", right: "auto", marginBottom: 20 }}>✕ {err}</div>}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ fontSize: ".78rem", color: "var(--clr-text-muted)", display: "block", marginBottom: 6 }}>Name</label>
                  <input className="input" placeholder="John Doe" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                </div>
                <div>
                  <label style={{ fontSize: ".78rem", color: "var(--clr-text-muted)", display: "block", marginBottom: 6 }}>Email</label>
                  <input className="input" placeholder="john@example.com" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
                </div>
              </div>
              <div>
                <label style={{ fontSize: ".78rem", color: "var(--clr-text-muted)", display: "block", marginBottom: 6 }}>Subject</label>
                <input className="input" placeholder="How can we help?" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required />
              </div>
              <div>
                <label style={{ fontSize: ".78rem", color: "var(--clr-text-muted)", display: "block", marginBottom: 6 }}>Message</label>
                <textarea className="input" placeholder="Tell us more…" value={form.message} onChange={e => setForm({...form, message: e.target.value})} required />
              </div>
              <button type="submit" className="btn btn--primary" style={{ marginTop: 8 }}>Send Message</button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
