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
        }
      }
    }
  }
</static-query>


<script>
  export default {
    props: {
      limit: { default: 12 }
    },
    name: "ArticleList"
  }
</script>


<template>
  <div class="g-columns">
    <div class="g-columns g-compact card-list">
      <div class="g-col" v-for="({ node }, i) in $static.articles.edges" v-if="i < limit">
        <g-link :to="node.path">
          <h2 v-html="node.title"/>
          <p v-html="node.description"/>
        </g-link>
        <span v-html="node.published"/>
      </div>
    </div>
  </div>
</template>


<style lang="scss">
</style>
