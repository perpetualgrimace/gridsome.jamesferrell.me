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
  import SecondarySidebar from "~/components/SecondarySidebar";
  
  export default {
    components: {
      ArticleList, FilterHeader, SecondarySidebar
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
      <SecondarySidebar :content="$page.d.content" />
    </template>

  </Layout>
</template>


<style lang="scss">
</style>
