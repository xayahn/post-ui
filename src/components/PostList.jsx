import React from "react";
import PostCard from "./PostCard";

export default function PostList({ posts = [], loading = false, onEdit, onDelete }) {
  if (loading) {
    // show 3 skeleton cards
    return (
      <div>
        {[1,2,3].map((i) => (
          <article key={i} className="post-card">
            <div style={{display:'flex', gap:12}}>
              <div className="skeleton" style={{width:44, height:44, borderRadius:22}}></div>
              <div style={{flex:1}}>
                <div className="skeleton" style={{height:12, width:'30%', borderRadius:6, marginBottom:8}}></div>
                <div className="skeleton" style={{height:12, width:'70%', borderRadius:6, marginBottom:6}}></div>
                <div className="skeleton" style={{height:200, width:'100%', borderRadius:8}}></div>
              </div>
            </div>
          </article>
        ))}
      </div>
    );
  }

  if (!posts.length) {
    return <div className="subtle">No posts yet — be the first to post!</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onEdit={() => onEdit(post)} onDelete={() => onDelete(post.id)} />
      ))}
    </div>
  );
}