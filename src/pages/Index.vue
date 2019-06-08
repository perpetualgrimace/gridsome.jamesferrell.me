<page-query>
</page-query>

<script>
  import ArticleList from "~/components/ArticleList.vue";
  export default {
    components: {
      ArticleList
    }
  }
</script>

<template>
  <Layout>


    <h1 class="u-margin-top-xl">hi</h1>


    <template slot="sidebar">
      <ArticleList :limit="3" />
    </template>

  </Layout>
</template>


<style lang="scss">
  .home-links a {
    margin-right: 1rem;
  }
</style>
