"use client";
import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
        }}>
          <div className="card" style={{
            maxWidth: 500,
            padding: 40,
            textAlign: "center",
          }}>
            <div style={{ fontSize: "4rem", marginBottom: 16 }}>⚠️</div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: 12, color: "var(--clr-red)" }}>
              Something went wrong
            </h3>
            <p style={{ color: "var(--clr-text-muted)", marginBottom: 24, lineHeight: 1.6 }}>
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="btn btn--primary"
              style={{ margin: "0 auto" }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
