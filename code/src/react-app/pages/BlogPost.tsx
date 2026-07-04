import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Loader2, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/react-app/components/ui/button";
import { blogApi, type Post } from "@/react-app/lib/blogApi";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    blogApi
      .getPostBySlug(slug!)
      .then(setPost)
      .catch((err) => setError(err instanceof Error ? err.message : "Post not found."))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="VocaBranch" className="w-7 h-7 rounded-lg" />
            <Link
              to="/"
              className="font-semibold hover:text-primary transition-colors"
              style={{ fontFamily: '"Source Serif 4", serif' }}
            >
              VocaBranch
            </Link>
          </div>
          <Button asChild variant="outline" size="sm" className="border-primary/40 text-primary hover:bg-primary/10 hover:border-primary">
            <a href="https://app.vocabranch.com">Log in</a>
          </Button>
        </div>
      </header>

      <main className="pt-14">
        <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
          <Button asChild variant="ghost" size="sm" className="-ml-2 mb-8 text-muted-foreground">
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4" />
              All posts
            </Link>
          </Button>

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
            </article>
          )}
        </div>
      </main>
    </div>
  );
}
