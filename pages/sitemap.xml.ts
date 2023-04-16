import Recepie from "@/models/Recepie";
import getBlogPosts from "@/utils/contentful";

//pages/sitemap.xml.js
const BASE_URL = "https://wwww.aicoverlettergenerator.co";

function generateSiteMap(posts: string[], slugs: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>${BASE_URL}</loc>
     </url>
     ${posts
       .map((slug) => {
         return `
       <url>
           <loc>${`${BASE_URL}/blog/${slug}`}</loc>
       </url>
     `;
       })
       .join("")}
       ${slugs
         .map((slug) => {
           return `
        <url>
            <loc>${`${BASE_URL}/recipe/${slug}`}</loc>
        </url>
      `;
         })
         .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}
//@ts-ignore
export async function getServerSideProps({ res }) {
  const blogs = await getBlogPosts();
  const postSlugs = blogs.map((blog) => blog.fields.slug);
  const allSlugs = await Recepie.find({}).select("slug");

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(
    postSlugs,
    //@ts-ignore
    allSlugs.map((obj) => obj.slug)
  );

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
