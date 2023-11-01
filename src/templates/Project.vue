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
    }
  }
</page-query>

<script>
import { Fragment } from "vue-fragment";
import { Carousel, Slide } from "vue-carousel";

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
    Carousel,
    Slide,
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
    <div class="project-outer-wrapper">
      <div
        class="project-iframe-wrapper u-margins-auto"
        v-if="$page.d.externalLink"
      >
        <iframe
          :src="$page.d.externalLink"
          loading="lazy"
          frameborder="0"
          style="width: 100%; height: 100%;"
        />
      </div>

      <div
        class="project-carousel-wrapper u-margins-auto"
        v-else-if="$page.d.slides.length"
        :style="`max-width: ${$page.d.maxWidth || '100%'};`"
      >
        <Carousel :perPage="1" :navigationEnabled="true">
          <Slide v-for="({ slide }, i) in $page.d.slides" :key="i">
            <g-image
              class="image-hero-img"
              :src="
                `/images/projects/${$page.d.slug}/${$page.d.slides[i]}`
              "
              draggable="false"
            />
          </Slide>
        </Carousel>
      </div>
    </div>

    <VueRemarkContent class="project-content content" />

    <template slot="cta">
      <ProjectPaginator :currentID="$page.d.id" />
      <Colophon classes="u-margin-bottom-sm" />
    </template>
  </Layout>
</template>

<style lang="scss">
.project-outer-wrapper {
  width: 100%;

  @media (min-width: $bp-md) {
    margin-top: -$hero-overlap - 0.45;
    z-index: 1;
  }
}
.project-iframe-wrapper {
  @include device-shadow;
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
</style>
