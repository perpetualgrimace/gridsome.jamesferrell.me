<page-query>
  query Uses {
    d: uses(path: "/uses") {
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
    <div v-html="$page.d.content" />
  </Layout>
</template>


<style lang="scss">
</style>
