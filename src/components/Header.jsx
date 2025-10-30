import React from "react";

export default function Header() {
  return (
    <header className="header" role="banner">
      <div className="container header-row" style={{ alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "#1877f2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
            }}
          >
            FP
          </div>
          <div>
            <div className="brand">Facebook Posts</div>
            <div className="subtle">A minimal posts feed</div>
          </div>
        </div>
        <nav aria-label="Main">
          <button
            className="btn ghost"
            title="Refresh posts"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        </nav>
      </div>
    </header>
  );
}