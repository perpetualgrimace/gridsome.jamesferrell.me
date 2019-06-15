// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from "~/layouts/Default.vue";
import "@/scss/main.scss";

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout)

  head.htmlAttrs = { lang: "en" }
  head.link.push({
    rel: "stylesheet",
    href: "https://use.typekit.net/bar1poh.css"
  })
}
