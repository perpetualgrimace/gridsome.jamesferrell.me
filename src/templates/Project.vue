<page-query>
  query ($path: String!) {
    d: project (path: $path) {
      id
      slug
      title
      tags
      color
      externalLink
    }
  }
</page-query>

<script>
import { Fragment } from "vue-fragment";

import site from "../../content/site.json";

import Colophon from "~/components/Colophon";
import ProjectHero from "~/components/ProjectHero";
import ProjectPaginator from "~/components/ProjectPaginator";
import Tag from "~/components/Tag";

export default {
  components: {
    Fragment,
    Colophon,
    ProjectHero,
    ProjectPaginator,
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
  <Layout :singleColumn="true">
    <template slot="hero">
      <ProjectHero
        :headline="$page.d.title"
        :link="$page.d.externalLink"
        :color="$page.d.color"
      >
      </ProjectHero>
    </template>

    <div class="project-iframe-wrapper u-margins-auto">
      <iframe
        :src="$page.d.externalLink"
        loading="lazy"
        frameborder="0"
        style="width: 100%; height: 100%;"
      />
    </div>

    <VueRemarkContent class="project-content content" />

    <template slot="cta">
      <ProjectPaginator :currentID="$page.d.id" />
      <Colophon classes="u-margin-bottom-sm" />
    </template>
  </Layout>
</template>

<style lang="scss">
.project-iframe-wrapper {
  @include device-shadow;
  width: 100%;
  min-width: 320px;
  max-width: 100%;
  height: 75vh;
  min-height: 480px;
  max-height: 100vh;
  resize: both;
  overflow: hidden;
  padding: 0.75rem 0.75rem 1.25rem 0.75rem;
  border-radius: $radius-sm;
  background-color: $dark-1;

  @media (min-width: $bp-md) {
    margin-top: -$hero-overlap - 0.45;
    z-index: 1;

    &:after {
      font-size: $font-sm;
      color: $white;
      display: block;
      content: "Resize me →";
      position: absolute;
      bottom: 0;
      right: 0.75rem;
    }
  }
}
</style>
