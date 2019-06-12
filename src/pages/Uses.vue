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
  import { Fragment } from "vue-fragment";
  export default {
    components: {
      Fragment
    },
    metaInfo: {
      title: "Uses"
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
