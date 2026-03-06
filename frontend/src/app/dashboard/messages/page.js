"use client";
import { useState, useEffect } from "react";
import api from "@/utils/api";
import { useAuth } from "@/utils/AuthContext";

export default function DashMessages() {
  const { user }              = useAuth();
  const [messages, setMessages] = useState([]);
  const [toast,    setToast]    = useState("");

  const load = () => api.get("/messages").then(r => setMessages(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const toast$ = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const markRead = async (id) => {
    try { await api.put(`/messages/${id}`); toast$("Marked as read ✓"); load(); }
    catch (err) { toast$(err.response?.data?.message || "Error"); }
  };

  const del = async (id) => {
    if (!confirm("Delete this message?")) return;
    try { await api.delete(`/messages/${id}`); toast$("Deleted ✓"); load(); }
    catch (err) { toast$(err.response?.data?.message || "Error"); }
  };

  const pending = messages.filter(m => m.status === "pending").length;

  return (
    <div>
      {toast && <div className="toast toast--success" style={{ zIndex: 999 }}>{toast}</div>}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: "1.3rem" }}>Messages</h2>
          {pending > 0 && <span className="badge badge--red" style={{ marginTop: 6, display: "inline-block" }}>{pending} pending</span>}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {messages.map(m => (
          <div key={m._id} style={{
            background: "var(--clr-surface)",
            border: `1px solid ${m.status === "pending" ? "var(--clr-accent)44" : "var(--clr-border)"}`,
            borderRadius: "var(--radius)", padding: 22,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <h4 style={{ fontSize: "1rem" }}>{m.name}</h4>
                  <span className={`badge badge--${m.status === "pending" ? "accent" : "muted"}`}>{m.status}</span>
                </div>
                <p style={{ color: "var(--clr-text-muted)", fontSize: ".82rem", marginTop: 2 }}>{m.email} · {new Date(m.createdAt).toLocaleDateString()}</p>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {m.status === "pending" && <button className="btn btn--outline btn--sm" onClick={() => markRead(m._id)}>Mark Read</button>}
                {user.role === "super-admin" && <button className="btn btn--danger btn--sm" onClick={() => del(m._id)}>Delete</button>}
              </div>
            </div>
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--clr-border)" }}>
              <p style={{ fontSize: ".82rem", color: "var(--clr-accent)", fontWeight: 600, marginBottom: 6 }}>{m.subject}</p>
              <p style={{ color: "var(--clr-text-muted)", fontSize: ".88rem", lineHeight: 1.7 }}>{m.message}</p>
            </div>
          </div>
        ))}
        {messages.length === 0 && <p style={{ color: "var(--clr-text-muted)", textAlign: "center", padding: 60 }}>No messages yet.</p>}
      </div>
    </div>
  );
}
