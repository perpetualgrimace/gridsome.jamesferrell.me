<static-query>
  query ($page: Int) {
    articles: allArticle (page: $page) {
      edges {
        node {
          id
          title
          tags: topic
        }
      }
    },
    projects: allProject (page: $page) {
      edges {
        node {
          id
          title
          tags
        }
      }
    }
  }
</static-query>


<script>
  import {flattenArray, uppercaseFirst} from "~/helpers.js";
  import Tag from "~/components/Tag";

  export default {
    name: "FilterHeader",
    components: {
      Tag
    },
    props: {
      contentType:    { default: "articles" },
      selectedFilter: { default: "all" },
      img:            { default: "/images/icons/jf-icon.png" }
    },
    methods: {
      flattenArray, uppercaseFirst
    },
    computed: {
      filters() {
        let filterList = [];
        const edges = this.contentType === "articles"
          ? this.$static.articles.edges
          : this.$static.projects.edges;

        edges.forEach(
          edge => filterList.push(edge.node.tags.toLowerCase().split(","))
        );

        return Array.from(
          new Set(flattenArray(filterList)) // flatten array & purge duplicates
        );
      }
    },
    updated() {
      this.$emit("selectFilter", this.selectedFilter)
    }
  };
</script>


<template>
  <header class="filter-header header">
    <h1 class="filter-header-headline gamma">
      {{ uppercaseFirst(selectedFilter) }} {{ contentType }}
    </h1>

    <!-- filters -->
    <p class="filter-headline-label epsilon">Filter by:</p>

    <!-- tag list -->
    <div class="filter-tag-list tag-list">
      <Tag
        slug="all"
        title="All"
        @updateFilter="selectedFilter = 'all'"
        :selected="selectedFilter === 'all'"
      />
      <Tag
        :slug="filter.replace(' ', '-')"
        :key="filter"
        :title="filter"
        :selected="selectedFilter === filter"
        @updateFilter="selectedFilter = $event"
        v-for="filter in filters"
      />
    </div>

  </header>
</template>


<style lang="scss">

  // space out the filter-header
  .filter-header {
    padding-bottom: 1.5rem;
    padding-right: 0 !important;
    max-width: 100% !important;

    // make filter-header stop before the secondary-content sidebar
    @media (min-width: $xl) {
      padding-right: $sidebar-width;

      // offset sidebar
      & ~ .secondary-content {
        top: 1.9rem;
      }
    }
  }

  // headline positioning
  .filter-header-headline {
    margin-bottom: 0.65rem;
  }

  // tagcloud positioning
  .filter-headline-label,
  .filter-tag-list {
    display: inline-block;
  }

  .filter-tag-list .tag:not(:last-child) {
    margin-right: 0.5em;
  }

  // space out label from tagcloud
  .filter-headline-label {
    margin-right: 0.5em;
  }


  // margin fix
  .filter-header {
    // account for .tag-item bottom margin on filter-header only
    // NOTE: applying this globaly messes up the work-item tag placement
    margin-bottom: 0;
  }

  // states for filter-header component
  .project.is-hidden {
    display: none;
  }
</style>
