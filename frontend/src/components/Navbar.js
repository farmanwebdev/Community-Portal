"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/utils/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, width: "100%", zIndex: 100,
      background: scrolled ? "rgba(15,22,16,.95)" : "rgba(15,22,16,.88)",
      backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${scrolled ? "var(--clr-accent)" : "var(--clr-border)"}`,
      transition: "background .3s, border-color .3s, box-shadow .3s",
      boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,.3)" : "none",
    }}>
      <div className="container" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 68,
      }}>
        {/* Logo */}
        <Link href="/" style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.4rem",
          fontWeight: 700,
          color: "var(--clr-accent)",
          transition: "transform .2s",
        }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
          SNT
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: 36 }} className="desktop-nav">
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{
              fontSize: ".9rem",
              color: "var(--clr-text-muted)",
              transition: "color .2s, transform .2s",
              position: "relative",
            }}
              onMouseEnter={e => {
                e.target.style.color = "var(--clr-accent)";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.target.style.color = "var(--clr-text-muted)";
                e.target.style.transform = "translateY(0)";
              }}>
              {l.label}
            </Link>
          ))}

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Link href={user && (user.role === "super-admin" || user.role === "sub-admin") ? "/dashboard" : "/auth"} className="btn btn--outline btn--sm">Dashboard</Link>
            {user && <button className="btn btn--primary btn--sm" onClick={logout}>Logout</button>}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            position: "relative",
            zIndex: 1000,
          }}
          className="hamburger"
          aria-label="Toggle menu">
          <span style={{
            display: "block", width: 26, height: 2.5, background: "var(--clr-text)",
            margin: "5px 0",
            transition: "all .3s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: open ? "rotate(45deg) translateY(7px)" : "none",
            borderRadius: 2,
          }} />
          <span style={{
            display: "block", width: 26, height: 2.5, background: "var(--clr-text)",
            margin: "5px 0",
            opacity: open ? 0 : 1,
            transition: "all .3s",
            borderRadius: 2,
          }} />
          <span style={{
            display: "block", width: 26, height: 2.5, background: "var(--clr-text)",
            margin: "5px 0",
            transition: "all .3s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: open ? "rotate(-45deg) translateY(-7px)" : "none",
            borderRadius: 2,
          }} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div style={{
        position: "fixed",
        top: 68,
        left: 0,
        right: 0,
        bottom: 0,
        background: "var(--clr-surface)",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform .4s cubic-bezier(0.4, 0, 0.2, 1)",
        padding: "32px 24px",
        overflowY: "auto",
        borderTop: "1px solid var(--clr-border)",
      }}>
        {links.map((l, i) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
            style={{
              display: "block",
              padding: "16px 0",
              color: "var(--clr-text)",
              fontSize: "1.1rem",
              borderBottom: "1px solid var(--clr-border)",
              opacity: open ? 1 : 0,
              transform: open ? "translateX(0)" : "translateX(20px)",
              transition: `all .4s cubic-bezier(0.4, 0, 0.2, 1) ${i * 50}ms`,
            }}>
            {l.label}
          </Link>
        ))}
        <div style={{ marginTop: 24, opacity: open ? 1 : 0, transition: "opacity .5s .3s" }}>
          {user
            ? <><Link href="/dashboard" onClick={() => setOpen(false)}>
              <span className="btn btn--outline btn--sm" style={{ width: "100%", justifyContent: "center", marginBottom: 12 }}>
                Dashboard
              </span>
            </Link>
              <button className="btn btn--primary btn--sm" style={{ width: "100%" }} onClick={logout}>Logout</button></>
            : <Link href="/login" onClick={() => setOpen(false)}>
              <span className="btn btn--primary btn--sm" style={{ width: "100%", justifyContent: "center" }}>Login</span>
            </Link>
          }
        </div>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div onClick={() => setOpen(false)} style={{
          position: "fixed",
          top: 68,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,.6)",
          backdropFilter: "blur(4px)",
          zIndex: -1,
          animation: "fadeIn .3s",
        }} />
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
