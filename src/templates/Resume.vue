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
  import ImageHeader from "~/components/ImageHeader";
  import SecondarySidebar from "~/components/SecondarySidebar";
  import CTA from "~/components/CTA";

  export default {
    components: {
      ImageHeader, SecondarySidebar, CTA
    },
    metaInfo: {
      title: "Resumé"
    }
  }
</script>


<template>
  <Layout>
    <VueRemarkContent>
      <template slot="hero">
        <ImageHeader
          :id="$page.d.id"
          :headline="$page.d.title"
          :imgSrc="$page.d.heroImg"
        />
      </template>

      <div class="content" v-html="$page.d.content" />

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
    </VueRemarkContent>
  </Layout>
</template>


<style lang="scss">
</style>
