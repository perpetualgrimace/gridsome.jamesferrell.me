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
      lazy:           { default: true },
      selectedFilter: { default: "all" },
      // defaults as warnings
      title:          { default: "missing `title` prop in Project.vue" },
      slug:           { default: "missing `slug` prop in Project.vue" },
      link:           { default: "#missing-`link`-prop-in-Project.vue" },
      color:          { default: "black" },
      tags:           { default: "missing `tags` prop in Project.vue" },
      mobileImg:      { default: false },
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
          // also generate ProjectDeviceMobile in the template
          return {
            name: "ProjectDeviceLaptop",
            img: this.laptopImg
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
      },
      hostname() {
        let {host} = new URL(this.link);
        if (host.split('.')[1] === 'bandcamp') {
          host = 'bandcamp.com';
        }
        return host
          .replace('www.', '')
          .replace('web.archive.org', 'archive.org')
          .replace('en.', '');
      },
      intro() {
        let prefix = 'View live site';
        if (this.hostname === 'archive.org') {
          prefix = 'View archived site';
        }
        if (this.hostname === 'dribbble.com') {
          prefix = "View designs";
        }
        if (this.hostname === 'bandcamp.com') {
          prefix = 'Listen';
        }
        return `${prefix} at `;
      }
    }
  };
</script>


<template>
  <article
    class="project dark-theme"
    :class="`${ layout }-project ${ isHidden ? 'is-hidden' : 'is-visible' }`"
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
        <h2 class="project-title heading u-font-xxl" tabindex="-1">
          {{ title }}
        </h2>

        <!-- tags -->
        <TagList :tags="splitTags" :selectedFilter="selectedFilter" />
      </div>

      <ProjectDeviceMobile v-if="layout === 'web' && mobileImg" :img="mobileImg" :lazy="lazy" />
      <component :is="component.name" :img="component.img" :lazy="lazy" />
    </div>

    <!-- where am I going? -->
    <div class="project-outbound" :id="slug">
      {{ intro }} {{ hostname }} <svg aria-hidden xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 16"><path fill="currentColor" d="M11 10h1v3c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h3v1H1v10h10v-3zM6 2l2.25 2.25L5 7.5 6.5 9l3.25-3.25L12 8V2H6z"/></svg>
    </div>
  </article>
</template>


<style lang="scss">

  ////////////////////////////////////
  // project
  ////////////////////////////////////

  // default project style
  .project {
    @include radial-gloss; // background style added in template
    // default layout properties
    max-height: rem(420);
    padding: 1rem;
    text-align: center;
    overflow: hidden;
    box-shadow: inset 0 -6px 30px -6px rgba($black, 0.175);

    // minor height+padding adjustment
    @media (min-width: $bp-xs) {
      max-height: rem(530);
      padding-top: 1.5rem;
    }

    // enough room to show entire laptop screen
    @media (min-width: $bp-sm) {
      max-height: none;
      padding-bottom: 1.875rem;
    }

    // add bigger padding
    @media (min-width: $bp-lg) {
      padding-left: 2rem;
      padding-right: 2rem;
      // left align text and laptop-container
      // NOTE: won't apply to mobile, album or controller
      text-align: left;
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
    @media (min-width: $bp-lg) {
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
    transition: opacity $duration-lg;

    // set transition timing
    & + .project-inner > *:not(:first-child) {
      transition: transform $duration-lg;

      // phone is in the foreground; it moves faster
      &.mobile-container {
        transition: transform $duration-md;
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

      & ~ .project-outbound {
        @include absolute-horizontal-center;
        opacity: 1;
      }
    }

    &:focus {
      outline-offset: -$border-width;
    }
  }


  ////////////////////////////////////
  // outbound indicator
  ////////////////////////////////////
  .project-outbound {
    @include box-shadow-lg($shadow-dark);
    position: absolute;
    left: 50%;
    transform: translate(-50%, -20%) scale(0.9);
    bottom: 40%;
    z-index: 2;
    font-size: $font-md;
    background-color: rgba($dark-3, 0.95);
    padding: 0.5em 1em;
    border-radius: $radius-sm;
    color: $white;
    // transitions
    opacity: 0;
    transition:
      opacity 0.075s ease-out,
      transform 0.075s ease-out;
  }
  .project-outbound > svg {
    vertical-align: middle;
    width: 1em;
    height: 1em;
    padding-left: 0.25em;
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
    @media (min-width: $bp-xs) {
      // position mobile container
      position: absolute;
      bottom: -1rem;
      right: 0;
      z-index: 2;
    }
  }


  // hide laptop
  .project .laptop-container {
    @media (max-width: $bp-xs - 0.001) {
      display: none;
    }
    // awkwardly resposition laptop
    @media (min-width: $bp-xs) and (max-width: 42em - 0.001) {
      margin-left: 1rem;
    }
  }


  // flipped device layout for even items:
  // phone left, laptop right
  @media (min-width: $bp-lg) {
    .project:nth-of-type(even) .mobile-container {
      right: auto; // reset right positioning
    }
    .project:nth-of-type(even) .laptop-container {
      left: 120px; // offset using pixels actually works, because everything is in pixels 😬
    }
  }
</style>
