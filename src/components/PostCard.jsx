import React from "react";

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso;
  }
}

export default function PostCard({ post, onEdit, onDelete }) {
  return (
    <article className="post-card" aria-labelledby={`post-${post.id}`}>
      <div style={{display:'flex', gap:12}}>
        <div className="avatar" aria-hidden>{(post.author || "U").slice(0,1).toUpperCase()}</div>
        <div style={{flex:1}}>
          <div className="post-meta">
            <strong id={`post-${post.id}`}>{post.author}</strong>
            <span>·</span>
            <span className="subtle">{formatDate(post.createdAt)}</span>
            {post.modifiedAt && post.modifiedAt !== post.createdAt ? <span className="subtle">· edited</span> : null}
          </div>

          <div style={{whiteSpace:'pre-wrap'}}>{post.message}</div>

          {post.imageUrl ? <img className="post-image" src={post.imageUrl} alt="" /> : null}

          <div style={{display:'flex', gap:8, marginTop:10}}>
            <button className="btn ghost" onClick={onEdit} aria-label={`Edit post by ${post.author}`}>Edit</button>
            <button className="btn danger" onClick={onDelete} aria-label={`Delete post by ${post.author}`}>Delete</button>
          </div>
        </div>
      </div>
    </article>
  );
}