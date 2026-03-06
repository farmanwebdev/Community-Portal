"use client";
import { useState } from "react";
import { useAuth } from "@/utils/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const { login }       = useAuth();
  const router          = useRouter();
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr]         = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(""); setLoading(true);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (error) {
      setErr(error.response?.data?.message || "Login failed");
    } finally { setLoading(false); }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "var(--clr-bg)",
      backgroundImage: "linear-gradient(var(--clr-border) 1px, transparent 1px), linear-gradient(90deg, var(--clr-border) 1px, transparent 1px)",
      backgroundSize: "60px 60px", backgroundPosition: "center",
    }}>
      <div style={{
        background: "var(--clr-surface)", border: "1px solid var(--clr-border)",
        borderRadius: "var(--radius)", padding: "52px 44px", width: "100%", maxWidth: 420,
        boxShadow: "var(--shadow)",
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--clr-accent)" }}>CDP</div>
          <p style={{ color: "var(--clr-text-muted)", fontSize: ".88rem", marginTop: 6 }}>Community Development Portal</p>
        </div>

        <h2 style={{ fontSize: "1.3rem", marginBottom: 6 }}>Welcome back</h2>
        <p style={{ color: "var(--clr-text-muted)", fontSize: ".85rem", marginBottom: 28 }}>Sign in to access the dashboard.</p>

        {err && <div className="toast toast--error" style={{ position: "relative", bottom: "auto", right: "auto", marginBottom: 18 }}>✕ {err}</div>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ fontSize: ".78rem", color: "var(--clr-text-muted)", display: "block", marginBottom: 6 }}>Email</label>
            <input className="input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label style={{ fontSize: ".78rem", color: "var(--clr-text-muted)", display: "block", marginBottom: 6 }}>Password</label>
            <input className="input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn--primary" style={{ marginTop: 8, justifyContent: "center" }} disabled={loading}>
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p style={{ color: "var(--clr-text-muted)", fontSize: ".8rem", textAlign: "center", marginTop: 28 }}>
          Don't have an account? Contact a Super Admin to get access.
        </p>
      </div>
    </div>
  );
}
