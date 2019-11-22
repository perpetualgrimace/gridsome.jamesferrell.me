<static-query>
  query BulletList ($page: Int) {
    lists: allBulletList (page: $page) {
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
    name: "BulletList",
    props: {
      slug: { default: "keynote-commands-list" }
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
  <div class="bullet-list content epsilon">
    <div v-html="list" />
  </div>
</template>


<style lang="scss">
  .bullet-list {
    @include list-block;
  }
</style>
