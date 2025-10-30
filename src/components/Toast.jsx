import React from "react";

export default function Toast({ type = "success", message = "" }) {
  return (
    <div className={`toast ${type === "success" ? "success" : "error"}`} role="status" aria-live="polite">
      {message}
    </div>
  );
}