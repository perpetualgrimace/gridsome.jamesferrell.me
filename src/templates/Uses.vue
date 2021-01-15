<page-query>
  query ($path: String!) {
    d: uses (path: $path) {
      id
      title
      headline
      content
      sidebarHeading
      sidebarText
      heroImg
    }
  }
</page-query>


<script>
  import ImageHero from "~/components/ImageHero";
  import Sidebar from "~/components/Sidebar";
  import CTA from "~/components/CTA";

  export default {
    components: {
      ImageHero, Sidebar, CTA
    },
    metaInfo: {
      title: "Uses"
    }
  }
</script>


<template>
  <Layout>
    <template slot="hero">
      <ImageHero
        :id="$page.d.id"
        :headline="$page.d.headline"
        :imgSrc="$page.d.heroImg"
      />
    </template>

    <VueRemarkContent class="content" />

    <template slot="sidebar">
      <Sidebar class="uses-sidebar" :heading="$page.d.sidebarHeading" :text="$page.d.sidebarText" />
    </template>

    <template slot="cta">
      <CTA :heading="$page.d.ctaHeadline" />
    </template>
  </Layout>
</template>


<style lang="scss">
</style>
