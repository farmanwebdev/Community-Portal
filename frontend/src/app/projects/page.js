"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import api    from "@/utils/api";

export default function Projects() {
  const [projects,  setProjects]  = useState([]);
  const [category,  setCategory]  = useState("all");
  const [status,    setStatus]    = useState("all");
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    api.get("/projects").then(r => setProjects(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = projects.filter(p =>
    (category === "all" || p.category === category) &&
    (status   === "all" || p.status   === status)
  );

  return (
    <>
      <Navbar />

      {/* Page header */}
      <div style={{
        marginTop: 68, height: 260,
        background: "linear-gradient(135deg, #162019 0%, #0f1610 100%)",
        display: "flex", alignItems: "center",
        borderBottom: "1px solid var(--clr-border)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: .05,
          backgroundImage: "linear-gradient(var(--clr-border) 1px, transparent 1px), linear-gradient(90deg, var(--clr-border) 1px, transparent 1px)",
          backgroundSize: "60px 60px" }}/>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="section-label">Explore</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)" }}>
            Our <span style={{ color: "var(--clr-accent)" }}>Projects</span>
          </h1>
        </div>
      </div>

      <section style={{ padding: "60px 0 100px" }}>
        <div className="container">

          {/* Filters */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 40, alignItems: "center" }}>
            <span style={{ color: "var(--clr-text-muted)", fontSize: ".85rem" }}>Filter by:</span>

            <div style={{ display: "flex", gap: 8 }}>
              {["all","education","health","development"].map(c => (
                <button key={c} onClick={() => setCategory(c)} style={{
                  padding: "8px 18px", borderRadius: 20, border: "1px solid",
                  borderColor: category === c ? "var(--clr-accent)" : "var(--clr-border)",
                  background: category === c ? "var(--clr-accent)15" : "transparent",
                  color: category === c ? "var(--clr-accent)" : "var(--clr-text-muted)",
                  fontSize: ".82rem", fontWeight: 600, cursor: "pointer", textTransform: "capitalize", transition: ".2s",
                }}>{c === "all" ? "All Categories" : c}</button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
              {["all","ongoing","completed"].map(s => (
                <button key={s} onClick={() => setStatus(s)} style={{
                  padding: "8px 18px", borderRadius: 20, border: "1px solid",
                  borderColor: status === s ? "var(--clr-green)" : "var(--clr-border)",
                  background: status === s ? "var(--clr-green)15" : "transparent",
                  color: status === s ? "var(--clr-green)" : "var(--clr-text-muted)",
                  fontSize: ".82rem", fontWeight: 600, cursor: "pointer", textTransform: "capitalize", transition: ".2s",
                }}>{s === "all" ? "All Status" : s}</button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {loading && <div className="spinner" />}

          {!loading && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
              {filtered.map(p => (
                <div key={p._id} className="card">
                  {p.media && p.media[0] && (
                    <div style={{ height: 180, background: `url(${p.media[0]}) center/cover`, position: "relative" }}>
                      <span className={`badge badge--${p.status === "ongoing" ? "green" : "muted"}`}
                            style={{ position: "absolute", top: 12, right: 12 }}>{p.status}</span>
                    </div>
                  )}
                  <div className="card__body">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <span className={`badge badge--${p.category === "education" ? "accent" : p.category === "health" ? "green" : "muted"}`}>{p.category}</span>
                      <span style={{ color: "var(--clr-text-muted)", fontSize: ".78rem" }}>{new Date(p.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h3 style={{ fontSize: "1.1rem", marginBottom: 8 }}>{p.title}</h3>
                    <p style={{ color: "var(--clr-text-muted)", fontSize: ".88rem", lineHeight: 1.7 }}>{p.description}</p>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <p style={{ color: "var(--clr-text-muted)", gridColumn: "1/-1", textAlign: "center", padding: 60 }}>
                  No projects match the current filters.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
