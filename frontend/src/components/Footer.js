"use client";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: "var(--clr-surface)",
      borderTop: "1px solid var(--clr-border)",
      padding: "56px 0 28px",
    }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--clr-accent)", marginBottom: 12 }}>CDP</div>
            <p style={{ color: "var(--clr-text-muted)", fontSize: ".88rem", lineHeight: 1.7 }}>
              Empowering communities through sustainable education, health, and development initiatives.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontSize: ".75rem", letterSpacing: ".15em", textTransform: "uppercase", color: "var(--clr-text-muted)", marginBottom: 18 }}>Quick Links</h4>
            {["/", "/about", "/projects", "/contact"].map((href, i) => (
              <Link key={i} href={href} style={{ display: "block", color: "var(--clr-text-muted)", fontSize: ".88rem", padding: "5px 0", transition: "color .2s" }}
                 onMouseEnter={e => e.target.style.color = "var(--clr-accent)"}
                 onMouseLeave={e => e.target.style.color = "var(--clr-text-muted)"}>
                {["Home","About","Projects","Contact"][i]}
              </Link>
            ))}
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ fontSize: ".75rem", letterSpacing: ".15em", textTransform: "uppercase", color: "var(--clr-text-muted)", marginBottom: 18 }}>Focus Areas</h4>
            {["Education","Health","Development"].map(c => (
              <div key={c} style={{ color: "var(--clr-text-muted)", fontSize: ".88rem", padding: "5px 0" }}>● {c}</div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: ".75rem", letterSpacing: ".15em", textTransform: "uppercase", color: "var(--clr-text-muted)", marginBottom: 18 }}>Contact</h4>
            <p style={{ color: "var(--clr-text-muted)", fontSize: ".88rem", lineHeight: 1.8 }}>
              123 Community Lane<br/>
              Green Valley, GV 10001<br/>
              <a href="mailto:info@cdportal.org" style={{ color: "var(--clr-accent)" }}>info@cdportal.org</a>
            </p>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--clr-border)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ color: "var(--clr-text-muted)", fontSize: ".8rem" }}>© {year} Community Development Portal. All rights reserved.</p>
          <p style={{ color: "var(--clr-text-muted)", fontSize: ".8rem" }}>Built with Node.js · Next.js · MongoDB</p>
        </div>
      </div>
    </footer>
  );
}
