<static-query>
  query Blog ($page: Int) {
    articles: allArticle (page: $page, sortBy: "published") {
      edges {
        node {
          id
          title
          published
          updated
          description
          path
          slug
          tags: topic
        }
      }
    }
  }
</static-query>


<script>
  import Card from "~/components/Card";

  export default {
    components: {
      Card
    },
    props: {
      limit: { default: 12 },
      heading: { default: null },
      selectedFilter: { default: "all" }
    },
    name: "ArticleList"
  }
</script>


<template>
  <div class="g-columns">
    <h2 class="u-margin-bottom u-font-xl" v-if="heading">
      {{ heading }}
    </h2>
    <div class="g-columns g-compact card-list">
      <Card
        v-for="({ node }, i) in $static.articles.edges"
        v-if="i < limit"
        :link="node.path"
        :title="node.title"
        :description="node.description"
        :published="node.published"
        :updated="node.updated"
        :slug="node.slug"
        :tags="node.tags"
        :selectedFilter="selectedFilter"
        :key="node.slug"
      />
    </div>
  </div>
</template>


<style lang="scss">
</style>
