<page-query>
  query ($path: String!) {
    d: project (path: $path) {
      order
      slug
      title
      tags
      thumbnailLayout
      color
    }
  }
</page-query>

<script>
import { Fragment } from "vue-fragment";

import site from "../../content/site.json";

import Colophon from "~/components/Colophon";
import ProjectHero from "~/components/ProjectHero";
import Paginator from "~/components/Paginator";
import Tag from "~/components/Tag";

export default {
  components: {
    Fragment,
    Colophon,
    ProjectHero,
    Paginator,
    Tag,
  },
  metaInfo() {
    return {
      title: this.$page.d.title,
    };
  },
};
</script>

<template>
  <Layout singleColumn="true">
    <template slot="hero">
      <ProjectHero
        :headline="$page.d.title"
        :link="$page.d.externalLink"
        :color="$page.d.color"
      >
      </ProjectHero>
    </template>

    <!-- <VueRemarkContent class="project-content content" /> -->
  </Layout>
</template>

<style lang="scss"></style>
