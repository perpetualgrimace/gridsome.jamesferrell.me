<page-query>
  query ($path: String!) {
    d: project (path: $path) {
      id
      slug
      title
      tags
      slides
      maxWidth
      color
      externalLink
      iframeBlocked
      role
      company
      timePeriod
    }
  }
</page-query>

<script>
import { generateProjectSubhead } from "~/helpers.js";

import Colophon from "~/components/Colophon";
import ProjectHero from "~/components/ProjectHero";
import ProjectVisualContent from "~/components/ProjectVisualContent";
import ProjectPaginator from "~/components/ProjectPaginator";

export default {
  components: {
    Colophon,
    ProjectHero,
    ProjectVisualContent,
    ProjectPaginator,
  },
  data() {
    return {
      isFullscreen: false,
    };
  },
  methods: {
    generateProjectSubhead,
  },
  metaInfo() {
    return {
      title: this.$page.d.title,
    };
  },
};
</script>

<template>
  <Layout :singleColumn="true">
    <template slot="hero">
      <ProjectHero
        :headline="$page.d.title"
        :link="$page.d.externalLink"
        :color="$page.d.color"
        :subhead="generateProjectSubhead($page.d)"
      >
      </ProjectHero>
    </template>

    <ProjectVisualContent :page="$page.d" />

    <VueRemarkContent class="project-text-content content" />

    <template slot="cta">
      <ProjectPaginator :currentID="$page.d.id" />
      <Colophon classes="u-margin-bottom-sm" />
    </template>
  </Layout>
</template>

<style lang="scss">
.project-text-content:not(:empty) {
  margin-top: $gutter * 1.25;
}
</style>
