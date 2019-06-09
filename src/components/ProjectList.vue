<static-query>
  query Project ($page: Int) {
    projects: allProject (order: DESC, sortBy: "order", page: $page) {
      edges {
        node {
          title
          slug
          externalLink
          color
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
      :link="node.externalLink"
      :title="node.title"
      :slug="node.slug"
      :key="node.slug"
      :color="node.color"
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
