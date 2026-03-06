"use client";

export function SkeletonCard() {
  return (
    <div className="card" style={{ padding: 24 }}>
      <div style={{
        height: 20,
        background: "var(--clr-surface-alt)",
        borderRadius: 4,
        marginBottom: 12,
        width: "60%",
        animation: "pulse 1.5s ease-in-out infinite",
      }}/>
      <div style={{
        height: 16,
        background: "var(--clr-surface-alt)",
        borderRadius: 4,
        marginBottom: 8,
        width: "100%",
        animation: "pulse 1.5s ease-in-out infinite .2s",
      }}/>
      <div style={{
        height: 16,
        background: "var(--clr-surface-alt)",
        borderRadius: 4,
        width: "80%",
        animation: "pulse 1.5s ease-in-out infinite .4s",
      }}/>
    </div>
  );
}

export function SkeletonStat() {
  return (
    <div className="card" style={{ padding: "24px 28px", display: "flex", alignItems: "center", gap: 18 }}>
      <div style={{
        width: 56,
        height: 56,
        borderRadius: 14,
        background: "var(--clr-surface-alt)",
        animation: "pulse 1.5s ease-in-out infinite",
      }}/>
      <div style={{ flex: 1 }}>
        <div style={{
          height: 28,
          background: "var(--clr-surface-alt)",
          borderRadius: 4,
          marginBottom: 8,
          width: "50%",
          animation: "pulse 1.5s ease-in-out infinite .2s",
        }}/>
        <div style={{
          height: 14,
          background: "var(--clr-surface-alt)",
          borderRadius: 4,
          width: "70%",
          animation: "pulse 1.5s ease-in-out infinite .4s",
        }}/>
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5 }) {
  return (
    <div className="card" style={{ padding: 0 }}>
      <div className="card-header">
        <div style={{
          height: 16,
          background: "var(--clr-surface-alt)",
          borderRadius: 4,
          width: 120,
          animation: "pulse 1.5s ease-in-out infinite",
        }}/>
      </div>
      <div style={{ padding: 20 }}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} style={{
            height: 40,
            background: "var(--clr-surface-alt)",
            borderRadius: 4,
            marginBottom: 12,
            animation: `pulse 1.5s ease-in-out infinite ${i * 0.1}s`,
          }}/>
        ))}
      </div>
    </div>
  );
}
