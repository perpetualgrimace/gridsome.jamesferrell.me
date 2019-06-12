<page-query>
  query Resume {
    d: resume(path: "/resume") {
      title
      content
    }
  }
</page-query>


<script>
  import { Fragment } from "vue-fragment";
  export default {
    components: {
      Fragment
    },
    metaInfo: {
      title: "Resumé"
    }
  }
</script>


<template>
  <Layout>
    <div v-html="$page.d.content" />
  </Layout>
</template>


<style lang="scss">
</style>
