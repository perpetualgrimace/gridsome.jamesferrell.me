<script>
  import TagList from "~/components/TagList";
  import ProjectDeviceMobile from "~/components/ProjectDeviceMobile";
  import ProjectDeviceLaptop from "~/components/ProjectDeviceLaptop";
  import ProjectAlbumArt from "~/components/ProjectAlbumArt";
  import ProjectController from "~/components/ProjectController";

  export default {
    name: "Project",
    components: {
      TagList,
      ProjectDeviceMobile,
      ProjectDeviceLaptop,
      ProjectAlbumArt,
      ProjectController
    },
    props: {
      // useful defaults
      layout:         { default: "web" },
      comingSoon:     { default: false },
      lazy:           { default: true },
      selectedFilter: { default: "all" },
      // defaults as warnings
      title:          { default: "missing `title` prop in Project.vue" },
      slug:           { default: "missing `slug` prop in Project.vue" },
      link:           { default: "#missing-`link`-prop-in-Project.vue" },
      color:          { default: "black" },
      tags:           { default: "missing `tags` prop in Project.vue" },
      mobileImg:      { default: "missing-`mobileImg`-prop-in-Project.vue" },
      laptopImg:      { default: "missing-`laptopImg`-prop-in-Project.vue" },
      albumImg:       { default: "missing-`albumImg`-prop-in-Project.vue" },
      controllerImg:  { default: "missing-`controllerImg`-prop-in-Project.vue" }
    },
    computed: {
      splitTags() {
        return this.tags.toLowerCase().split(",");
      },
      component() {
        if (this.layout === "web") {
          // also generate ProjectDeviceLaptop in the template
          return {
            name: "ProjectDeviceMobile",
            img: this.mobileImg
          };
        }
        else if (this.layout === "album") {
          return {
            name: "ProjectAlbumArt",
            img: this.albumImg
          };
        }
        else if (this.layout === "controller") {
          return {
            name: "ProjectController",
            img: this.controllerImg
          };
        }
        else return false;
      },
      isHidden() {
        if (this.selectedFilter !== "all" && !this.splitTags.includes(this.selectedFilter)) {
          return true;
        }
        return false;
      }
    }
  };
</script>


<template>
  <article
    class="project dark-theme"
    :class="`${ layout }-project${ comingSoon ? ' is-coming-soon' : '' } ${ isHidden ? 'is-hidden' : 'is-visible' }`"
    :style="{ 'background-color': color }"
  >

    <!-- cover link -->
    <a v-if="link" :href="link" class="project-link" :aria-describedby="slug" />
    <!-- no link -->
    <span v-else class="project-link" />

    <!-- content -->
    <div class="project-inner">
      <div class="project-caption">
        <!-- heading -->
        <h2 class="project-title heading beta" tabindex="-1" :id="slug">
          {{ title }}
        </h2>

        <!-- tags -->
        <TagList :tags="splitTags" :selectedFilter="selectedFilter" />
      </div>

      <component :is="component.name" :img="component.img" :lazy="lazy" />
      <ProjectDeviceLaptop v-if="layout === 'web'" :img="laptopImg" :lazy="lazy" />

    </div>

    <!-- coming soon -->
    <p v-if="comingSoon" class="project-banner epsilon">Coming soon</p>
  </article>
</template>


