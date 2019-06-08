// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run "gridsome develop"

var site = require("./content/site.json");

module.exports = {
  // meta info
  siteName: site.title,
  siteDescription: site.description,
  siteUrl: site.baseURL,
  titleTemplate: `%s | ${site.title}`,
  keywords: site.keywords,
  lang: "en",
  // TODO: more meta
  // environment config
  port: 8888,
  // CSS
  css: {
    loaderOptions: {
      scss: {
        data: `
          @import "@/scss/1-utils/_functions.scss";
          @import "@/scss/1-utils/_variables.scss";
          @import "@/scss/1-utils/_mixins.scss";
        `
      }
    }
  },

  plugins: [
    // {
    //   use: "@gridsome/plugin-critical",
    //   options: {
    //     paths: ["/"],
    //     width: 1440,
    //     height: 900
    //   }
    // },
    {
      use: "@gridsome/plugin-sitemap",
      options: {
        cacheTime: 600000, // default
        // exclude: ["/exclude-me"],
      }
    },

    /////////////////////////////////////////
    // routing & templates
    /////////////////////////////////////////

    // blog
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/**/blog.md",
        typeName: "Blog",
        route: "/blog"
      }
    },

    // blog posts
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/**/blog-article.md",
        typeName: "Article",
        route: "/blog/:slug"
      }
    },

    // projects
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/**/project-detail.md",
        typeName: "Project",
        route: "/projects/:slug"
      }
    }
  ],

  // markdown parsing
  transformers: {
    remark: {
      externalLinksTarget: false,
      externalLinksRel: ["nofollow"],
      anchorClassName: "heading-anchor-link"
    }
  }
}
