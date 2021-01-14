<page-query>
  query ($path: String!) {
    d: resume (path: $path) {
      title
      content
      sidebarHeading
      sidebarText
      sidebarLink
      sidebarLinkText
      downloadHeading
      downloadText
      downloadLink
      downloadLinkText
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
      title: "Resumé"
    }
  }
</script>


<template>
  <Layout>
    <template slot="hero">
      <ImageHero
        :id="$page.d.id"
        :headline="$page.d.title"
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
        :downloadHeading="$page.d.downloadHeading"
        :downloadText="$page.d.downloadText"
        :downloadLink="$page.d.downloadLink"
        :downloadLinkText="$page.d.downloadLinkText"
      />
    </template>

    <template slot="cta">
      <CTA :heading="$page.d.ctaHeadline" />
    </template>
  </Layout>
</template>


<style lang="scss">
</style>
