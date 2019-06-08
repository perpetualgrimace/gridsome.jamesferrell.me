<static-query>
  query Blog ($page: Int) {
    articles: allArticle (page: $page) {
      edges {
        node {
          _id
          title
          published (format: "MMMM YYYY")
          description
          path
          slug
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
    name: "ArticleList"
  }
</script>


<template>
  <div class="g-columns">
    <div class="g-columns g-compact card-list">
      <Card
        v-for="({ node }, i) in $static.articles.edges"
        v-if="i < limit"
        :link="node.path"
        :title="node.title"
        :description="node.description"
        :published="node.published"
        :slug="node.slug"
        :key="node.slug"
      />
    </div>
  </div>
</template>


<style lang="scss">
</style>
