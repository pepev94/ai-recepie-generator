/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://aifoodie.co",
  generateRobotsTxt: true, // (optional)
  additionalPaths: async (config) => {
    const result = [];

    return result;
  },
};
