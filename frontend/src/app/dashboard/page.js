"use client";
import { useState, useEffect } from "react";
import api from "@/utils/api";

function StatBox({ icon, label, value, color, delay = 0 }) {
  return (
    <div className="card scale-in" style={{
      padding: "24px 28px",
      display: "flex", alignItems: "center", gap: 18,
      animationDelay: `${delay}ms`,
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: 14,
        background: `${color}18`, 
        display: "flex", alignItems: "center", justifyContent: "center", 
        fontSize: "1.8rem",
        transition: "transform .3s",
      }}
      onMouseEnter={e => e.currentTarget.style.transform = "rotate(5deg) scale(1.1)"}
      onMouseLeave={e => e.currentTarget.style.transform = "rotate(0) scale(1)"}
      >{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "2rem", fontWeight: 700, fontFamily: "var(--font-display)", color }}>{value}</div>
        <div style={{ color: "var(--clr-text-muted)", fontSize: ".82rem", marginTop: 2 }}>{label}</div>
      </div>
    </div>
  );
}

export default function DashboardHome() {
  const [projects, setProjects]           = useState([]);
  const [contributions, setContributions] = useState([]);
  const [messages, setMessages]           = useState([]);
  const [loading, setLoading]             = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/projects").then(r => setProjects(r.data)),
      api.get("/contributions").then(r => setContributions(r.data)),
      api.get("/messages").then(r => setMessages(r.data)),
    ]).finally(() => setLoading(false));
  }, []);

  const totalFunds   = contributions.reduce((s,c) => s + c.amount, 0);
  const pendingMsgs  = messages.filter(m => m.status === "pending").length;

  if (loading) return <div className="spinner" style={{ marginTop: 100 }} />;

  return (
    <div>
      {/* Welcome header */}
      <div className="fade-in" style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: "1.8rem", fontFamily: "var(--font-display)", marginBottom: 6 }}>Dashboard Overview</h2>
        <p style={{ color: "var(--clr-text-muted)", fontSize: ".92rem" }}>Welcome back! Here's what's happening with your community portal.</p>
      </div>

      {/* Stat row */}
      <div className="grid grid-auto-sm gap-md" style={{ marginBottom: 40 }}>
        <StatBox icon="📁" label="Total Projects"     value={projects.length}                  color="var(--clr-accent)" delay={0} />
        <StatBox icon="💰" label="Total Funds"        value={`$${totalFunds.toLocaleString()}`} color="var(--clr-green)" delay={100} />
        <StatBox icon="📨" label="Pending Messages"   value={pendingMsgs}                      color="var(--clr-red)"    delay={200} />
        <StatBox icon="💎" label="Contributions"      value={contributions.length}             color="#6aacf0"           delay={300} />
      </div>

      {/* Recent projects + contributions */}
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))", gap: 24 }}>
        {/* Recent Projects */}
        <div className="card slide-in" style={{ padding: 0, animationDelay: "400ms" }}>
          <div className="card-header">
            <h4 style={{ fontSize: ".95rem", fontWeight: 600 }}>Recent Projects</h4>
            <a href="/dashboard/projects" style={{ color: "var(--clr-accent)", fontSize: ".8rem", transition: "transform .2s" }}
               onMouseEnter={e => e.target.style.transform = "translateX(4px)"}
               onMouseLeave={e => e.target.style.transform = "translateX(0)"}>
              View all →
            </a>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Title</th><th>Category</th><th>Status</th></tr></thead>
              <tbody>
                {projects.slice(0,5).map(p => (
                  <tr key={p._id}>
                    <td style={{ fontWeight: 500 }}>{p.title}</td>
                    <td><span className={`badge badge--${p.category === "education" ? "accent" : p.category === "health" ? "green" : "muted"}`}>{p.category}</span></td>
                    <td><span className={`badge badge--${p.status === "ongoing" ? "green" : "muted"}`}>{p.status}</span></td>
                  </tr>
                ))}
                {projects.length === 0 && <tr><td colSpan={3} style={{ color: "var(--clr-text-muted)", textAlign: "center", padding: 40 }}>
                  <div style={{ fontSize: "2rem", marginBottom: 8 }}>📁</div>
                  No projects yet
                </td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Contributions */}
        <div className="card slide-in" style={{ padding: 0, animationDelay: "500ms" }}>
          <div className="card-header">
            <h4 style={{ fontSize: ".95rem", fontWeight: 600 }}>Recent Contributions</h4>
            <a href="/dashboard/contributions" style={{ color: "var(--clr-accent)", fontSize: ".8rem", transition: "transform .2s" }}
               onMouseEnter={e => e.target.style.transform = "translateX(4px)"}
               onMouseLeave={e => e.target.style.transform = "translateX(0)"}>
              View all →
            </a>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Name</th><th>Purpose</th><th>Amount</th></tr></thead>
              <tbody>
                {contributions.slice(0,5).map(c => (
                  <tr key={c._id}>
                    <td style={{ fontWeight: 500 }}>{c.contributorName}</td>
                    <td><span className={`badge badge--${c.purpose === "hunting" ? "accent" : c.purpose === "expedition" ? "green" : "muted"}`}>{c.purpose}</span></td>
                    <td style={{ color: "var(--clr-accent)", fontWeight: 600 }}>${c.amount.toLocaleString()}</td>
                  </tr>
                ))}
                {contributions.length === 0 && <tr><td colSpan={3} style={{ color: "var(--clr-text-muted)", textAlign: "center", padding: 40 }}>
                  <div style={{ fontSize: "2rem", marginBottom: 8 }}>💰</div>
                  No contributions yet
                </td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
