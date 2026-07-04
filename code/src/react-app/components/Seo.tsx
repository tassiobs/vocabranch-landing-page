import { Helmet } from "react-helmet-async";

const SITE_NAME = "VocaBranch";
const SITE_URL = "https://vocabranch.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
const DEFAULT_DESCRIPTION =
  "The vocabulary app for serious learners. AI-generated word trees, active practice, real-world context, and mastery tracking.";

interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  type?: "website" | "article";
  publishedAt?: string;
}

export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  type = "website",
  publishedAt,
}: SeoProps) {
  const pageTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Vocabulary for Serious English Learners`;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {publishedAt && <meta property="article:published_time" content={publishedAt} />}

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
