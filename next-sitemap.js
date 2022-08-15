module.exports = {
  siteUrl: "https://www.eahazardswatch.icpac.net",
  generateRobotsTxt: false,
  sitemapSize: 50000,
  priority: 1.0,
  changefreq: "weekly",
  exclude: ["/404", "/my-hw"],
  transform: (config, url) => {
    if (url.includes("/embed")) {
      return null;
    }
    if (url.includes("/map") || url.includes("/dashboards")) {
      return {
        loc: url,
        changefreq: config.changefreq,
        priority: config.priority,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      };
    }

    return {
      loc: url,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
