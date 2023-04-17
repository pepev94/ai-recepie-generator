import RecipiePage from "@/components/Recipe";
import Seo from "@/components/SEO/Seo";
import { getAllSlugs, getRecepieBySlug } from "@/lib/api/recipe";
import Recepie, { Recepie as RecepieModel } from "@/models/Recepie";

export default function Recipe({ recepie }: { recepie: RecepieModel }) {
  if (!recepie) return null;
  return (
    <>
      <Seo isRecepie title={recepie.title} description={recepie.ingredients} />
      <RecipiePage recepie={recepie} />
    </>
  );
}

export async function getStaticPaths() {
  const response = await getAllSlugs();
  const allSlugs = await response.json();
  console.log("allSlugs", allSlugs.data.length);
  const cleanedSlugs = allSlugs.data.filter(Boolean);

  const paths = {
    paths: cleanedSlugs.map((slug: any) => {
      return {
        params: {
          slug,
        },
      };
    }),
    fallback: false,
  };
  return paths;
  // Return a list of possible value for id
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const recepie = await getRecepieBySlug(params.slug);

  return {
    props: {
      recepie,
    },
  };

  // Fetch necessary data for the blog post using params.id
}
