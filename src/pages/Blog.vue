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
  import {formatHashAsTag} from "~/helpers.js";
  import ArticleList from "~/components/ArticleList";
  import FilterHero from "~/components/FilterHero";
  import SecondarySidebar from "~/components/SecondarySidebar";
  import CTA from "~/components/CTA";

  export default {
    components: {
      ArticleList, FilterHero, SecondarySidebar, CTA
    },
    metaInfo: {
      title: "Blog"
    },
    data() {
      return {
        site,
        selectedFilter: "all"
      }
    },
    methods: {
      formatHashAsTag,
      handleSelectFilter(selectedFilter) {
        this.selectedFilter = selectedFilter;
      }
    },
    mounted() {
      // no SSR errors please
      if (typeof window !== "undefined") {
        // get selectedFilter from hash
        if (window.location.hash || window.location.hash !== "#all") {
          this.selectedFilter = formatHashAsTag(window.location.hash)
        }
      }
    },
    destroyed() {
      this.selectedFilter = "all";
    }
  }
</script>


<template>
  <Layout>

    <FilterHero
      @selectFilter="handleSelectFilter"
      :selectedFilter="selectedFilter || 'all'"
    />

    <ArticleList :selectedFilter="selectedFilter || 'all'" />

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
