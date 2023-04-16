import Head from "next/head";

const DOMAIN = "http://aifoodie.co/";
const DEFAULT_OG_IMAGE =
  "https://aifoodie.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FlogoRojo.6071538e.png&w=100&q=75";

export default function Seo({
  title = "AI Foodie | AI-generated Recipes for Food and Drinks | AIFoodie.co",
  description = "Get delicious AI-generated recipes for food and drinks at AI Foodie. Our artificial intelligence algorithms create unique and creative recipes that are sure to satisfy your taste buds. Visit AIFoodie.co now and explore our wide range of AI-generated recipes.",
  siteName = "AI Chef",
  canonical = DOMAIN,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  isRecepie = false,
  //   twitterHandle = "@d__raptis",
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    headline: title,
    description: description,
    cookTime: "PT30M",
    keywords: title,
    recipeIngredient: [
      "1 cup all-purpose flour",
      "2 tablespoons sugar",
      "2 teaspoons baking powder",
      "1/2 teaspoon salt",
      "1 cup milk",
      "1 egg",
      "2 tablespoons vegetable oil",
    ],
    recipeInstructions: [
      {
        "@type": "HowToStep",
        text: "In a mixing bowl, combine the flour, sugar, baking powder, and salt.",
      },
      {
        "@type": "HowToStep",
        text: "In a separate bowl, whisk together the milk, egg, and vegetable oil.",
      },
      {
        "@type": "HowToStep",
        text: "Add the wet ingredients to the dry ingredients and stir until just combined.",
      },
      {
        "@type": "HowToStep",
        text: "Heat a non-stick pan over medium heat. Pour 1/4 cup of batter onto the pan for each pancake.",
      },
      {
        "@type": "HowToStep",
        text: "Cook until bubbles form on the surface, then flip and cook until the other side is golden brown.",
      },
      {
        "@type": "HowToStep",
        text: "Serve with your favorite toppings, such as butter and syrup.",
      },
    ],
  };

  return (
    <Head>
      <title key="title">{`${title} – ${siteName}`}</title>
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

      {isRecepie && (
        <script
          key="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  );
}
