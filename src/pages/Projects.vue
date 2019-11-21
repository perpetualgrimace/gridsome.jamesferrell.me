<page-query>
  query Projects {
    d: projects(path: "/projects") {
      title
      headline
      ctaHeadline
      content
    }
  }
</page-query>


<script>
  import site from "../../content/site.json";
  import {formatHashAsTag} from "~/helpers.js";
  import ProjectList from "~/components/ProjectList";
  import FilterHeader from "~/components/FilterHeader";
  import CTA from "~/components/CTA";

  export default {
    components: {
      ProjectList, FilterHeader, CTA
    },
    metaInfo: {
      title: "Projects"
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
  <Layout :singleColumn="true" wrapperClass="disable-anchor-offset">

    <FilterHeader
      contentType="projects"
      @selectFilter="handleSelectFilter"
      :selectedFilter="selectedFilter || 'all'"
    />

    <ProjectList :selectedFilter="selectedFilter || 'all'" />

    <template slot="cta">
      <CTA :heading="$page.d.ctaHeadline" />
    </template>

  </Layout>
</template>


<style lang="scss">
</style>
