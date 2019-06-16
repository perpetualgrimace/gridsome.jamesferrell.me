<page-query>
  query About {
    d: about(path: "/about") {
      title
      headline
      content
    }
  }
</page-query>


<script>
  import ImageHeader from "~/components/ImageHeader";

  export default {
    components: {
      ImageHeader
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
  </Layout>
</template>


<style lang="scss">
</style>
