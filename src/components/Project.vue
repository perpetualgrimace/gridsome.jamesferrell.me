<script>
import TagList from "~/components/TagList";
import ProjectDeviceMobile from "~/components/ProjectDeviceMobile";
import ProjectDeviceLaptop from "~/components/ProjectDeviceLaptop";
import ProjectAlbumArt from "~/components/ProjectAlbumArt";
import ProjectController from "~/components/ProjectController";
import ProjectThumbnail from "~/components/ProjectThumbnail";

export default {
  name: "Project",
  components: {
    TagList,
    ProjectDeviceMobile,
    ProjectDeviceLaptop,
    ProjectAlbumArt,
    ProjectController,
    ProjectThumbnail,
  },
  props: {
    // useful defaults
    layout: { default: "web" },
    lazy: { default: true },
    selectedFilter: { default: "all" },
    // defaults as warnings
    title: { default: "missing `title` prop in Project.vue" },
    slug: { default: "missing `slug` prop in Project.vue" },
    link: { default: "#missing `link` prop in Project.vue" },
    color: { default: "black" },
    tags: { default: "missing `tags` prop in Project.vue" },
    mobileImg: { default: false },
    laptopImg: { default: "missing `laptopImg` prop in Project.vue" },
    albumImg: { default: "missing `albumImg` prop in Project.vue" },
    controllerImg: {
      default: "missing `controllerImg` prop in Project.vue",
    },
    thumbnailImg: {
      default: "missing `thumbnailImg` prop in Project.vue",
    },
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
          img: this.laptopImg,
        };
      } else if (this.layout === "album") {
        return {
          name: "ProjectAlbumArt",
          img: this.albumImg,
        };
      } else if (this.layout === "controller") {
        return {
          name: "ProjectController",
          img: this.controllerImg,
        };
      } else
        return {
          name: "ProjectThumbnail",
          img: this.thumbnailImg,
        };
    },
    isHidden() {
      if (
        this.selectedFilter !== "all" &&
        !this.splitTags.includes(this.selectedFilter)
      ) {
        return true;
      }
      return false;
    },
  },
};
</script>

<template>
  <article
    class="project dark-theme"
    :class="`${layout}-project ${isHidden ? 'is-hidden' : 'is-visible'}`"
    :style="{ 'background-color': color }"
  >
    <!-- cover link -->
    <a
      :href="`/projects/${slug}`"
      class="project-link"
      :aria-describedby="slug"
    />

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

      <ProjectDeviceMobile
        v-if="layout === 'web' && mobileImg"
        :img="mobileImg"
        :lazy="lazy"
      />
      <component :is="component.name" :img="component.img" :lazy="lazy" />
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
  &:hover,
  &:focus {
    opacity: 1;

    & + .project-inner > *:not(:first-child) {
      transform: translateY(-4px);

      // phone is in the foreground; it moves farther
      &.mobile-container {
        transform: translateY(-12px);
      }
    }
  }

  &:focus {
    outline-offset: -$border-width;
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
</style>
