<script>
import { Fragment } from "vue-fragment";

import { getBaseUrlFromString } from "~/helpers.js";

import Button from "~/components/Button";
import ProjectIframeHeader from "~/components/ProjectIframeHeader";

export default {
  name: "ProjectVisualContent",
  components: {
    Fragment,
    Button,
    ProjectIframeHeader,
    Carousel: () =>
      import("vue-carousel/src/index")
        .then((m) => m.Carousel)
        .catch(),
    Slide: () =>
      import("vue-carousel/src/index")
        .then((m) => m.Slide)
        .catch(),
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
      class="project-iframe-wrapper u-margins-auto"
      :class="isFullscreen ? 'is-fullscreen' : ''"
      :style="
        !page.iframeBlocked
          ? 'min-height: 480px; height: 75vh;'
          : 'min-height: 240px; height: 60vh;'
      "
      v-if="page.externalLink"
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

      <div class="project-blocked" v-else-if="page.iframeBlocked">
        <g-image src="/images/xzbitsad.jpg" alt="Xhibit is sad" />
        <h2 class="u-font-xxl u-margin-bottom">
          Yo dawg, I heard you like websites
        </h2>
        <p class="u-font-lg u-margin-bottom">
          Unfortunately,
          <a :href="page.externalLink" target="_blank">
            {{ getBaseUrlFromString(page.externalLink) }}
          </a>
          won’t let me put their website in my website — so in this case
          you won't be able to website while you website
        </p>
        <p class="u-font-sm">
          <a class="button" :href="page.externalLink" target="_blank">
            Open
            <span class="u-visually-hidden">{{
              getBaseUrlFromString(page.externalLink)
            }}</span>
            in a new tab
          </a>
        </p>
      </div>
    </div>

    <div
      class="project-carousel-wrapper u-margins-auto"
      v-else-if="page.slides.length"
      :style="`max-width: ${page.maxWidth || '100%'};`"
    >
      <Carousel :perPage="1" :navigationEnabled="true">
        <Slide v-for="({ slide }, i) in page.slides" :key="i">
          <g-image
            class="image-hero-img"
            :src="`/images/projects/${page.slug}/${page.slides[i]}`"
            draggable="false"
          />
        </Slide>
      </Carousel>
    </div>
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

.project-blocked {
  height: 100%;
  background-color: $dark-3;
  padding: $gutter * 2 $gutter * 2 $gutter $gutter * 2;
  border-top: 1px solid $black;
  border-radius: 0 0 $radius-md $radius-md;
  overflow-y: auto;

  img {
    float: left;
    width: 14rem;
    max-width: 33.333%;
    min-width: 5rem;
    margin-right: $gutter * 2;
    margin-bottom: $gutter;
  }
}
</style>
