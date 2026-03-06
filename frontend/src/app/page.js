"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar  from "@/components/Navbar";
import Footer  from "@/components/Footer";
import Hero    from "@/components/Hero";
import api     from "@/utils/api";

/* ── stat counters shown on home ── */
function StatCard({ value, label }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", fontWeight: 700, color: "var(--clr-accent)" }}>{value}</div>
      <div style={{ color: "var(--clr-text-muted)", fontSize: ".85rem", marginTop: 4 }}>{label}</div>
    </div>
  );
}

export default function Home() {
  const [projects,      setProjects]      = useState([]);
  const [contributions, setContributions] = useState([]);
  const [msg,           setMsg]           = useState({ name:"", email:"", subject:"", message:"" });
  const [sent,          setSent]          = useState(false);

  useEffect(() => {
    api.get("/projects").then(r => setProjects(r.data)).catch(() => {});
    api.get("/contributions").then(r => setContributions(r.data)).catch(() => {});
  }, []);

  const totalContrib = contributions.reduce((s, c) => s + c.amount, 0);

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      await api.post("/messages", msg);
      setSent(true);
      setMsg({ name:"", email:"", subject:"", message:"" });
      setTimeout(() => setSent(false), 4000);
    } catch {}
  };

  /* mock members */
  const members = [
    { name: "Dr. Karim Khan",   role: "Chairman",        emoji: "👩‍⚕️" },
    { name: "Manzoor Karim",     role: "Director",        emoji: "👨‍💼" },
    { name: "Farman Saqib",    role: "Health Lead",     emoji: "👩‍🔬" },
    { name: "Alibaz Nabi",   role: "Education Head",  emoji: "👨‍🏫" },
    { name: "Sarir karim",     role: "Finance Officer", emoji: "👩‍💰" },
    { name: "Musharaf Karim",        role: "Dev Coordinator", emoji: "👨‍💻" },
  ];

  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <Hero />

      {/* ── ABOUT SNIPPET ── */}
      <section style={{ padding: "100px 0 80px" }}>
        <div className="container about-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 64, alignItems: "center" }}>
          <div>
            <div className="section-label">Who We Are</div>
            <h2 className="section-title">Driving Change,<br/><span style={{ color: "var(--clr-accent)" }}>One Life at a Time</span></h2>
            <p style={{ color: "var(--clr-text-muted)", lineHeight: 1.8, marginBottom: 20 }}>
              The Community Development Portal was founded to bridge the gap between ambition and action.
              We believe every community deserves access to quality education, reliable healthcare, and sustainable livelihoods.
            </p>
            <Link href="/about" className="btn btn--outline">Learn More</Link>
          </div>
          {/* Stats box */}
          <div style={{
            background: "var(--clr-surface)", border: "1px solid var(--clr-border)",
            borderRadius: "var(--radius)", padding: 48,
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40,
          }}>
            <StatCard value={projects.length} label="Active Projects" />
            <StatCard value={contributions.length} label="Contributions" />
            <StatCard value={`$${(totalContrib/1000).toFixed(1)}k`} label="Funds Raised" />
            <StatCard value={members.length} label="Team Members" />
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section style={{ padding: "80px 0", background: "var(--clr-surface)", borderTop: "1px solid var(--clr-border)", borderBottom: "1px solid var(--clr-border)" }}>
        <div className="container">
          <div className="section-label">What We Do</div>
          <h2 className="section-title">Our Projects</h2>
          <p className="section-sub">Ongoing & completed initiatives across education, health and development.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {projects.slice(0, 6).map(p => (
              <div key={p._id} className="card">
                <div style={{ padding: "20px 24px 8px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span className={`badge badge--${p.category === "education" ? "accent" : p.category === "health" ? "green" : "muted"}`}>{p.category}</span>
                  <span className={`badge badge--${p.status === "ongoing" ? "green" : "muted"}`}>{p.status}</span>
                </div>
                <div className="card__body" style={{ paddingTop: 8 }}>
                  <h3 style={{ fontSize: "1.1rem", marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ color: "var(--clr-text-muted)", fontSize: ".88rem", lineHeight: 1.7 }}>{p.description.slice(0,120)}…</p>
                </div>
              </div>
            ))}
            {projects.length === 0 && <p style={{ color: "var(--clr-text-muted)", gridColumn: "1/-1" }}>No projects yet — check back soon.</p>}
          </div>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/projects" className="btn btn--outline">View All Projects</Link>
          </div>
        </div>
      </section>

      {/* ── CONTRIBUTIONS ── */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <div className="section-label">Giving Back</div>
          <h2 className="section-title">Community <span style={{ color: "var(--clr-accent)" }}>Contributions</span></h2>
          <p className="section-sub">Visitors, hunters, and donors who have supported our mission.</p>

          <div style={{ background: "var(--clr-surface)", border: "1px solid var(--clr-border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Contributor</th>
                    <th>Purpose</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {contributions.slice(0, 8).map(c => (
                    <tr key={c._id}>
                      <td>{c.contributorName}</td>
                      <td><span className={`badge badge--${c.purpose === "hunting" ? "accent" : c.purpose === "expedition" ? "green" : "muted"}`}>{c.purpose}</span></td>
                      <td style={{ color: "var(--clr-accent)", fontWeight: 600 }}>${c.amount.toLocaleString()}</td>
                      <td style={{ color: "var(--clr-text-muted)" }}>{new Date(c.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {contributions.length === 0 && <tr><td colSpan={4} style={{ color: "var(--clr-text-muted)", textAlign: "center", padding: 40 }}>No contributions recorded yet.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── MEMBERS ── */}
      <section style={{ padding: "80px 0", background: "var(--clr-surface)", borderTop: "1px solid var(--clr-border)", borderBottom: "1px solid var(--clr-border)" }}>
        <div className="container">
          <div className="section-label">The Team</div>
          <h2 className="section-title" style={{ textAlign: "center" }}>Meet Our <span style={{ color: "var(--clr-accent)" }}>Members</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 24, marginTop: 48 }}>
            {members.map((m, i) => (
              <div key={i} className="card" style={{ textAlign: "center" }}>
                <div style={{ fontSize: "3rem", padding: "28px 0 12px" }}>{m.emoji}</div>
                <div className="card__body" style={{ paddingTop: 0 }}>
                  <h4 style={{ fontSize: "1rem" }}>{m.name}</h4>
                  <p style={{ color: "var(--clr-text-muted)", fontSize: ".82rem", marginTop: 4 }}>{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section style={{ padding: "80px 0" }}>
        <div className="container" style={{ maxWidth: 680, margin: "0 auto" }}>
          <div className="section-label" style={{ textAlign: "center" }}>Say Hello</div>
          <h2 className="section-title" style={{ textAlign: "center" }}>Get In <span style={{ color: "var(--clr-accent)" }}>Touch</span></h2>
          <p className="section-sub" style={{ textAlign: "center", margin: "0 auto 40px" }}>Have a question or want to collaborate? We'd love to hear from you.</p>

          {sent && <div className="toast toast--success" style={{ position: "relative", bottom: "auto", right: "auto", marginBottom: 24 }}>✓ Message sent successfully!</div>}

          <form onSubmit={handleSend} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 18 }}>
              <input className="input" placeholder="Your Name" value={msg.name} onChange={e => setMsg({...msg, name: e.target.value})} required />
              <input className="input" placeholder="Email Address" type="email" value={msg.email} onChange={e => setMsg({...msg, email: e.target.value})} required />
            </div>
            <input className="input" placeholder="Subject" value={msg.subject} onChange={e => setMsg({...msg, subject: e.target.value})} required />
            <textarea className="input" placeholder="Your message…" value={msg.message} onChange={e => setMsg({...msg, message: e.target.value})} required />
            <button type="submit" className="btn btn--primary" style={{ alignSelf: "flex-start" }}>Send Message</button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
