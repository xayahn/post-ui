import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import ModalConfirm from "./components/ModalConfirm";
import Toast from "./components/Toast";
import * as postsApi from "./api/posts";
import "./index.css";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null); // {id, message}
  const [toast, setToast] = useState(null); // {type:'success'|'error', message}

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    setLoading(true);
    try {
      const list = await postsApi.fetchPosts();
      setPosts(Array.isArray(list) ? list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : []);
    } catch (err) {
      showToast("error", "Failed to load posts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function showToast(type, message, ms = 3500) {
    setToast({ type, message });
    setTimeout(() => setToast(null), ms);
  }

  async function handleCreate(postData) {
    try {
      const created = await postsApi.createPost(postData);
      setPosts((p) => [created, ...p]);
      showToast("success", "Post created");
    } catch (err) {
      console.error(err);
      showToast("error", "Save failed");
      throw err;
    }
  }

  async function handleUpdate(id, postData) {
    try {
      const updated = await postsApi.updatePost(id, postData);
      setPosts((p) => p.map((x) => (x.id === updated.id ? updated : x)));
      setEditing(null);
      showToast("success", "Post updated");
    } catch (err) {
      console.error(err);
      showToast("error", "Update failed");
      throw err;
    }
  }

  function confirmDelete(id) {
    setConfirm({ id, message: "Delete this post? This action cannot be undone." });
  }

  async function handleDelete(id) {
    try {
      await postsApi.deletePost(id);
      setPosts((p) => p.filter((x) => x.id !== id));
      showToast("success", "Post deleted");
    } catch (err) {
      console.error(err);
      showToast("error", "Delete failed");
    } finally {
      setConfirm(null);
    }
  }

  return (
    <div className="app">
      <Header />
      <main className="container">
        <PostForm
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          editing={editing}
          onCancel={() => setEditing(null)}
        />

        <PostList
          posts={posts}
          loading={loading}
          onEdit={(post) => setEditing(post)}
          onDelete={(id) => confirmDelete(id)}
        />
      </main>

      <ModalConfirm
        open={!!confirm}
        title="Confirm Delete"
        message={confirm?.message}
        onCancel={() => setConfirm(null)}
        onConfirm={() => handleDelete(confirm.id)}
      />

      {toast && <Toast type={toast.type} message={toast.message} />}
    </div>
  );
}