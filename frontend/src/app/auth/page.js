"use client";
import { useState } from "react";
import { useAuth } from "@/utils/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Auth() {
    const { login } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("login");

    // Login state
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginErr, setLoginErr] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);

    // Signup state
    const [signupName, setSignupName] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
    const [signupErr, setSignupErr] = useState("");
    const [signupLoading, setSignupLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginErr("");
        setLoginLoading(true);
        try {
            const user = await login(loginEmail, loginPassword);
            if (user.role === "super-admin" || user.role === "sub-admin") {
                router.push("/dashboard");
            } else {
                setLoginErr("Access denied. Admin privileges required.");
            }
        } catch (error) {
            setLoginErr(error.response?.data?.message || "Login failed");
        } finally {
            setLoginLoading(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setSignupErr("");

        if (signupPassword !== signupConfirmPassword) {
            setSignupErr("Passwords do not match");
            return;
        }

        setSignupLoading(true);
        try {
            // Note: Signup is disabled for public users. Only super-admins can create admin accounts
            setSignupErr("Admin account creation is restricted. Please contact a Super Admin.");
        } catch (error) {
            setSignupErr(error.response?.data?.message || "Signup failed");
        } finally {
            setSignupLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "var(--clr-bg)",
            backgroundImage: "linear-gradient(var(--clr-border) 1px, transparent 1px), linear-gradient(90deg, var(--clr-border) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            backgroundPosition: "center",
        }}>
            <Navbar />
            <div style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 68,
            }}>
                <div style={{
                    background: "var(--clr-surface)",
                    border: "1px solid var(--clr-border)",
                    borderRadius: "var(--radius)",
                    padding: "52px 44px",
                    width: "100%",
                    maxWidth: 480,
                    boxShadow: "var(--shadow)",
                }}>
                    {/* Logo */}
                    <div style={{ textAlign: "center", marginBottom: 40 }}>
                        <div style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "2rem",
                            fontWeight: 700,
                            color: "var(--clr-accent)"
                        }}>CDP</div>
                        <p style={{
                            color: "var(--clr-text-muted)",
                            fontSize: ".88rem",
                            marginTop: 6
                        }}>Admin Portal</p>
                    </div>

                    {/* Tabs */}
                    <div style={{
                        display: "flex",
                        marginBottom: 32,
                        borderBottom: "1px solid var(--clr-border)"
                    }}>
                        <button
                            onClick={() => setActiveTab("login")}
                            style={{
                                flex: 1,
                                padding: "12px 0",
                                background: "none",
                                border: "none",
                                borderBottom: activeTab === "login" ? "2px solid var(--clr-accent)" : "2px solid transparent",
                                color: activeTab === "login" ? "var(--clr-accent)" : "var(--clr-text-muted)",
                                fontSize: ".9rem",
                                fontWeight: 500,
                                cursor: "pointer",
                                transition: "all .2s"
                            }}
                        >
                            Admin Sign In
                        </button>
                        <button
                            onClick={() => setActiveTab("signup")}
                            style={{
                                flex: 1,
                                padding: "12px 0",
                                background: "none",
                                border: "none",
                                borderBottom: activeTab === "signup" ? "2px solid var(--clr-accent)" : "2px solid transparent",
                                color: activeTab === "signup" ? "var(--clr-accent)" : "var(--clr-text-muted)",
                                fontSize: ".9rem",
                                fontWeight: 500,
                                cursor: "pointer",
                                transition: "all .2s"
                            }}
                        >
                            Create Account
                        </button>
                    </div>

                    {/* Login Form */}
                    {activeTab === "login" && (
                        <div>
                            <h2 style={{ fontSize: "1.3rem", marginBottom: 6 }}>Admin Sign In</h2>
                            <p style={{
                                color: "var(--clr-text-muted)",
                                fontSize: ".85rem",
                                marginBottom: 28
                            }}>Enter your admin credentials to access the dashboard.</p>

                            {loginErr && (
                                <div className="toast toast--error" style={{
                                    position: "relative",
                                    bottom: "auto",
                                    right: "auto",
                                    marginBottom: 18
                                }}>✕ {loginErr}</div>
                            )}

                            <form onSubmit={handleLogin} style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 16
                            }}>
                                <div>
                                    <label style={{
                                        fontSize: ".78rem",
                                        color: "var(--clr-text-muted)",
                                        display: "block",
                                        marginBottom: 6
                                    }}>Email</label>
                                    <input
                                        className="input"
                                        type="email"
                                        placeholder="admin@example.com"
                                        value={loginEmail}
                                        onChange={e => setLoginEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={{
                                        fontSize: ".78rem",
                                        color: "var(--clr-text-muted)",
                                        display: "block",
                                        marginBottom: 6
                                    }}>Password</label>
                                    <input
                                        className="input"
                                        type="password"
                                        placeholder="••••••••"
                                        value={loginPassword}
                                        onChange={e => setLoginPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn--primary"
                                    style={{ marginTop: 8, justifyContent: "center" }}
                                    disabled={loginLoading}
                                >
                                    {loginLoading ? "Signing in…" : "Sign In"}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Signup Form */}
                    {activeTab === "signup" && (
                        <div>
                            <h2 style={{ fontSize: "1.3rem", marginBottom: 6 }}>Create Admin Account</h2>
                            <p style={{
                                color: "var(--clr-text-muted)",
                                fontSize: ".85rem",
                                marginBottom: 28
                            }}>Admin account creation is restricted to authorized personnel only.</p>

                            {signupErr && (
                                <div className="toast toast--error" style={{
                                    position: "relative",
                                    bottom: "auto",
                                    right: "auto",
                                    marginBottom: 18
                                }}>✕ {signupErr}</div>
                            )}

                            <form onSubmit={handleSignup} style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 16
                            }}>
                                <div>
                                    <label style={{
                                        fontSize: ".78rem",
                                        color: "var(--clr-text-muted)",
                                        display: "block",
                                        marginBottom: 6
                                    }}>Full Name</label>
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="John Doe"
                                        value={signupName}
                                        onChange={e => setSignupName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={{
                                        fontSize: ".78rem",
                                        color: "var(--clr-text-muted)",
                                        display: "block",
                                        marginBottom: 6
                                    }}>Email</label>
                                    <input
                                        className="input"
                                        type="email"
                                        placeholder="admin@example.com"
                                        value={signupEmail}
                                        onChange={e => setSignupEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={{
                                        fontSize: ".78rem",
                                        color: "var(--clr-text-muted)",
                                        display: "block",
                                        marginBottom: 6
                                    }}>Password</label>
                                    <input
                                        className="input"
                                        type="password"
                                        placeholder="••••••••"
                                        value={signupPassword}
                                        onChange={e => setSignupPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={{
                                        fontSize: ".78rem",
                                        color: "var(--clr-text-muted)",
                                        display: "block",
                                        marginBottom: 6
                                    }}>Confirm Password</label>
                                    <input
                                        className="input"
                                        type="password"
                                        placeholder="••••••••"
                                        value={signupConfirmPassword}
                                        onChange={e => setSignupConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn--primary"
                                    style={{ marginTop: 8, justifyContent: "center" }}
                                    disabled={signupLoading}
                                >
                                    {signupLoading ? "Creating account…" : "Create Account"}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
