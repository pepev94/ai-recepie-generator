/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://aifoodie.co",
  generateRobotsTxt: true, // (optional)
  additionalPaths: async (config) => {
    const result = [];

    // required value only

    // all possible values
    result.push({
      loc: "/additional-page-2",
      changefreq: "yearly",
      priority: 0.7,
      lastmod: new Date().toISOString(),

      // acts only on '/additional-page-2'
      alternateRefs: [
        {
          href: "https://es.example.com",
          hreflang: "es",
        },
        {
          href: "https://fr.example.com",
          hreflang: "fr",
        },
      ],
    });

    // using transformation from the current configuration
    result.push(await config.transform(config, "/additional-page-3"));

    return result;
  },
};