<style lang="scss">

  ////////////////////////////////////
  // project
  ////////////////////////////////////

  // tweakpoints
  $device-tweakpoint-s: 36em;
  $device-tweakpoint-l: 68em;

  // default project style
  .project {
    @include radial-gloss; // background style added in template
    overflow: hidden;
    // default layout properties
    max-height: rem(420);
    padding: 1rem;
    text-align: center;
    box-shadow: inset 0 -6px 30px -6px rgba($brand-black, 0.175);

    // minor height+padding adjustment
    @media (min-width: $device-tweakpoint-s) {
      max-height: rem(530);
      padding-top: 1.5rem;
    }

    // enough room to show entire laptop screen
    @media (min-width: $s) {
      max-height: none;
      padding-bottom: 1.875rem;
    }

    // add bigger padding
    @media (min-width: $device-tweakpoint-l) {
      padding-left: 2rem;
      padding-right: 2rem;
      // left align text and laptop-container
      // NOTE: won't apply to mobile, album or controller
      text-align: left;
    }

    // coming soon; no hovering
    &.is-coming-soon {

      // banner
      .project-banner {
        // sizing
        display: block;
        padding: 0.5em 3em;
        // positioning
        position: absolute;
        transform: rotateZ(-45deg);
        top: 1.75em;
        left: -3.25em;
        z-index: 1;
        // theming
        color: $black;
        background-color: $light-2;
        box-shadow: 0 1px 1em rgba($black, 0.9);
        // typography
        text-align: center;
        text-transform: uppercase;
        // transitions
        transition:
          color $timing-long,
          background $timing;
      }

      // interactions
      .project-link {
        cursor: default;
        background-color: transparent !important;

        &:hover + .project-inner .device-container {
          transform: none;
        }

        &:hover + .project-banner {
          color: $white;
          background-color: $brand-color;
        }
      }
    }

    // hidden state
    &.is-hidden {
      display: none;
    }
  }


  ////////////////////////////////////
  // project item inner container
  ////////////////////////////////////

  // project item inner container
  .project-inner {
    max-width: 680px; // everything in pixels, woo!
    // center inner-container
    margin-left: auto;
    margin-right: auto;
  }


  ////////////////////////////////////
  // tag list
  ////////////////////////////////////

  // space out tag list
  .project .tag-list {
    margin-top: rem(13); // fudged to fit the baseline
    margin-bottom: $gutter * 1.5;

    // add more margin at left-aligned layout
    @media (min-width: $device-tweakpoint-l) {
      margin-bottom: $gutter * 1.5;
    }
  }


  ////////////////////////////////////
  // title
  ////////////////////////////////////

  // add text shadow
  .project-title {
    @include text-shadow-lg;
  }


  ////////////////////////////////////
  // link & interactions
  ////////////////////////////////////

  // make entire project item clickable, hide link by default
  .project-link {
    @include absolute-expand;
    z-index: 3;
    background-color: rgba($white, 0.05);
    // transitions
    opacity: 0;
    transition: opacity $timing-longest;

    // set transition timing
    & + .project-inner > *:not(:first-child) {
      transition: transform $timing-longest;

      // phone is in the foreground; it moves faster
      &.mobile-container {
        transition: transform $timing-long;
      }
    }
    // interactions
    &:hover, &:focus {
      opacity: 1;

      & + .project-inner > *:not(:first-child) {
        transform: translateY(-4px);

        // phone is in the foreground; it moves farther
        &.mobile-container {
          transform: translateY(-12px);
        }
      }
    }
  }


  ////////////////////////////////////
  // image positioning
  ////////////////////////////////////

  // make image containers text-alignable
  .project-img,
  .device-container {
    display: inline-block;
  }


  ////////////////////////////////////
  // device positioning
  ////////////////////////////////////

  // hide phone and only show laptop
  .project .mobile-container {
    @media (min-width: $device-tweakpoint-s) {
      // position mobile container
      position: absolute;
      bottom: -1rem;
      right: 0;
      z-index: 2;
    }
  }


  // hide laptop
  .project .laptop-container {
    @media (max-width: $device-tweakpoint-s - 0.001) {
      display: none;
    }
    // awkwardly resposition laptop
    @media (min-width: $device-tweakpoint-s) and (max-width: 42em - 0.001) {
      margin-left: 1rem;
    }
  }


  // flipped device layout for even items:
  // phone left, laptop right
  @media (min-width: $device-tweakpoint-l) {
    .project:nth-of-type(even) .mobile-container {
      right: auto; // reset right positioning
    }
    .project:nth-of-type(even) .laptop-container {
      left: 120px; // offset using pixels actually works, because everything is in pixels 😬
    }
  }
</style>
