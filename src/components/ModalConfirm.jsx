import React from "react";

export default function ModalConfirm({ open, title, message, onCancel, onConfirm }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal">
        <h3 id="modal-title">{title}</h3>
        <p style={{color:'var(--muted)'}}>{message}</p>
        <div style={{display:'flex', gap:8, justifyContent:'flex-end', marginTop:12}}>
          <button className="btn ghost" onClick={onCancel}>Cancel</button>
          <button className="btn danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}