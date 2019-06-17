<page-query>
  query About {
    d: about(path: "/about") {
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
  import ImageHeader from "~/components/ImageHeader";
  import SecondarySidebar from "~/components/SecondarySidebar";
  import CTA from "~/components/CTA";

  export default {
    components: {
      ImageHeader, SecondarySidebar, CTA
    },
    metaInfo: {
      title: "About"
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

    <div class="content" v-html="$page.d.content" />

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
