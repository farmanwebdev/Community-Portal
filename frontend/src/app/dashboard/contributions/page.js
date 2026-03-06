"use client";
import { useState, useEffect } from "react";
import api from "@/utils/api";
import { useAuth } from "@/utils/AuthContext";

const EMPTY = { contributorName:"", amount:"", purpose:"hunting", date: new Date().toISOString().slice(0,10) };

export default function DashContributions() {
  const { user }                    = useAuth();
  const [list,     setList]         = useState([]);
  const [form,     setForm]         = useState(EMPTY);
  const [editId,   setEditId]       = useState(null);
  const [showForm, setShowForm]     = useState(false);
  const [toast,    setToast]        = useState("");

  const load = () => api.get("/contributions").then(r => setList(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const toast$ = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3200); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, amount: Number(form.amount) };
    try {
      if (editId) { await api.put(`/contributions/${editId}`, payload); toast$("Updated ✓"); }
      else        { await api.post("/contributions", payload);          toast$("Added ✓");   }
      setForm(EMPTY); setEditId(null); setShowForm(false); load();
    } catch (err) { toast$(err.response?.data?.message || "Error"); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this contribution?")) return;
    try { await api.delete(`/contributions/${id}`); toast$("Deleted ✓"); load(); }
    catch (err) { toast$(err.response?.data?.message || "Error"); }
  };

  const startEdit = (c) => {
    setForm({ contributorName: c.contributorName, amount: String(c.amount), purpose: c.purpose, date: c.date.slice(0,10) });
    setEditId(c._id); setShowForm(true);
  };

  const total = list.reduce((s, c) => s + c.amount, 0);

  return (
    <div>
      {toast && <div className="toast toast--success" style={{ zIndex: 999 }}>{toast}</div>}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: "1.3rem" }}>Contributions</h2>
          <p style={{ color: "var(--clr-text-muted)", fontSize: ".85rem", marginTop: 4 }}>
            Total raised: <span style={{ color: "var(--clr-accent)", fontWeight: 700 }}>${total.toLocaleString()}</span>
          </p>
        </div>
        <button className="btn btn--primary btn--sm" onClick={() => { setShowForm(!showForm); setForm(EMPTY); setEditId(null); }}>
          {showForm ? "✕ Cancel" : "+ Add Contribution"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: "var(--clr-surface)", border: "1px solid var(--clr-border)", borderRadius: "var(--radius)", padding: 28, marginBottom: 28 }}>
          <h4 style={{ marginBottom: 18, fontSize: "1rem" }}>{editId ? "Edit" : "New"} Contribution</h4>
          <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <input className="input" placeholder="Contributor Name" value={form.contributorName} onChange={e => setForm({...form, contributorName: e.target.value})} required />
            <input className="input" placeholder="Amount ($)" type="number" min="0" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} required />
            <select className="input" value={form.purpose} onChange={e => setForm({...form, purpose: e.target.value})}>
              <option value="hunting">Hunting</option>
              <option value="expedition">Expedition</option>
              <option value="donation">Donation</option>
            </select>
            <input className="input" type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} required />
            <button type="submit" className="btn btn--primary btn--sm" style={{ gridColumn: "1/-1" }}>{editId ? "Save" : "Add"}</button>
          </form>
        </div>
      )}

      {/* Table */}
      <div style={{ background: "var(--clr-surface)", border: "1px solid var(--clr-border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Contributor</th><th>Purpose</th><th>Amount</th><th>Date</th><th style={{ width: 140 }}>Actions</th></tr></thead>
            <tbody>
              {list.map(c => (
                <tr key={c._id}>
                  <td style={{ fontWeight: 500 }}>{c.contributorName}</td>
                  <td><span className={`badge badge--${c.purpose === "hunting" ? "accent" : c.purpose === "expedition" ? "green" : "muted"}`}>{c.purpose}</span></td>
                  <td style={{ color: "var(--clr-accent)", fontWeight: 600 }}>${c.amount.toLocaleString()}</td>
                  <td style={{ color: "var(--clr-text-muted)", fontSize: ".82rem" }}>{new Date(c.date).toLocaleDateString()}</td>
                  <td style={{ display: "flex", gap: 8 }}>
                    <button className="btn btn--outline btn--sm" onClick={() => startEdit(c)}>Edit</button>
                    {user.role === "super-admin" && <button className="btn btn--danger btn--sm" onClick={() => handleDelete(c._id)}>Del</button>}
                  </td>
                </tr>
              ))}
              {list.length === 0 && <tr><td colSpan={5} style={{ color: "var(--clr-text-muted)", textAlign: "center", padding: 40 }}>No contributions yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
