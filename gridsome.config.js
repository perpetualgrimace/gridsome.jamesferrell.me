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
  keywords: site.keywords,
  titleTemplate: `${site.title} | %s`,
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
          @import "@/scss/1-utils/_keyframes.scss";
        `
      }
    }
  },

  // icons
  icon: {
    favicon: {
      src: "./src/favicon.png",
      sizes: [16, 32, 64]
    },
    touchicon: {
      sizes: [57, 114, 72, 144, 60, 120, 76, 152, 180, 192, 160, 96, 16, 32],
      src: "./src/favicon.png"
    }
  },

  plugins: [
    {
      use: "@gridsome/plugin-critical",
      options: {
        paths: ["/"],
        width: 1440,
        height: 900
      }
    },
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

    // home
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/**/home.md",
        typeName: "Index",
        route: "/"
      }
    },

    // project list
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/**/project-list.md",
        typeName: "Projects",
        route: "/projects"
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
    },

    // about
    {
      use: "@gridsome/vue-remark",
      options: {
        baseDir: "content/3-about",
        typeName: "About",
        template: "./src/templates/About.vue",
        route: "/about"
      }
    },

    // resume
    {
      use: "@gridsome/vue-remark",
      options: {
        baseDir: "content/4-resume",
        typeName: "Resume",
        template: "./src/templates/Resume.vue",
        route: "/resume"
      }
    },

    // blog
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/5-blog/blog.md",
        typeName: "Blog",
        route: "/blog"
      }
    },

    // blog posts
    {
      use: "@gridsome/vue-remark",
      options: {
        baseDir: "content/5-blog/articles",
        typeName: "Article",
        template: "./src/templates/Article.vue",
        route: "/blog/:slug"
      }
    },

    // contact
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/6-contact/contact.md",
        typeName: "Contact",
        route: "/contact"
      }
    },

    // uses
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/uses/uses.md",
        typeName: "Uses",
        route: "/uses"
      }
    },

    // blocks
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/blocks/colophon.md",
        typeName: "Colophon"
      }
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/blocks/main-sidebar.md",
        typeName: "MainSidebar"
      }
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/blocks/**/bullet-list.yml",
        typeName: "BulletList",
        yamljson: {}
      }
    }
  ],

  // markdown parsing
  transformers: {
    remark: {
      externalLinksTarget: false,
      externalLinksRel: ["nofollow"],
      anchorClassName: "heading-anchor-link"
    },
    yamljson: {}
  },

  // svg loader
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  }
}
