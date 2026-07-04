import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/react-app/components/ui/button";
import { blogApi, type Post } from "@/react-app/lib/blogApi";

function excerpt(body: string, max = 120) {
  const plain = body.replace(/[#*`_~[\]>-]/g, "").trim();
  return plain.length > max ? plain.slice(0, max).trimEnd() + "…" : plain;
}

export default function BlogPreview() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    blogApi
      .getPublished()
      .then((data) => setPosts(data.slice(0, 3)))
      .catch(() => {});
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-primary font-medium text-sm mb-3">
              <BookOpen className="w-4 h-4" />
              From the blog
            </div>
            <h2
              className="text-3xl md:text-4xl font-semibold tracking-tight"
              style={{ fontFamily: '"Source Serif 4", serif' }}
            >
              Tips for serious learners
            </h2>
          </div>
          <Button asChild variant="ghost" className="hidden md:flex text-primary hover:text-primary hover:bg-primary/10 shrink-0">
            <Link to="/blog">
              All posts
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group border border-border/60 rounded-2xl p-6 bg-card hover:border-primary/40 hover:shadow-sm transition-all"
            >
              <time className="text-xs text-muted-foreground">
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <h3
                className="font-semibold mt-1.5 mb-2 group-hover:text-primary transition-colors leading-snug"
                style={{ fontFamily: '"Source Serif 4", serif' }}
              >
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {excerpt(post.body)}
              </p>
              <span className="inline-flex items-center gap-1 mt-4 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                Read more <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex md:hidden">
          <Button asChild variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 hover:border-primary">
            <Link to="/blog">View all posts</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
