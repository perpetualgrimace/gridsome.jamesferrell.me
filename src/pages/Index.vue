<page-query>
</page-query>

<script>
  import ArticleList from "~/components/ArticleList.vue";
  import ProjectList from "~/components/ProjectList.vue";
  
  export default {
    components: {
      ArticleList, ProjectList
    }
  }
</script>

<template>
  <Layout>


    <h1>hi</h1>

    <h2>Projects</h2>
    <ProjectList :limit="8" />

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
