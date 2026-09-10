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

function firstImage(body: string): string | null {
  const match = body.match(/!\[.*?\]\((.*?)\)/);
  return match ? match[1] : null;
}

const METADATA_RE = /pronunciation|part of speech|:\s*(noun|verb|adjective|adverb|proverb|idiom)|meaning,\s*examples|synonyms\s*&|\/[a-zðæəɪʊɛɔɑɒʌɜɐɨɯɵɤɥʏʉɓɗɠɬɮɸβθʃʒɕʑʂʐçʝɣχʁħʕɦʋɹɻjɰlɭʎʟmɱnɳɲŋɴʙrʀⱱɾɽʔˈˌː]+\//i;

function excerpt(body: string, max = 160) {
  for (const line of body.split("\n")) {
    const clean = line
      .replace(/!\[.*?\]\(.*?\)/g, "")
      .replace(/^#{1,6}\s+/, "")
      .replace(/[*`_~[\]>-]/g, "")
      .trim();
    if (clean.length >= 60 && !METADATA_RE.test(clean)) {
      return clean.length > max ? clean.slice(0, max).trimEnd() + "…" : clean;
    }
  }
  const plain = body.replace(/!\[.*?\]\(.*?\)/g, "").replace(/[#*`_~[\]>-]/g, "").trim();
  return plain.length > max ? plain.slice(0, max).trimEnd() + "…" : plain;
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    blogApi
      .getPublished()
      .then((data) => setPosts(data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())))
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
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
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

          {!loading && posts.length > 0 && (() => {
            const [featured, ...rest] = posts;
            const featuredThumb = firstImage(featured.body);
            return (
              <div className="space-y-12">
                {/* Featured post */}
                <Link to={`/blog/${featured.slug}`} className="group block">
                  {featuredThumb && (
                    <div className="w-full aspect-video overflow-hidden rounded-2xl mb-5 border border-border/40">
                      <img
                        src={featuredThumb}
                        alt={featured.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                  )}
                  <time className="text-sm text-muted-foreground">{formatDate(featured.created_at)}</time>
                  <h2
                    className="text-2xl md:text-3xl font-semibold mt-1.5 mb-2 group-hover:text-primary transition-colors"
                    style={{ fontFamily: '"Source Serif 4", serif' }}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">{excerpt(featured.body, 200)}</p>
                  <span className="inline-block mt-3 text-sm text-primary font-medium group-hover:underline">
                    Read more →
                  </span>
                </Link>

                {/* Grid */}
                {rest.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-border/60">
                    {rest.map((post) => {
                      const thumb = firstImage(post.body);
                      return (
                        <Link key={post.id} to={`/blog/${post.slug}`} className="group flex flex-col">
                          {thumb && (
                            <div className="w-full aspect-video overflow-hidden rounded-xl mb-4 border border-border/40">
                              <img
                                src={thumb}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                              />
                            </div>
                          )}
                          <time className="text-sm text-muted-foreground">{formatDate(post.created_at)}</time>
                          <h2
                            className="text-lg font-semibold mt-1 mb-1.5 group-hover:text-primary transition-colors"
                            style={{ fontFamily: '"Source Serif 4", serif' }}
                          >
                            {post.title}
                          </h2>
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{excerpt(post.body)}</p>
                          <span className="inline-block mt-3 text-sm text-primary font-medium group-hover:underline">
                            Read more →
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </main>
    </div>
  );
}
