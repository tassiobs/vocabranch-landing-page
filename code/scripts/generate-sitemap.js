import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = "https://vocabranch.com";
const API_URL = "https://vocabranch-blog-production.up.railway.app";

const staticPages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/blog", priority: "0.9", changefreq: "daily" },
];

function url(path, priority, changefreq, lastmod) {
  return [
    "  <url>",
    `    <loc>${SITE_URL}${path}</loc>`,
    lastmod ? `    <lastmod>${lastmod.split("T")[0]}</lastmod>` : "",
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

async function generate() {
  let posts = [];
  try {
    const res = await fetch(`${API_URL}/posts`);
    if (res.ok) posts = await res.json();
  } catch {
    console.warn("⚠️  Could not fetch posts for sitemap — using static pages only.");
  }

  const entries = [
    ...staticPages.map(({ path, priority, changefreq }) =>
      url(path, priority, changefreq, null)
    ),
    ...posts.map((post) =>
      url(`/blog/${post.slug}`, "0.7", "monthly", post.updated_at)
    ),
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    "</urlset>",
  ].join("\n");

  const outPath = join(__dirname, "../dist/sitemap.xml");
  writeFileSync(outPath, xml);
  console.log(`✓ sitemap.xml generated (${entries.length} URLs)`);
}

generate();
