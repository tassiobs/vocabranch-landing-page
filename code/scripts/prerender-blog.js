import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = "https://vocabranch.com";
const API_URL = "https://vocabranch-blog-production.up.railway.app";
const DIST = join(__dirname, "../dist");

const METADATA_RE = /pronunciation|part of speech|:\s*(noun|verb|adjective|adverb|proverb|idiom)|meaning,\s*examples|synonyms\s*&|\/[a-zðæəɪʊɛɔɑɒʌɜɐɨɯɵɤɥʏʉɓɗɠɬɮɸβθʃʒɕʑʂʐçʝɣχʁħʕɦʋɹɻjɰlɭʎʟmɱnɳɲŋɴʙrʀⱱɾɽʔˈˌː]+\//i;

function excerpt(body, max = 160) {
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

function firstImage(body) {
  const match = body.match(/!\[.*?\]\((.*?)\)/);
  return match ? match[1] : null;
}

function escape(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function injectPostMeta(html, post) {
  const title = `${post.title} — VocaBranch`;
  const desc = escape(excerpt(post.body));
  const url = `${SITE_URL}/blog/${post.slug}`;
  const image = firstImage(post.body) || `${SITE_URL}/og-image.png`;
  const titleEsc = escape(title);
  const imageEsc = escape(image);
  const urlEsc = escape(url);

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: excerpt(post.body),
    image: image,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    url: url,
    author: { "@type": "Organization", name: "VocaBranch", url: SITE_URL },
    publisher: { "@type": "Organization", name: "VocaBranch", url: SITE_URL },
  });

  const r = (name, prop, value) =>
    new RegExp(`<meta ${prop}="${name}" content="[^"]*"\\s*/?>`, "g");

  return html
    .replace(/<title>.*?<\/title>/, `<title>${titleEsc}</title>`)
    .replace(r("description", "name"), `<meta name="description" content="${desc}" />`)
    .replace(r("og:type", "property"), `<meta property="og:type" content="article" />`)
    .replace(r("og:url", "property"), `<meta property="og:url" content="${urlEsc}" />`)
    .replace(r("og:title", "property"), `<meta property="og:title" content="${titleEsc}" />`)
    .replace(r("og:description", "property"), `<meta property="og:description" content="${desc}" />`)
    .replace(r("og:image", "property"), `<meta property="og:image" content="${imageEsc}" />`)
    .replace(r("twitter:title", "name"), `<meta name="twitter:title" content="${titleEsc}" />`)
    .replace(r("twitter:description", "name"), `<meta name="twitter:description" content="${desc}" />`)
    .replace(r("twitter:image", "name"), `<meta name="twitter:image" content="${imageEsc}" />`)
    .replace(
      "</head>",
      `  <link rel="canonical" href="${urlEsc}">\n  <meta property="article:published_time" content="${post.created_at}">\n  <script type="application/ld+json">${jsonLd}</script>\n</head>`
    );
}

async function prerender() {
  let posts = [];
  try {
    const res = await fetch(`${API_URL}/posts`);
    if (res.ok) posts = await res.json();
  } catch {
    console.warn("⚠️  Could not fetch posts for prerendering — skipping.");
    return;
  }

  const shell = readFileSync(join(DIST, "index.html"), "utf8");
  let count = 0;

  for (const post of posts) {
    if (post.status !== "published") continue;
    const dir = join(DIST, "blog", post.slug);
    mkdirSync(dir, { recursive: true });
    const html = injectPostMeta(shell, post);
    writeFileSync(join(dir, "index.html"), html);
    count++;
  }

  console.log(`✓ prerendered ${count} blog post(s) to dist/blog/`);
}

prerender();
