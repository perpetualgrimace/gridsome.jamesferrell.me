<script>
import { getBaseUrlFromString } from "~/helpers.js";

import ProjectIframeHeader from "~/components/ProjectIframeHeader";
import ProjectCarousel from "~/components/ProjectCarousel";
import ProjectImage from "~/components/ProjectImage";
import ProjectBlocked from "~/components/ProjectBlocked";

export default {
  name: "ProjectVisualContent",
  components: {
    ProjectIframeHeader,
    ProjectCarousel,
    ProjectImage,
    ProjectBlocked,
  },
  props: {
    page: { default: {} },
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
};
</script>

<template>
  <div class="project-visual-content">
    <div
      v-if="page.externalLink"
      class="project-iframe-wrapper u-margins-auto"
      :class="isFullscreen ? 'is-fullscreen' : ''"
      :style="
        !page.iframeBlocked
          ? 'min-height: 480px; height: 75vh;'
          : 'min-height: 240px; height: 60vh;'
      "
    >
      <ProjectIframeHeader
        :isFullscreen="isFullscreen"
        :onToggleFullscreen="toggleFullscreen"
        :baseUrl="getBaseUrlFromString(page.externalLink)"
      />

      <iframe
        v-if="!page.iframeBlocked"
        :src="page.externalLink"
        loading="lazy"
        frameborder="0"
        style="width: 100%; height: 100%;"
      />

      <ProjectBlocked
        v-else-if="page.iframeBlocked"
        :externalLink="page.externalLink"
      />
    </div>

    <ProjectCarousel
      v-if="page.slides.length > 1"
      :slides="page.slides"
      :slug="page.slug"
      :maxWidth="page.maxWidth"
    />
    <ProjectImage
      v-else-if="page.slides.length === 1"
      :src="page.slides[0]"
      :slug="page.slug"
      :maxWidth="page.maxWidth"
    />
  </div>
</template>

<style lang="scss">
.project-visual-content {
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
  max-height: 100vh;
  resize: both;
  overflow: hidden;
  border-top: 1px solid $gray;
  border-radius: calc(#{$radius-md} - 1px);

  iframe {
    border-top: 1px solid $dark-3;
    border-radius: 0 0 $radius-md $radius-md;
    background: #fff;
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
    width: 100% !important;
    max-width: 100%;
    height: calc(100% - #{$nav-height}) !important;
    top: $nav-height;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 12;

    &:after {
      display: none;
    }
  }
}
</style>
