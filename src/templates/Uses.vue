<page-query>
  query ($path: String!) {
    d: uses (path: $path) {
      id
      title
      headline
      content
      sidebarHeading
      sidebarText
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
      title: "Uses"
    }
  }
</script>


<template>
  <Layout>
    <template slot="hero">
      <ImageHeader
        :id="$page.d.id"
        :headline="$page.d.headline"
        :imgSrc="$page.d.heroImg"
      />
    </template>

    <VueRemarkContent class="content" />

    <template slot="sidebar">
      <SecondarySidebar class="uses-sidebar" :heading="$page.d.sidebarHeading" :text="$page.d.sidebarText" />
    </template>

    <template slot="cta">
      <CTA :heading="$page.d.ctaHeadline" />
    </template>
  </Layout>
</template>


<style lang="scss">
  .uses-sidebar {
    @media (max-width: $l - 0.001) {
      // style secondary content in stacked layout
      @include secondary-content-as-primary;
    }
  }
</style>
