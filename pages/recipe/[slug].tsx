import RecipiePage from "@/components/Recipe";
import Seo from "@/components/SEO/Seo";
import { useRouter } from "next/router";

export default function Recipe() {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <>
      <RecipiePage slug={slug as string} />
    </>
  );
}
