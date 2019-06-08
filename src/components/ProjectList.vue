<static-query>
  query Project ($page: Int) {
    projects: allProject (page: $page) {
      edges {
        node {
          title
          slug
          externalLink
        }
      }
    }
  }
</static-query>


<script>
  import Card from "~/components/Card.vue";

  export default {
    components: {
      Card
    },
    props: {
      limit: { default: 12 }
    },
    name: "ProjectList"
  }
</script>


<template>
  <div class="g-columns">
    <div class="g-columns g-compact card-list">
      <Card
        v-for="({ node }, i) in $static.projects.edges"
        v-if="i < limit"
        :link="node.externalLink"
        :title="node.title"
        :slug="node.slug"
        :key="node.slug"
      />
    </div>
  </div>
</template>


<style lang="scss">
</style>
