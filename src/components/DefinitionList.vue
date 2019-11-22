<static-query>
  query DefinitionList ($page: Int) {
    lists: allDefinitionList (page: $page) {
      edges {
        node {
          path
          content
          slug
        }
      }
    }
  }
</static-query>


<script>
  export default {
    name: "DefinitionList",
    props: {
      slug: { default: "employment-list" }
    },
    computed: {
      list() {
        const edges = this.$static.lists.edges;
        const currentList = edges.filter(edge => edge.node.slug === this.slug)[0].node.content;
        return currentList;
      }
    }
  };
</script>


<template>
  <div class="block block-list block-definition-list content epsilon">
    <div v-html="list" />
  </div>
</template>

<!-- TODO: style bullet list -->
<style lang="scss">

</style>
