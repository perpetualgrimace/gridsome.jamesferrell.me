<page-query>
  query Index {
    d: index(path: "/") {
      title
      projectsHeading
      blogHeading
      content
    }
  }
</page-query>

<script>
  import ArticleList from "~/components/ArticleList";
  import ProjectList from "~/components/ProjectList";
  import Colophon from "~/components/Colophon";
  import Button from "~/components/Button";

  export default {
    components: {
      ArticleList, ProjectList, Colophon, Button
    },
    metaInfo: {
      title: "UX developer"
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
    <Button link="projects" classes="link-arrow u-font-sm u-margin-top" text="More projects" />

    <template slot="sidebar">
      <ArticleList :heading="$page.d.blogHeading" :limit="3" />
      <Button link="blog" classes="link-arrow u-font-sm u-margin-top" text="More articles" />
    </template>

  </Layout>
</template>


<style lang="scss">
</style>
