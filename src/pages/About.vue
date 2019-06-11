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
// import Layout from "~/layouts/NotDefault.vue";
import { Fragment } from "vue-fragment";
export default {
  components: {
    Fragment
  },
  metaInfo: {
    title: "about"
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
