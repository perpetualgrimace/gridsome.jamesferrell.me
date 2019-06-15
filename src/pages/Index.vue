<page-query>
  query Index {
    d: index(path: "/") {
      title
      projectsHeading
      projectsLink
      blogHeading
      content
    }
  }
</page-query>

<script>
  import ArticleList from "~/components/ArticleList.vue";
  import ProjectList from "~/components/ProjectList.vue";

  export default {
    components: {
      ArticleList, ProjectList
    },
    metaInfo: {
      title: "Front-end designer"
    },
  }
</script>

<template>
  <Layout>


    <h1>hi</h1>
    <p class="u-margin-bottom">TODO: intro</p>

    <h2 class="u-padding-bottom">{{$page.d.projectsHeading}}</h2>
    <ProjectList :limit="8" />

    <template slot="sidebar">
      <ArticleList :heading="$page.d.blogHeading" :limit="3" />
    </template>

  </Layout>
</template>


<style lang="scss">
  .home-links a {
    margin-right: 1rem;
  }
</style>
