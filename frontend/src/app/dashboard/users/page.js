"use client";
import { useState, useEffect } from "react";
import api from "@/utils/api";
import { useAuth } from "@/utils/AuthContext";

export default function DashUsers() {
  const { user: me }           = useAuth();
  const [users,  setUsers]     = useState([]);
  const [toast,  setToast]     = useState("");
  const [regForm, setRegForm]  = useState({ name:"", email:"", password:"", role:"sub-admin" });
  const [showReg, setShowReg]  = useState(false);

  const load = () => api.get("/users").then(r => setUsers(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const toast$ = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  /* Register new user */
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", regForm);
      toast$("User created ✓");
      setRegForm({ name:"", email:"", password:"", role:"sub-admin" });
      setShowReg(false);
      load();
    } catch (err) { toast$(err.response?.data?.message || "Error"); }
  };

  /* Update role */
  const changeRole = async (id, role) => {
    try { await api.put(`/users/${id}`, { role }); toast$("Role updated ✓"); load(); }
    catch (err) { toast$(err.response?.data?.message || "Error"); }
  };

  /* Delete */
  const del = async (id) => {
    if (!confirm("Remove this user?")) return;
    try { await api.delete(`/users/${id}`); toast$("User removed ✓"); load(); }
    catch (err) { toast$(err.response?.data?.message || "Error"); }
  };

  if (me?.role !== "super-admin") return <p style={{ color: "var(--clr-text-muted)", padding: 40 }}>Access restricted to Super Admins.</p>;

  return (
    <div>
      {toast && <div className="toast toast--success" style={{ zIndex: 999 }}>{toast}</div>}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontSize: "1.3rem" }}>User Management</h2>
        <button className="btn btn--primary btn--sm" onClick={() => setShowReg(!showReg)}>
          {showReg ? "✕ Cancel" : "+ Add User"}
        </button>
      </div>

      {/* Register form */}
      {showReg && (
        <div style={{ background: "var(--clr-surface)", border: "1px solid var(--clr-border)", borderRadius: "var(--radius)", padding: 24, marginBottom: 24 }}>
          <h4 style={{ marginBottom: 16, fontSize: "1rem" }}>Register New User</h4>
          <form onSubmit={handleRegister} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <input className="input" placeholder="Full Name" value={regForm.name} onChange={e => setRegForm({...regForm, name: e.target.value})} required />
            <input className="input" placeholder="Email" type="email" value={regForm.email} onChange={e => setRegForm({...regForm, email: e.target.value})} required />
            <input className="input" placeholder="Password" type="password" value={regForm.password} onChange={e => setRegForm({...regForm, password: e.target.value})} required />
            <select className="input" value={regForm.role} onChange={e => setRegForm({...regForm, role: e.target.value})}>
              <option value="sub-admin">Sub Admin</option>
              <option value="member">Member</option>
            </select>
            <button type="submit" className="btn btn--primary btn--sm" style={{ gridColumn: "1/-1" }}>Create User</button>
          </form>
        </div>
      )}

      {/* Table */}
      <div style={{ background: "var(--clr-surface)", border: "1px solid var(--clr-border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th style={{ width: 180 }}>Actions</th></tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td style={{ fontWeight: 500 }}>{u.name}</td>
                  <td style={{ color: "var(--clr-text-muted)" }}>{u.email}</td>
                  <td>
                    <select className="input" style={{ width: "auto", padding: "6px 10px", fontSize: ".82rem" }}
                      value={u.role} onChange={e => changeRole(u._id, e.target.value)} disabled={u._id === me._id}>
                      <option value="super-admin">Super Admin</option>
                      <option value="sub-admin">Sub Admin</option>
                      <option value="member">Member</option>
                    </select>
                  </td>
                  <td style={{ color: "var(--clr-text-muted)", fontSize: ".82rem" }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td>
                    {u._id !== me._id && <button className="btn btn--danger btn--sm" onClick={() => del(u._id)}>Remove</button>}
                    {u._id === me._id  && <span style={{ color: "var(--clr-text-muted)", fontSize: ".78rem" }}>(You)</span>}
                  </td>
                </tr>
              ))}
              {users.length === 0 && <tr><td colSpan={5} style={{ color: "var(--clr-text-muted)", textAlign: "center", padding: 40 }}>No users found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
