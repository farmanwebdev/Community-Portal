"use client";
import { useAuth } from "@/utils/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/dashboard",                  label: "Overview",      icon: "📊", roles: ["super-admin","sub-admin"] },
  { href: "/dashboard/projects",         label: "Projects",      icon: "📁", roles: ["super-admin","sub-admin"] },
  { href: "/dashboard/contributions",    label: "Contributions", icon: "💰", roles: ["super-admin","sub-admin"] },
  { href: "/dashboard/messages",         label: "Messages",      icon: "📨", roles: ["super-admin","sub-admin"] },
  { href: "/dashboard/users",            label: "Users",         icon: "👥", roles: ["super-admin"] },
];

export default function DashboardLayout({ children }) {
  const { user, loading, logout } = useAuth();
  const router    = useRouter();
  const pathname  = usePathname();
  const [sideOpen, setSideOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  if (loading || !user) return <div className="spinner" style={{ marginTop: 200 }} />;

  const visibleNav = navItems.filter(n => n.roles.includes(user.role));

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={{
        width: 240, minHeight: "100vh", background: "var(--clr-surface)",
        borderRight: "1px solid var(--clr-border)",
        display: "flex", flexDirection: "column",
        position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 50,
        transform: sideOpen || typeof window !== "undefined" && window.innerWidth > 768 ? "translateX(0)" : "translateX(-100%)",
        transition: "transform .3s",
      }}>
        {/* Logo */}
        <div style={{ padding: "24px 20px", borderBottom: "1px solid var(--clr-border)" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700, color: "var(--clr-accent)" }}>CDP</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--clr-surface-alt)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>
              {user.role === "super-admin" ? "👑" : "🛡️"}
            </div>
            <div>
              <div style={{ fontSize: ".88rem", fontWeight: 600 }}>{user.name}</div>
              <span className={`badge badge--${user.role === "super-admin" ? "accent" : "green"}`} style={{ fontSize: ".65rem" }}>{user.role}</span>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
          {visibleNav.map(item => {
            const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <a key={item.href} href={item.href} onClick={() => setSideOpen(false)}
                 style={{
                   display: "flex", alignItems: "center", gap: 12, padding: "11px 14px",
                   borderRadius: 8, marginBottom: 2, textDecoration: "none",
                   background: active ? "var(--clr-accent)12" : "transparent",
                   color: active ? "var(--clr-accent)" : "var(--clr-text-muted)",
                   fontSize: ".9rem", fontWeight: active ? 600 : 400,
                   transition: "background .2s, color .2s",
                   borderLeft: active ? "3px solid var(--clr-accent)" : "3px solid transparent",
                 }}>
                <span>{item.icon}</span> {item.label}
              </a>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: "16px 12px", borderTop: "1px solid var(--clr-border)" }}>
          <button onClick={logout} className="btn btn--outline btn--sm" style={{ width: "100%", justifyContent: "center" }}>Logout</button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, marginLeft: 240, minHeight: "100vh" }}>
        {/* Top bar */}
        <header style={{
          position: "sticky", top: 0, zIndex: 40,
          background: "rgba(15,22,16,.92)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--clr-border)",
          padding: "0 28px", height: 60,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <button onClick={() => setSideOpen(!sideOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", fontSize: "1.4rem", color: "var(--clr-text)" }} className="hamburger-dash">☰</button>
          <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>
            {visibleNav.find(n => pathname === n.href || (n.href !== "/dashboard" && pathname.startsWith(n.href)))?.label || "Dashboard"}
          </h3>
          <span style={{ color: "var(--clr-text-muted)", fontSize: ".82rem" }}>{new Date().toLocaleDateString("en-US", { weekday:"long", year:"numeric", month:"long", day:"numeric" })}</span>
        </header>

        <main style={{ padding: 28 }}>
          {children}
        </main>
      </div>

      {/* Mobile overlay */}
      {sideOpen && <div onClick={() => setSideOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", zIndex: 40 }}/>}

      <style>{`
        @media (max-width: 768px) {
          aside { transform: translateX(${sideOpen ? "0" : "-100%"}); }
          .hamburger-dash { display: block !important; }
          main { margin-left: 0 !important; }
          div[style*="marginLeft: 240"] { margin-left: 0 !important; }
        }
      `}</style>
    </div>
  );
}
