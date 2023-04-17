import RecipiePage from "@/components/Recipe";
import Seo from "@/components/SEO/Seo";
import Recepie, { Recepie as RecepieModel } from "@/models/Recepie";

export default function Recipe({ recepie }: { recepie: RecepieModel }) {
  return (
    <>
      <Seo isRecepie title={recepie.title} description={recepie.ingredients} />
      <RecipiePage recepie={recepie} />
    </>
  );
}

export async function getStaticPaths() {
  const allSlugs = await Recepie.find({}).select("slug");
  console.log(allSlugs.length, "allSlugs");
  return {
    paths: allSlugs.map((slug) => {
      return {
        params: {
          id: slug,
        },
      };
    }),
    fallback: false,
  };
  // Return a list of possible value for id
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const recepies = await fetch(`/api/recipe/${params.id}`).then((res) =>
    res.json()
  );
  console.log(recepies, "recepies");
  return {
    props: {
      blog: recepies[0],
    },
  };

  // Fetch necessary data for the blog post using params.id
}
