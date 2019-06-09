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
      visible:       { default: true },
      layout:        { default: "web" },
      comingSoon:    { default: false },
      lazy:          { default: true },
      // defaults as warnings
      title:         { default: "missing `title` prop in Project.vue" },
      slug:          { default: "missing `slug` prop in Project.vue" },
      link:          { default: "#missing-`link`-prop-in-Project.vue" },
      color:         { default: "black" },
      tags:          { default: "missing `tags` prop in Project.vue" },
      mobileImg:     { default: "missing-`mobileImg`-prop-in-Project.vue" },
      laptopImg:     { default: "missing-`laptopImg`-prop-in-Project.vue" },
      albumImg:      { default: "missing-`albumImg`-prop-in-Project.vue" },
      controllerImg: { default: "missing-`controllerImg`-prop-in-Project.vue" }
    },
    computed: {
      splitTags() {
        return this.tags.split(",");
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
      }
    }
  };
</script>


<template>
  <article
    :class="`project ${ layout }-project dark-theme${ comingSoon ? ' is-coming-soon' : '' }`"
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
        <TagList :tags="splitTags" />
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
          color $timing-gradual,
          background $timing;
      }

      // interactions
      .project-link {
        cursor: default;
        background-color: transparent !important;

        &:hover + .project-banner {
          color: $white;
          background-color: $brand-color;
        }
      }
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
    background-color: rgba($white, 0.05);
    z-index: 3;
    // to transition
    opacity: 0;

    // interactions
    &:hover, &:focus {
      opacity: 1;

      // phone is in the foreground; it moves farther, faster
      & ~ .project-inner .mobile-container {
        transform: translateY(-12px);
      }

      // other items are in the background; they move less, slower
      & ~ .project-inner .laptop-container,
      & ~ .project-inner .controller-container,
      & ~ .project-inner .album-container {
        transform: translateY(-4px);
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


  ////////////////////////////////////
  // controller positioning
  ////////////////////////////////////

  // keep image centered within container
  .controller-container {
    text-align: center;
  }


  // hide the cord on small viewports
  @media (max-width: $device-tweakpoint-l - 0.001) {
    // limit container height
    .controller-container {
      overflow: hidden;
      height: 160px;
    }
    // position image so cord is hidden
    .controller-img {
      bottom: 75px;
      max-width: 100%; // flow off the screen

      // when the controller starts to scale down, switch to percentage based units for positioning
      @media (max-width: 24em - 0.001) {
        bottom: 0;
        margin-top: -20%;
      }
    }
  }


  // caption left, image right layout
  @media (min-width: $device-tweakpoint-l) {

    // set container height
    .controller-project {
      height: rem(300);

      // position controller right
      .controller-container {
        position: absolute;
        text-align: right;
        width: 50%;
        top: -1.5rem;
        right: 0;
      }

      // let the image be actual size and break out of the container slightly if needed
      .controller-img {
        max-width: none;
      }

      // make the caption vertically centerable
      .project-inner {
        height: rem(220);
      }

      // vertically center caption, limit width
      .project-caption {
        @include vertical-center;
        width: 50%;
      }
    }
  }


  ////////////////////////////////////
  // album positioning
  ////////////////////////////////////

  // make the album look physical
  .album-img {
    @include device-shadow;
    border-radius: $radius;
  }


  // caption left, image right layout
  @media (min-width: $device-tweakpoint-l) {

    // set container height
    .album-project {
      height: rem(400);

      // position album right
      .album-container {
        float: right;
        width: 49.9%;
        text-align: right;
      }

      // set album size by height
      .album-img {
        height: rem(340);
        width: auto;
        max-width: none;
      }

      // make the caption vertically centerable
      .project-inner {
        height: rem(360);
      }

      // vertically center caption, limit width
      .project-caption {
        @include vertical-center;
        width: 50%;
        float: left; // needed to make the floated album not clear
      }
    }
  }
</style>
