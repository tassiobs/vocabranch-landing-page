import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Loader2, ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/react-app/components/ui/button";
import Seo from "@/react-app/components/Seo";
import { blogApi, type Post } from "@/react-app/lib/blogApi";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function excerpt(body: string, max = 160) {
  const plain = body.replace(/[#*`_~[\]>-]/g, "").trim();
  return plain.length > max ? plain.slice(0, max).trimEnd() + "…" : plain;
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    blogApi
      .getPublished()
      .then(setPosts)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load posts."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Seo
        title="Blog"
        description="Tips, research, and stories about vocabulary learning from the VocaBranch team."
        canonical="/blog"
      />
      {/* Nav */}
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
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
          {/* Page header */}
          <div className="mb-12">
            <Button asChild variant="ghost" size="sm" className="-ml-2 mb-6 text-muted-foreground">
              <Link to="/">
                <ArrowLeft className="w-4 h-4" />
                Back to home
              </Link>
            </Button>
            <h1
              className="text-4xl md:text-5xl font-semibold tracking-tight mb-3"
              style={{ fontFamily: '"Source Serif 4", serif' }}
            >
              Blog
            </h1>
            <p className="text-lg text-muted-foreground">
              Tips, research, and stories about vocabulary learning.
            </p>
          </div>

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

          {!loading && !error && posts.length === 0 && (
            <div className="text-center py-20">
              <BookOpen className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground">No posts yet — check back soon.</p>
            </div>
          )}

          {!loading && posts.length > 0 && (
            <div className="flex flex-col divide-y divide-border/60">
              {posts.map((post) => (
                <article key={post.id} className="py-8 first:pt-0">
                  <time className="text-sm text-muted-foreground">{formatDate(post.created_at)}</time>
                  <h2
                    className="text-xl font-semibold mt-1.5 mb-2 hover:text-primary transition-colors"
                    style={{ fontFamily: '"Source Serif 4", serif' }}
                  >
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">{excerpt(post.body)}</p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-block mt-3 text-sm text-primary hover:underline font-medium"
                  >
                    Read more →
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
