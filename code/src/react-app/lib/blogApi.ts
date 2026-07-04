const BASE = import.meta.env.DEV
  ? "/blog-api"
  : "https://vocabranch-blog-production.up.railway.app";

export interface Post {
  id: number;
  title: string;
  slug: string;
  body: string;
  status: "draft" | "published";
  author_id: number;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

function getToken(): string | null {
  return localStorage.getItem("blog_token");
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.detail ?? `Request failed: ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const blogApi = {
  signup: (email: string, password: string, name: string) =>
    request<void>("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    }),

  signin: (email: string, password: string) =>
    request<AuthResponse>("/auth/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  signout: () => request<void>("/auth/signout", { method: "POST" }),

  getPublished: () => request<Post[]>("/posts"),
  getAll: () => request<Post[]>("/posts/all"),
  getPost: (id: number) => request<Post>(`/posts/${id}`),
  getPostBySlug: (slug: string) => request<Post>(`/posts/by-slug/${slug}`),

  createPost: (title: string, body: string, slug?: string) =>
    request<Post>("/posts", {
      method: "POST",
      body: JSON.stringify({ title, body, ...(slug ? { slug } : {}) }),
    }),

  updatePost: (id: number, data: { title?: string; body?: string; slug?: string }) =>
    request<Post>(`/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deletePost: (id: number) =>
    request<void>(`/posts/${id}`, { method: "DELETE" }),

  publishPost: (id: number) =>
    request<Post>(`/posts/${id}/publish`, { method: "POST" }),
};

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug);
}
