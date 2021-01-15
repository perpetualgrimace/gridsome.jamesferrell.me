<page-query>
  query Blog {
    d: blog(path: "/blog") {
      title
      headline
      content
      heroImg
    }
  }
</page-query>


<script>
  import site from "../../content/site.json";
  import {formatHashAsTag} from "~/helpers.js";
  import ArticleList from "~/components/ArticleList";
  import FilterHero from "~/components/FilterHero";
  import Sidebar from "~/components/Sidebar";
  import CTA from "~/components/CTA";

  export default {
    components: {
      ArticleList, FilterHero, Sidebar, CTA
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
  <Layout :singleColumn="true">
    <template slot="hero">
      <FilterHero
        @selectFilter="handleSelectFilter"
        :selectedFilter="selectedFilter || 'all'"
        :imgSrc="$page.d.heroImg"
      />
    </template>

    <div class="article-list-content is-overlapping">
      <ArticleList :selectedFilter="selectedFilter || 'all'" />
    </div>

    <template slot="cta">
      <CTA :heading="$page.d.ctaHeadline" classes="u-margin-top-sm" />
    </template>

  </Layout>
</template>


<style lang="scss">
  .article-list-content.is-overlapping {
    @media (min-width: $bp-md) {
      margin-top: -$hero-overlap - 0.45;
      z-index: 1;
    }
  }
</style>
