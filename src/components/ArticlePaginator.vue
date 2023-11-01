<static-query>
  query Blog ($page: Int) {
    articles: allArticle (page: $page, sortBy: "id") {
      edges {
        node {
          id
          title
          path
          slug
        }
      }
    }
  }
</static-query>

<script>
import Paginator from "~/components/Paginator";

export default {
  name: "ArticlePaginator",
  props: {
    currentID: { default: null },
    allPages: { default: null },
  },
  components: { Paginator },
};
</script>

<template>
  <Paginator
    :allPages="$static.articles.edges"
    :currentID="currentID"
    template="article"
  />
</template>
