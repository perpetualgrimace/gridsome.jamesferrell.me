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
  import ArticleList from "~/components/ArticleList";
  import ProjectList from "~/components/ProjectList";
  import Colophon from "~/components/Colophon";

  export default {
    components: {
      ArticleList, ProjectList, Colophon
    },
    metaInfo: {
      title: "Front-end designer"
    },
  }
</script>

<template>
  <Layout>

    <template slot="hero">
      <Colophon headline="Introduction" />
    </template>

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
