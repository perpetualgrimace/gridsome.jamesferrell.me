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
  import HomeHero from "~/components/HomeHero";
  import Button from "~/components/Button";

  export default {
    components: {
      ArticleList, ProjectList, HomeHero, Button
    },
    metaInfo: {
      title: "UX developer"
    },
  }
</script>

<template>
  <Layout wrapperClass="home">

    <template slot="hero">
      <HomeHero />
    </template>

    <h2 class="u-padding-bottom">{{$page.d.projectsHeading}}</h2>
    <ProjectList :limit="8" />
    <Button link="projects" classes="link-arrow u-font-sm u-margin-top" text="More projects" />

    <template slot="sidebar">
      <div class="sticky-wrapper">
        <ArticleList :heading="$page.d.blogHeading" :limit="4" />
        <Button link="blog" classes="link-arrow u-font-sm u-margin-top" text="More articles" />
      </div>
    </template>

  </Layout>
</template>


<style lang="scss">

  .home-content-wrapper .primary-content,
  .home-content-wrapper .secondary-content {
    grid-column: 1 / 13;
  }

  @media (min-width: $bp-xxs) and (max-width: $bp-xs - 0.001) {
    .home-content-wrapper .primary-content {
      grid-column: 1 / 8;
    }
    .home-content-wrapper .secondary-content {
      grid-column: 8 / 13;
    }
  }

  @media (min-width: $bp-sm) {
    .home-content-wrapper .primary-content,
    .home-content-wrapper .secondary-content {
      grid-column: 2 / 12;
    }
  }
  @media (min-width: $bp-md) {
    .home-content-wrapper .primary-content {
      grid-column: 4 / 13;
    }
    .home-content-wrapper .secondary-content {
      grid-column: 1 / 4;
      order: -1;

      & > .sticky-wrapper {
        position: sticky;
        top: 0;
      }
    }
  }
  @media (min-width: $bp-xl) {
    .home-content-wrapper .primary-content {
      grid-column: 5 / 14;
    }
    .home-content-wrapper .secondary-content {
      grid-column: 2 / 5;
      order: -1;
    }
  }
</style>
