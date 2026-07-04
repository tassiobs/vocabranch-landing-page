import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import {
  Loader2,
  Plus,
  TreeDeciduous,
  Pencil,
  Trash2,
  Globe,
  FileText,
  LogOut,
} from "lucide-react";
import { Button } from "@/react-app/components/ui/button";
import { Badge } from "@/react-app/components/ui/badge";
import { blogApi, type Post } from "@/react-app/lib/blogApi";
import { useAuth } from "@/react-app/lib/authContext";

export default function Posts() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [publishing, setPublishing] = useState<number | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  const fetchPosts = async () => {
    try {
      const data = await blogApi.getAll();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const handlePublish = async (id: number) => {
    setPublishing(id);
    try {
      const updated = await blogApi.publishPost(id);
      setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to publish.");
    } finally {
      setPublishing(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setDeleting(id);
    try {
      await blogApi.deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete.");
    } finally {
      setDeleting(null);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/admin/signin");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <TreeDeciduous className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="font-semibold" style={{ fontFamily: '"Source Serif 4", serif' }}>
              VocaBranch
            </span>
            <span className="text-muted-foreground text-sm ml-1">/ Blog Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/blog">View blog</Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold" style={{ fontFamily: '"Source Serif 4", serif' }}>
              Posts
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {posts.length} post{posts.length !== 1 ? "s" : ""} total
            </p>
          </div>
          <Button asChild>
            <Link to="/admin/posts/new">
              <Plus className="w-4 h-4" />
              New post
            </Link>
          </Button>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        )}

        {error && (
          <div className="border border-destructive/30 bg-destructive/5 rounded-xl p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-20">
            <FileText className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground">No posts yet.</p>
            <Button asChild className="mt-4">
              <Link to="/admin/posts/new">Write your first post</Link>
            </Button>
          </div>
        )}

        {!loading && posts.length > 0 && (
          <div className="flex flex-col gap-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="border border-border/60 rounded-xl p-5 bg-card flex items-start justify-between gap-4 hover:border-border transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={post.status === "published" ? "default" : "outline"}>
                      {post.status === "published" ? (
                        <><Globe className="w-3 h-3 mr-0.5" /> Published</>
                      ) : (
                        <><FileText className="w-3 h-3 mr-0.5" /> Draft</>
                      )}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.updated_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h2 className="font-semibold truncate">{post.title}</h2>
                  <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
                    {post.body.replace(/[#*`_~[\]]/g, "").slice(0, 120)}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {post.status === "draft" && (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={publishing === post.id}
                      onClick={() => handlePublish(post.id)}
                      className="border-primary/40 text-primary hover:bg-primary/10 hover:border-primary"
                    >
                      {publishing === post.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Globe className="w-3.5 h-3.5" />
                      )}
                      Publish
                    </Button>
                  )}
                  <Button asChild size="sm" variant="ghost">
                    <Link to={`/admin/posts/${post.id}/edit`}>
                      <Pencil className="w-3.5 h-3.5" />
                      Edit
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={deleting === post.id}
                    onClick={() => handleDelete(post.id)}
                  >
                    {deleting === post.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
