<static-query>
  query Project ($page: Int) {
    projects: allProject (order: DESC, sortBy: "id", page: $page) {
      edges {
        node {
          title
          slug
          externalLink
          id
          color
          thumbnailLayout
          tags
          mobileImg
          laptopImg
          albumImg
          controllerImg
        }
      }
    }
  }
</static-query>

<script>
import Project from "~/components/Project";

export default {
  name: "ProjectList",
  components: {
    Project,
  },
  props: {
    limit: { default: 100 },
    selectedFilter: { default: "all" },
    overlap: { default: false },
  },
  // laziest lazyloading
  mounted() {
    // no SSR errors please
    if (typeof document !== "undefined") {
      let sources = document.querySelectorAll("[data-src]");

      // set real src attribute from data-src attr
      sources.forEach((source) => {
        source.setAttribute("src", source.getAttribute("data-src"));

        // if there's a data-srcset attr, use that too
        if (source.getAttribute("data-srcset")) {
          source.setAttribute(
            "srcset",
            source.getAttribute("data-srcset")
          );
        }
      });
    }
  },
};
</script>

<template>
  <div class="project-list" :class="overlap ? 'is-overlapping' : ''">
    <Project
      v-for="({ node }, i) in $static.projects.edges"
      v-if="i < limit && node.id"
      :title="node.title"
      :slug="node.slug"
      :link="node.externalLink"
      :color="node.color"
      :layout="node.thumbnailLayout"
      :lazy="node.order !== $static.projects.edges.length"
      :tags="node.tags"
      :mobileImg="node.mobileImg"
      :laptopImg="node.laptopImg"
      :albumImg="node.albumImg"
      :controllerImg="node.controllerImg"
      :selectedFilter="selectedFilter"
      :key="node.slug"
    />
  </div>
</template>

<style lang="scss">
// add rounded corners to list
.project-list {
  border-radius: $radius-md;
  overflow: hidden;
  z-index: 1; /* in front of hero overlay */
}

.project-list.is-overlapping {
  @media (min-width: $bp-md) {
    margin-top: -$hero-overlap;
  }
}
</style>
