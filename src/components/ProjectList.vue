<static-query>
  query Project ($page: Int) {
    projects: allProject (order: DESC, sortBy: "order", page: $page) {
      edges {
        node {
          title
          slug
          externalLink
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
    components: {
      Project
    },
    props: {
      limit: { default: 100 }
    },
    name: "ProjectList"
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
