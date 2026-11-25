import { Helmet } from "react-helmet-async";

export const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://resume-ai-frontend-pi.vercel.app/").replace(/\/$/, "");
const SITE_NAME = "ResumeAI";

export default function Seo({
  title,
  description,
  path = "/",
  image = "/og-image.png", 
  noindex = false,
  jsonLd = [],
}) {
  const url = `${SITE_URL}${path}`;
  const img = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"}
      />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />

      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(obj)}</script>
      ))}
    </Helmet>
  );
}