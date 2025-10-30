import React, { useEffect, useState } from "react";

/**
 * Props:
 * - onCreate(postData)
 * - onUpdate(id, postData)
 * - editing: optional post object to edit
 * - onCancel()
 */
export default function PostForm({ onCreate, onUpdate, editing, onCancel }) {
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [preview, setPreview] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (editing) {
      setAuthor(editing.author || "");
      setMessage(editing.message || "");
      setImageUrl(editing.imageUrl || "");
      setPreview(editing.imageUrl || null);
    } else {
      setAuthor("");
      setMessage("");
      setImageUrl("");
      setPreview(null);
    }
  }, [editing]);

  useEffect(() => {
    if (imageUrl) {
      setPreview(imageUrl);
    } else {
      setPreview(null);
    }
  }, [imageUrl]);

  async function submit(e) {
    e.preventDefault();
    if (!author.trim() || !message.trim()) {
      alert("Author and message are required.");
      return;
    }
    setBusy(true);
    try {
      const payload = { author: author.trim(), message: message.trim(), imageUrl: imageUrl?.trim() || null };
      if (editing) {
        await onUpdate(editing.id, payload);
      } else {
        await onCreate(payload);
        setAuthor("");
        setMessage("");
        setImageUrl("");
        setPreview(null);
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="composer" onSubmit={submit} aria-label="Create post">
      <div className="form-row">
        <div className="avatar" aria-hidden>U</div>
        <div className="input">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <strong>{editing ? "Edit Post" : "Create Post"}</strong>
            {editing && <button type="button" className="btn ghost" onClick={onCancel}>Cancel</button>}
          </div>

          <input
            aria-label="Your name"
            placeholder="Your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            type="text"
          />

          <textarea
            aria-label="What's on your mind?"
            placeholder="What's on your mind?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <input
            aria-label="Image URL (optional)"
            placeholder="Image URL (optional)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            type="text"
          />

          {preview ? <img className="post-image" src={preview} alt="Preview" /> : null}

          <div className="field-row">
            <button className="btn primary" type="submit" disabled={busy}>
              {busy ? (editing ? "Saving..." : "Posting...") : (editing ? "Save" : "Post")}
            </button>
            {!editing && <div className="subtle">Author + message required</div>}
          </div>
        </div>
      </div>
    </form>
  );
}