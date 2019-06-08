<page-query>
  query Blog {
    d: blog(path: "/blog") {
      title
      headline
      content
    }
  }
</page-query>

<script>
  import site from "../../content/site.json";
  import ArticleList from "~/components/ArticleList.vue";
  export default {
    components: {
      ArticleList
    },
    data () {
      return {
        site
      }
    }
  }
</script>

<template>
  <Layout>


    <h1 class="u-margin-top-xl">All articles</h1>

    <ArticleList />

    <div v-html="$page.d.content" />

  </Layout>
</template>


<style lang="scss">
</style>
