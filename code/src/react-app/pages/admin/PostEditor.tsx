import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { Loader2, ArrowLeft, Eye, EyeOff, Link2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/react-app/components/ui/button";
import { Input } from "@/react-app/components/ui/input";
import { blogApi, slugify, isValidSlug } from "@/react-app/lib/blogApi";

export default function PostEditor() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slugError, setSlugError] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);
  const slugManuallyEdited = useRef(false);

  useEffect(() => {
    if (!isEdit) return;
    blogApi
      .getPost(Number(id))
      .then((post) => {
        setTitle(post.title);
        setSlug(post.slug);
        setBody(post.body);
        slugManuallyEdited.current = true;
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load post."))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slugManuallyEdited.current) {
      setSlug(slugify(value));
      setSlugError(null);
    }
  };

  const handleSlugChange = (value: string) => {
    slugManuallyEdited.current = true;
    setSlug(value);
    if (value && !isValidSlug(value)) {
      setSlugError("Only lowercase letters, numbers, and hyphens allowed.");
    } else {
      setSlugError(null);
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !body.trim()) {
      setError("Title and body are required.");
      return;
    }
    if (slug && !isValidSlug(slug)) {
      setError("Fix the slug before saving.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      if (isEdit) {
        await blogApi.updatePost(Number(id), {
          title: title.trim(),
          body: body.trim(),
          ...(slug ? { slug: slug.trim() } : {}),
        });
      } else {
        await blogApi.createPost(title.trim(), body.trim(), slug.trim() || undefined);
      }
      navigate("/admin/posts");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link to="/admin/posts">
                <ArrowLeft className="w-4 h-4" />
                Posts
              </Link>
            </Button>
            <span className="text-sm text-muted-foreground">
              {isEdit ? "Edit post" : "New post"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setPreview((v) => !v)}>
              {preview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {preview ? "Editor" : "Preview"}
            </Button>
            <Button onClick={handleSave} disabled={saving || !!slugError} size="sm">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : isEdit ? "Save changes" : "Create draft"}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8 flex flex-col gap-4">
        {error && (
          <div className="border border-destructive/30 bg-destructive/5 rounded-xl p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <Input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="text-xl font-semibold h-12 border-border/60 focus:border-primary"
          style={{ fontFamily: '"Source Serif 4", serif' }}
        />

        {/* Slug field */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Link2 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <span className="text-xs text-muted-foreground">vocabranch.com/blog/</span>
            <Input
              type="text"
              placeholder="url-slug"
              value={slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              className="h-7 text-xs font-mono border-border/50 focus:border-primary px-2 max-w-xs"
            />
          </div>
          {slugError && <p className="text-xs text-destructive ml-5">{slugError}</p>}
        </div>

        {preview ? (
          <div className="flex-1 border border-border/60 rounded-xl p-6 prose prose-neutral max-w-none min-h-[400px] bg-card overflow-auto">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{body || "*Nothing to preview yet.*"}</ReactMarkdown>
          </div>
        ) : (
          <textarea
            placeholder="Write your post in Markdown…"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="flex-1 min-h-[400px] w-full resize-none rounded-xl border border-border/60 bg-card px-4 py-3 text-sm focus:outline-none focus:border-primary font-mono leading-relaxed"
          />
        )}
      </main>
    </div>
  );
}
