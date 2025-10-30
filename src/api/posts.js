// Lightweight API client using fetch. It assumes the Vite dev server proxies /api to your Spring Boot app.
// Endpoints:
// GET  /api/posts
// POST /api/posts
// PUT  /api/posts/{id}
// DELETE /api/posts/{id}

const base = '/api/posts';

async function handleResp(res) {
  if (!res.ok) {
    const text = await res.text();
    const err = new Error(res.statusText || 'HTTP error');
    err.status = res.status;
    err.body = text;
    throw err;
  }
  // DELETE returns empty body (204)
  if (res.status === 204) return null;
  return res.json();
}

export async function fetchPosts() {
  const res = await fetch(base);
  return handleResp(res);
}

export async function createPost(post) {
  const res = await fetch(base, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(post)
  });
  return handleResp(res);
}

export async function updatePost(id, post) {
  const res = await fetch(`${base}/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(post)
  });
  return handleResp(res);
}

export async function deletePost(id) {
  const res = await fetch(`${base}/${id}`, {
    method: 'DELETE'
  });
  return handleResp(res);
}