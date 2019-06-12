<static-query>
  query Project ($page: Int) {
    projects: allProject (order: DESC, sortBy: "order", page: $page) {
      edges {
        node {
          title
          slug
          externalLink
          order
          color
          thumbnailLayout
          tags
          comingSoon
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
  import Project from "~/components/Project.vue";

  export default {
    name: "ProjectList",
    components: {
      Project
    },
    props: {
      limit: { default: 100 }
    },
    // laziest lazyloading
    mounted() {
      // no SSR errors please
      if (typeof document !== "undefined") {
        let sources = document.querySelectorAll("[data-src]");

        // set real src attribute from data-src attr
        sources.forEach(source => {
          source.setAttribute("src", source.getAttribute("data-src"));

          // if there's a data-srcset attr, use that too
          if (source.getAttribute("data-srcset")) {
            source.setAttribute("srcset", source.getAttribute("data-srcset"));
          }
        });
      }
    }
  }
</script>


<template>
  <div class="project-list">
    <Project
      v-for="({ node }, i) in $static.projects.edges"
      v-if="i < limit"
      :title="node.title"
      :slug="node.slug"
      :link="node.externalLink"
      :color="node.color"
      :layout="node.thumbnailLayout"
      :lazy="node.order !== $static.projects.edges.length"
      :tags="node.tags"
      :comingSoon="node.comingSoon"
      :mobileImg="node.mobileImg"
      :laptopImg="node.laptopImg"
      :albumImg="node.albumImg"
      :controllerImg="node.controllerImg"
      :key="node.slug"
    />
  </div>
</template>


<style lang="scss">
  // add rounded corners to list
  .project-list {
    border-radius: 2px;
    overflow: hidden;
  }
</style>
