<page-query>
  query Home ($page: Int) {
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
</page-query>

<script>
  export default {
    metaInfo: {
      title: 'Hello, world!'
    }
  }
</script>

<template>
  <Layout>

    <ul>
      <li v-for="{ node } in $page.articles.edges">
        <g-link :to="node.path">
          <h2 v-html="node.title"/>
          <p v-html="node.description"/>
        </g-link>
        <span v-html="node.published"/>
      </li>
    </ul>

  </Layout>
</template>


<style lang="scss">
  .home-links a {
    margin-right: 1rem;
  }
</style>
