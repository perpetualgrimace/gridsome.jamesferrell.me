// Changes here require a server restart.
// To restart press CTRL + C in terminal and run "gridsome develop"

const crypto = require("crypto");

/**
 * The MD4 algorithm is not available anymore in Node.js 17+ (because of library SSL 3).
 * In that case, silently replace MD4 by the MD5 algorithm.
 */
try {
  crypto.createHash("md4");
} catch (e) {
  console.warn(
    'Crypto "MD4" is not supported anymore by this Node.js version'
  );
  const origCreateHash = crypto.createHash;
  crypto.createHash = (alg, opts) => {
    return origCreateHash(alg === "md4" ? "md5" : alg, opts);
  };
}

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
        `,
      },
    },
  },

  // default image settings
  images: {
    defaultQuality: 90, // doesn't appear to do anything?
  },

  // icons
  icon: {
    favicon: {
      src: "./src/favicon.png",
      sizes: [16, 32, 64],
    },
    touchicon: {
      sizes: [
        57,
        114,
        72,
        144,
        60,
        120,
        76,
        152,
        180,
        192,
        160,
        96,
        16,
        32,
      ],
      src: "./src/favicon.png",
    },
  },

  plugins: [
    {
      use: "@gridsome/plugin-critical",
      options: {
        paths: ["/"],
        width: 1440,
        height: 900,
      },
    },
    {
      use: "@gridsome/plugin-sitemap",
      options: {
        cacheTime: 600000, // default
        // exclude: ["/exclude-me"],
      },
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
        route: "/",
      },
    },

    // project list
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/**/project-list.md",
        typeName: "Projects",
        route: "/projects",
      },
    },
    // projects
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/**/project-detail.md",
        typeName: "Project",
        route: "/projects/:slug",
      },
    },

    // about
    {
      use: "@gridsome/vue-remark",
      options: {
        baseDir: "content/3-about",
        typeName: "About",
        template: "./src/templates/About.vue",
        route: "/about",
      },
    },

    // resume
    {
      use: "@gridsome/vue-remark",
      options: {
        baseDir: "content/4-resume",
        typeName: "Resume",
        template: "./src/templates/Resume.vue",
        route: "/resume",
      },
    },

    // blog
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/5-blog/blog.md",
        typeName: "Blog",
        route: "/blog",
      },
    },

    // blog posts
    {
      use: "@gridsome/vue-remark",
      options: {
        baseDir: "content/5-blog/articles",
        typeName: "Article",
        template: "./src/templates/Article.vue",
        route: "/blog/:slug",
      },
    },

    // contact
    {
      use: "@gridsome/vue-remark",
      options: {
        baseDir: "content/6-contact",
        typeName: "Contact",
        template: "./src/templates/Contact.vue",
        route: "/contact",
      },
    },

    // uses
    {
      use: "@gridsome/vue-remark",
      options: {
        baseDir: "content/uses",
        typeName: "Uses",
        template: "./src/templates/Uses.vue",
        route: "/uses",
      },
    },

    // blocks
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/blocks/colophon.md",
        typeName: "Colophon",
      },
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/blocks/footer.md",
        typeName: "Footer",
      },
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/blocks/bullet-lists/*.md",
        typeName: "BulletList",
      },
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/blocks/definition-lists/*.md",
        typeName: "DefinitionList",
      },
    },
  ],

  // markdown parsing
  transformers: {
    remark: {
      externalLinksTarget: false,
      externalLinksRel: ["nofollow"],
    },
  },

  // svg loader
  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule.use("vue-svg-loader").loader("vue-svg-loader");
  },
};
