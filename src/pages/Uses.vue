<page-query>
  query Uses {
    d: uses(path: "/uses") {
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

  export default {
    components: {
      ImageHeader, SecondarySidebar
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

    <div class="content" v-html="$page.d.content" />

    <template slot="sidebar">
      <SecondarySidebar :heading="$page.d.sidebarHeading" :text="$page.d.sidebarText" />
    </template>
  </Layout>
</template>


<style lang="scss">
</style>
