<page-query>
  query ($path: String!) {
    d: about (path: $path) {
      id
      title
      headline
      content
      sidebarHeading
      sidebarText
      sidebarLink
      sidebarLinkText
    }
  }
</page-query>


<script>
  import ImageHero from "~/components/ImageHero";
  import SecondarySidebar from "~/components/SecondarySidebar";
  import CTA from "~/components/CTA";

  export default {
    components: {
      ImageHero, SecondarySidebar, CTA
    },
    metaInfo: {
      title: "About"
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
      <SecondarySidebar
        :heading="$page.d.sidebarHeading"
        :text="$page.d.sidebarText"
        :link="$page.d.sidebarLink"
        :linkText="$page.d.sidebarLinkText"
      />
    </template>

    <template slot="cta">
      <CTA :heading="$page.d.ctaHeadline" />
    </template>
  </Layout>
</template>


<style lang="scss">
</style>
