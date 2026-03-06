"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const values = [
  { icon: "🌱", title: "Sustainability",  desc: "Every programme is built for long-term community ownership and environmental balance." },
  { icon: "🤝", title: "Inclusivity",     desc: "We ensure every voice — regardless of age, gender, or background — is heard and valued." },
  { icon: "📚", title: "Education First", desc: "Knowledge is the single most powerful catalyst for lasting change." },
  { icon: "💚", title: "Health & Care",   desc: "Healthy communities are the foundation of everything else we aim to achieve." },
];

const leadership = [
  { name: "Dr. Karim Khan",   role: "Chairman & Founder",   emoji: "👨‍💼", bio: "20+ years in public health policy across three continents." },
  { name: "Manzoor karim",     role: "Executive Director",   emoji: "👨‍💼", bio: "Former UN development advisor. Leads day-to-day strategy." },
  { name: "Fatima Sultan",    role: "Health Programme Lead", emoji: "👩‍🔬", bio: "Epidemiologist focused on preventive care in rural areas." },
  { name: "Amin Khan",   role: "Education Head",       emoji: "👨‍🏫", bio: "Built 12 community schools before joining CDP." },
  { name: "Farman saqib",     role: "Finance Officer",      emoji: "👨‍💼", bio: "CPA & impact-investing specialist." },
  { name: "Alibaz Nabi",        role: "Dev Coordinator",      emoji: "👨‍💻", bio: "Civil engineer turned community builder." },
];

export default function About() {
  return (
    <>
      <Navbar />

      {/* Hero banner */}
      <div style={{
        marginTop: 68,
        height: 320,
        background: "linear-gradient(135deg, #162019 0%, #0f1610 100%)",
        display: "flex", alignItems: "center",
        borderBottom: "1px solid var(--clr-border)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: .05,
          backgroundImage: "linear-gradient(var(--clr-border) 1px, transparent 1px), linear-gradient(90deg, var(--clr-border) 1px, transparent 1px)",
          backgroundSize: "60px 60px" }}/>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="section-label">About Us</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 5vw, 3.4rem)" }}>
            Our <span style={{ color: "var(--clr-accent)" }}>Story</span>
          </h1>
        </div>
      </div>

      {/* Mission & Vision */}
      <section style={{ padding: "80px 0" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>
          <div style={{ background: "var(--clr-surface)", border: "1px solid var(--clr-border)", borderRadius: "var(--radius)", padding: 40 }}>
            <div style={{ fontSize: "2rem", marginBottom: 12 }}>🎯</div>
            <h3 style={{ fontSize: "1.3rem", marginBottom: 14, color: "var(--clr-accent)" }}>Our Mission</h3>
            <p style={{ color: "var(--clr-text-muted)", lineHeight: 1.8 }}>
              To create a world where every community has the tools, knowledge, and support needed to thrive —
              through education, healthcare, and sustainable development programmes driven by local talent.
            </p>
          </div>
          <div style={{ background: "var(--clr-surface)", border: "1px solid var(--clr-border)", borderRadius: "var(--radius)", padding: 40 }}>
            <div style={{ fontSize: "2rem", marginBottom: 12 }}>🌍</div>
            <h3 style={{ fontSize: "1.3rem", marginBottom: 14, color: "var(--clr-accent)" }}>Our Vision</h3>
            <p style={{ color: "var(--clr-text-muted)", lineHeight: 1.8 }}>
              A future in which communities are self-sustaining, empowered, and connected —
              where innovation meets compassion to solve the challenges that matter most.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section style={{ padding: "60px 0 80px", background: "var(--clr-surface)", borderTop: "1px solid var(--clr-border)", borderBottom: "1px solid var(--clr-border)" }}>
        <div className="container">
          <div className="section-label" style={{ textAlign: "center" }}>What We Stand For</div>
          <h2 className="section-title" style={{ textAlign: "center" }}>Core <span style={{ color: "var(--clr-accent)" }}>Values</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24, marginTop: 48 }}>
            {values.map((v,i) => (
              <div key={i} className="card">
                <div className="card__body">
                  <div style={{ fontSize: "1.8rem", marginBottom: 12 }}>{v.icon}</div>
                  <h4 style={{ fontSize: "1.05rem", marginBottom: 8 }}>{v.title}</h4>
                  <p style={{ color: "var(--clr-text-muted)", fontSize: ".88rem", lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Hierarchy */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <div className="section-label" style={{ textAlign: "center" }}>Leadership</div>
          <h2 className="section-title" style={{ textAlign: "center" }}>Chairman & <span style={{ color: "var(--clr-accent)" }}>Members</span></h2>

          {/* Chairman highlight */}
          <div style={{
            maxWidth: 400, margin: "40px auto 48px",
            background: "var(--clr-surface)", border: "1px solid var(--clr-accent)44",
            borderRadius: "var(--radius)", padding: 36, textAlign: "center",
          }}>
            <div style={{ fontSize: "4rem" }}>{leadership[0].emoji}</div>
            <h3 style={{ fontSize: "1.25rem", marginTop: 8 }}>{leadership[0].name}</h3>
            <span className="badge badge--accent" style={{ marginTop: 6, display: "inline-block" }}>{leadership[0].role}</span>
            <p style={{ color: "var(--clr-text-muted)", fontSize: ".88rem", marginTop: 12 }}>{leadership[0].bio}</p>
          </div>

          {/* Connector line */}
          <div style={{ width: 2, height: 40, background: "var(--clr-border)", margin: "0 auto" }}/>

          {/* Rest of members */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 20, marginTop: 24 }}>
            {leadership.slice(1).map((m,i) => (
              <div key={i} className="card" style={{ textAlign: "center" }}>
                <div className="card__body">
                  <div style={{ fontSize: "2.4rem" }}>{m.emoji}</div>
                  <h4 style={{ fontSize: ".95rem", marginTop: 8 }}>{m.name}</h4>
                  <span className="badge badge--muted" style={{ marginTop: 6, display: "inline-block" }}>{m.role}</span>
                  <p style={{ color: "var(--clr-text-muted)", fontSize: ".8rem", marginTop: 10, lineHeight: 1.6 }}>{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
