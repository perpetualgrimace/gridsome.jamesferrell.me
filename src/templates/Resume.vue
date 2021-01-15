<page-query>
  query ($path: String!) {
    d: resume (path: $path) {
      title
      content
      heroImg
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
  import Sidebar from "~/components/Sidebar";
  import CTA from "~/components/CTA";

  export default {
    components: {
      ImageHero, Sidebar, CTA
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
      <Sidebar
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
