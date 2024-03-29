import { Recepie } from "@/models/Recepie";
import Head from "next/head";

const DOMAIN = "http://aifoodie.co/";
const DEFAULT_OG_IMAGE =
  "https://aifoodie.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FlogoRojo.6071538e.png&w=100&q=75";

export const cleanSteps = (text: string) => {
  return text
    .replace(/^(Instructions|Pasos):/i, "")
    .trim()
    .replace(/#+/g, "")
    .trim();
};

export const cleanTitle = (text: string) => {
  return text
    .replace(/^(Title|Título|Titulo):/i, "")
    .trim()
    .replace(/#+/g, "")
    .trim();
};

export const cleanIngredients = (text: string) =>
  text.replace(/^(Ingredients|Ingredientes):/i, "").trim();

const getStructuredData = (recepie: Recepie) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    headline: cleanTitle(recepie.title || ""),
    description: recepie.ingredients,
    cookTime: "PT30M",
    keywords: recepie.title,
    recipeIngredient: cleanIngredients(recepie?.ingredients || "")
      .split("\n")
      .map((ingredient) => ingredient.trim()),
    recipeInstructions: cleanSteps(recepie?.steps || "")
      .split("\n")
      .map((step) => ({ "@type": "HowToStep", text: step.trim() })),
  };
};
export default function Seo({
  title = "Create crazy food combinations with the help of AI | AIFoodie.co",
  description = "Use our AI to create food combinations from whatever is in your fridge.",
  siteName = "AI Foodie",
  canonical = DOMAIN,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  recepie = {} as Recepie,
  image = null,
  //   twitterHandle = "@d__raptis",
}) {
  return (
    <Head>
      <title key="title">{`${title} – ${siteName}`}</title>
      <meta
        name="google-site-verification"
        content="8EmZtuC_mW3OhKAjc1b6eLrOCLWpx-FqNWFg_D4EupM"
      />
      <meta name="description" content={description} />
      <meta key="og_type" property="og:type" content={ogType} />
      <meta key="og_title" property="og:title" content={title} />
      <meta
        key="og_description"
        property="og:description"
        content={description}
      />
      <meta key="og_locale" property="og:locale" content="en_IE" />
      <meta key="og_site_name" property="og:site_name" content={siteName} />
      <meta key="og_url" property="og:url" content={canonical ?? DOMAIN} />
      <meta key="og_site_name" property="og:site_name" content={siteName} />
      <meta
        key="og_image"
        property="og:image"
        content={ogImage ?? DEFAULT_OG_IMAGE}
      />
      <meta
        key="og_image:alt"
        property="og:image:alt"
        content={`${title} | ${siteName}`}
      />
      <meta key="og_image:width" property="og:image:width" content="1200" />
      <meta key="og_image:height" property="og:image:height" content="630" />

      <meta name="robots" content="index,follow" />

      <meta
        key="twitter:card"
        name="twitter:card"
        content="summary_large_image"
      />
      {/* <meta 
        key="twitter:site" 
        name="twitter:site" 
        content={twitterHandle} 
      />
      <meta
        key="twitter:creator"
        name="twitter:creator"
        content={twitterHandle}
      /> */}
      <meta key="twitter:title" property="twitter:title" content={title} />
      <meta
        key="twitter:description"
        property="twitter:description"
        content={description}
      />

      <link rel="canonical" href={canonical ?? DOMAIN} />

      <link rel="shortcut icon" href="/favicon.ico" />

      {JSON.stringify(recepie) !== "" && image && (
        <script
          key="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              getStructuredData(recepie as unknown as Recepie)
            ),
          }}
        />
      )}
    </Head>
  );
}
