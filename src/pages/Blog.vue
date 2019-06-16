<page-query>
  query Blog {
    d: blog(path: "/blog") {
      title
      headline
      content
    }
  }
</page-query>


<script>
  import site from "../../content/site.json";
  import ArticleList from "~/components/ArticleList";
  import FilterHeader from "~/components/FilterHeader";
  export default {
    components: {
      ArticleList,
      FilterHeader
    },
    metaInfo: {
      title: "Blog"
    },
    data() {
      return {
        site
      }
    }
  }
</script>


<template>
  <Layout>

    <FilterHeader />

    <ArticleList />
    <template slot="sidebar">
      <div v-html="$page.d.content" />
    </template>

  </Layout>
</template>


<style lang="scss">
</style>
