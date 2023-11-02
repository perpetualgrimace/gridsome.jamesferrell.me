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

import { getBaseUrlFromString } from "~/helpers.js";

import Colophon from "~/components/Colophon";
import ProjectHero from "~/components/ProjectHero";
import ProjectIframeHeader from "~/components/ProjectIframeHeader";
import ProjectPaginator from "~/components/ProjectPaginator";
import Tag from "~/components/Tag";

export default {
  components: {
    Fragment,
    Colophon,
    ProjectHero,
    ProjectIframeHeader,
    ProjectPaginator,
    Tag,
    Carousel,
    Slide,
  },
  data() {
    return {
      isFullscreen: false,
    };
  },
  methods: {
    getBaseUrlFromString,
    toggleFullscreen: function(e) {
      if (e) e.preventDefault();
      this.isFullscreen = !this.isFullscreen;
    },
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
        :class="isFullscreen ? 'is-fullscreen' : ''"
        v-if="$page.d.externalLink"
      >
        <ProjectIframeHeader
          :isFullscreen="isFullscreen"
          :onToggleFullscreen="toggleFullscreen"
          :baseUrl="getBaseUrlFromString($page.d.externalLink)"
        />

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
  @include fullwidth;

  @media (min-width: $bp-md) {
    margin-top: -$hero-overlap - 0.45;
    z-index: 1;
  }
}

.project-iframe-wrapper {
  @include device-shadow;
  border-radius: $radius-md;
  background-color: $dark-2;
  padding: 1.5rem 1px 1px 1px;
  width: 48rem;
  min-width: 320px;
  max-width: calc(100% - #{$gutter * 2});
  height: 75vh;
  min-height: 480px;
  max-height: 100vh;
  resize: both;
  overflow: hidden;
  border-top: 1px solid $gray;
  border-radius: calc(#{$radius-md} - 1px);

  iframe {
    border-top: 1px solid $dark-3;
    border-radius: 0 0 $radius-md $radius-md;
  }

  &:after {
    @include device-shadow;
    content: "resize me →";
    display: block;
    position: absolute;
    bottom: 0;
    right: 0;
    color: $light-3;
    background-color: $dark-2;
    font-size: $font-sm;
    padding: 0.15em 1.25em 0.2em 0.75em;
    border-radius: $radius-md 0 $radius-md 0;
  }

  &.is-fullscreen {
    position: fixed;
    width: 100%;
    max-width: 100%;
    height: calc(100% - #{$nav-height});
    top: $nav-height;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 12;
  }
}

.project-content:not(:empty) {
  margin-top: $gutter * 1.25;
}
</style>
