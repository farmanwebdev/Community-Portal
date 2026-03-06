"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    title: "Educating Tomorrow",
    sub:   "Scholarship programmes shaping the next generation of leaders.",
    bg:    "linear-gradient(135deg, #1a3a2a 0%, #0f1610 100%)",
    accent: "#4caf7a",
  },
  {
    title: "Health for All",
    sub:   "Free medical camps & wellness drives across 14 villages.",
    bg:    "linear-gradient(135deg, #2a3a1a 0%, #0f1610 100%)",
    accent: "#d4a84b",
  },
  {
    title: "Sustainable Growth",
    sub:   "Infrastructure & livelihood projects built by the community, for the community.",
    bg:    "linear-gradient(135deg, #1a2a3a 0%, #0f1610 100%)",
    accent: "#6aacf0",
  },
];

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % slides.length);
        setFade(true);
      }, 300);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const s = slides[idx];

  return (
    <section style={{
      position: "relative",
      height: "100vh",
      minHeight: 560,
      paddingTop: 68,
      display: "flex",
      alignItems: "center",
      background: s.bg,
      overflow: "hidden",
      transition: "background 1s cubic-bezier(0.4, 0, 0.2, 1)",
    }}>
      {/* Animated background elements */}
      <div style={{
        position: "absolute", inset: 0, opacity: .08,
        backgroundImage: "linear-gradient(var(--clr-border) 1px, transparent 1px), linear-gradient(90deg, var(--clr-border) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        pointerEvents: "none",
        animation: "drift 20s ease-in-out infinite",
      }}/>

      {/* Floating accent circles with animation */}
      <div style={{ 
        position: "absolute", top: "12%", right: "8%", width: 320, height: 320,
        borderRadius: "50%", border: `2px solid ${s.accent}40`, 
        transition: "border-color 1s, transform 1s",
        animation: "float 6s ease-in-out infinite",
      }}/>
      <div style={{ 
        position: "absolute", top: "20%", right: "14%", width: 200, height: 200,
        borderRadius: "50%", border: `1px solid ${s.accent}30`, 
        transition: "border-color 1s, transform 1s",
        animation: "float 8s ease-in-out infinite reverse",
      }}/>
      <div style={{ 
        position: "absolute", bottom: "10%", left: "6%", width: 140, height: 140,
        borderRadius: "50%", background: `${s.accent}10`, 
        transition: "background 1s, transform 1s",
        animation: "float 7s ease-in-out infinite",
      }}/>

      {/* Content */}
      <div className="container" style={{ 
        position: "relative", 
        zIndex: 2,
        opacity: fade ? 1 : 0,
        transform: fade ? "translateY(0)" : "translateY(20px)",
        transition: "opacity .5s, transform .5s",
      }}>
        <div className="section-label" style={{ color: s.accent, transition: "color 1s" }}>
          Community Development Portal
        </div>
        <h1 style={{ 
          fontFamily: "var(--font-display)", 
          fontSize: "clamp(2.6rem, 6vw, 4.5rem)", 
          fontWeight: 700, 
          maxWidth: 720, 
          lineHeight: 1.1,
          marginBottom: 20,
        }}>
          {s.title}
        </h1>
        <p style={{ 
          color: "var(--clr-text-muted)", 
          maxWidth: 560, 
          fontSize: "1.1rem", 
          lineHeight: 1.7,
          marginBottom: 36 
        }}>
          {s.sub}
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link href="/projects" className="btn btn--primary" style={{ animation: "fadeIn 1s ease-out .3s both" }}>
            Explore Projects
          </Link>
          <Link href="/contact" className="btn btn--outline" style={{ animation: "fadeIn 1s ease-out .5s both" }}>
            Get in Touch
          </Link>
        </div>
      </div>

      {/* Enhanced dots with progress indicator */}
      <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 12, zIndex: 2 }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} style={{
            width: i === idx ? 32 : 12, 
            height: 12, 
            borderRadius: 6,
            background: i === idx ? s.accent : "var(--clr-border)",
            border: "none", 
            cursor: "pointer", 
            transition: "width .4s cubic-bezier(0.4, 0, 0.2, 1), background .4s",
            position: "relative",
            overflow: "hidden",
          }}>
            {i === idx && (
              <div style={{
                position: "absolute",
                top: 0, left: 0, bottom: 0,
                background: "rgba(255,255,255,.3)",
                animation: "progress 5s linear",
                transformOrigin: "left",
              }}/>
            )}
          </button>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes drift {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(20px) translateY(-20px); }
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}
