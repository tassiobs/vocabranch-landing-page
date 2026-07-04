import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Loader2, ArrowLeft, Pencil } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/react-app/components/ui/button";
import { Badge } from "@/react-app/components/ui/badge";
import { blogApi, type Post } from "@/react-app/lib/blogApi";

export default function PostPreview() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    blogApi
      .getPost(Number(id))
      .then(setPost)
      .catch((err) => setError(err instanceof Error ? err.message : "Post not found."))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link to="/admin/posts">
                <ArrowLeft className="w-4 h-4" />
                Posts
              </Link>
            </Button>
            {post && (
              <Badge variant={post.status === "published" ? "default" : "outline"}>
                {post.status === "draft" ? "Draft preview" : "Published"}
              </Badge>
            )}
          </div>
          {post && (
            <Button asChild variant="outline" size="sm">
              <Link to={`/admin/posts/${post.id}/edit`}>
                <Pencil className="w-4 h-4" />
                Edit
              </Link>
            </Button>
          )}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        )}

        {error && (
          <div className="border border-destructive/30 bg-destructive/5 rounded-xl p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {post && (
          <article>
            <time className="text-sm text-muted-foreground">
              {new Date(post.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <h1
              className="text-3xl md:text-4xl font-semibold tracking-tight mt-2 mb-8"
              style={{ fontFamily: '"Source Serif 4", serif' }}
            >
              {post.title}
            </h1>
            <div className="prose prose-neutral max-w-none prose-headings:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:text-primary prose-code:bg-primary/5 prose-code:rounded prose-code:px-1">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
            </div>

            <div className="mt-12 border-t border-border/60 pt-8">
              <p className="text-muted-foreground leading-relaxed">
                Want to actually remember this expression? Add it to your{" "}
                <a
                  href="https://app.vocabranch.com/"
                  className="text-primary font-medium hover:underline"
                >
                  Vocabranch vocabulary
                </a>{" "}
                and practice it with personalized review sessions, realistic example sentences, and AI-powered
                speaking and writing feedback until it becomes part of your everyday English.
              </p>
            </div>
          </article>
        )}
      </main>
    </div>
  );
}
