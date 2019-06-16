<page-query>
  query Resume {
    d: resume(path: "/resume") {
      title
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
      title: "Resumé"
    }
  }
</script>


<template>
  <Layout>
    <template slot="hero">
      <ImageHeader
        :id="$page.d.id"
        :headline="$page.d.title"
        :imgSrc="$page.d.heroImg"
      />
    </template>
    <div v-html="$page.d.content" />
  </Layout>
</template>


<style lang="scss">
</style>
