"use client";
import { useState, useEffect } from "react";
import api from "@/utils/api";
import { useAuth } from "@/utils/AuthContext";

const EMPTY = { title:"", description:"", category:"education", status:"ongoing", media:[] };

export default function DashProjects() {
  const { user }                        = useAuth();
  const [projects,  setProjects]        = useState([]);
  const [form,      setForm]            = useState(EMPTY);
  const [editId,    setEditId]          = useState(null);
  const [showForm,  setShowForm]        = useState(false);
  const [toast,     setToast]           = useState("");

  const load = () => api.get("/projects").then(r => setProjects(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const toast$ = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3200); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/projects/${editId}`, form);
        toast$("Project updated ✓");
      } else {
        await api.post("/projects", form);
        toast$("Project created ✓");
      }
      setForm(EMPTY); setEditId(null); setShowForm(false);
      load();
    } catch (err) { toast$(err.response?.data?.message || "Error"); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    try { await api.delete(`/projects/${id}`); toast$("Deleted ✓"); load(); }
    catch (err) { toast$(err.response?.data?.message || "Error"); }
  };

  const startEdit = (p) => {
    setForm({ title: p.title, description: p.description, category: p.category, status: p.status, media: p.media });
    setEditId(p._id); setShowForm(true);
  };

  return (
    <div>
      {toast && <div className={`toast toast--success`} style={{ zIndex: 999 }}>{toast}</div>}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <h2 style={{ fontSize: "1.3rem" }}>Projects</h2>
        <button className="btn btn--primary btn--sm" onClick={() => { setShowForm(!showForm); setForm(EMPTY); setEditId(null); }}>
          {showForm ? "✕ Cancel" : "+ New Project"}
        </button>
      </div>

      {/* Create / Edit form */}
      {showForm && (
        <div style={{
          background: "var(--clr-surface)", border: "1px solid var(--clr-border)",
          borderRadius: "var(--radius)", padding: 28, marginBottom: 28,
        }}>
          <h4 style={{ marginBottom: 18, fontSize: "1rem" }}>{editId ? "Edit Project" : "Create Project"}</h4>
          <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <input className="input" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required style={{ gridColumn: "1/-1" }} />
            <textarea className="input" placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required style={{ gridColumn: "1/-1" }} />
            <select className="input" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
              <option value="education">Education</option>
              <option value="health">Health</option>
              <option value="development">Development</option>
            </select>
            <select className="input" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
            <input className="input" placeholder="Media URL (comma separated)" value={form.media.join(",")} onChange={e => setForm({...form, media: e.target.value.split(",").map(s => s.trim()).filter(Boolean)})} style={{ gridColumn: "1/-1" }} />
            <button type="submit" className="btn btn--primary btn--sm" style={{ gridColumn: "1/-1" }}>{editId ? "Save Changes" : "Create Project"}</button>
          </form>
        </div>
      )}

      {/* Table */}
      <div style={{ background: "var(--clr-surface)", border: "1px solid var(--clr-border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Title</th><th>Category</th><th>Status</th><th>Created</th><th style={{ width: 140 }}>Actions</th></tr></thead>
            <tbody>
              {projects.map(p => (
                <tr key={p._id}>
                  <td style={{ fontWeight: 500 }}>{p.title}</td>
                  <td><span className={`badge badge--${p.category === "education" ? "accent" : p.category === "health" ? "green" : "muted"}`}>{p.category}</span></td>
                  <td><span className={`badge badge--${p.status === "ongoing" ? "green" : "muted"}`}>{p.status}</span></td>
                  <td style={{ color: "var(--clr-text-muted)", fontSize: ".82rem" }}>{new Date(p.createdAt).toLocaleDateString()}</td>
                  <td style={{ display: "flex", gap: 8 }}>
                    <button className="btn btn--outline btn--sm" onClick={() => startEdit(p)}>Edit</button>
                    {user.role === "super-admin" && <button className="btn btn--danger btn--sm" onClick={() => handleDelete(p._id)}>Del</button>}
                  </td>
                </tr>
              ))}
              {projects.length === 0 && <tr><td colSpan={5} style={{ color: "var(--clr-text-muted)", textAlign: "center", padding: 40 }}>No projects yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
