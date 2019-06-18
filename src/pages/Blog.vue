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
  import CTA from "~/components/CTA";

  export default {
    components: {
      ArticleList, FilterHeader, SecondarySidebar, CTA
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

    <template slot="cta">
      <CTA :heading="$page.d.ctaHeadline" classes="u-margin-top-sm" />
    </template>

  </Layout>
</template>


<style lang="scss">
</style>
