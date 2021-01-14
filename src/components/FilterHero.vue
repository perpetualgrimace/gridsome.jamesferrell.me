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
    name: "FilterHero",
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
  <header class="filter-hero hero">
    <h1 class="filter-hero-headline u-font-xl">
      {{ uppercaseFirst(selectedFilter) }} {{ contentType }}
    </h1>

    <!-- filters -->
    <p class="filter-headline-label u-font-sm">Filter by:</p>

    <!-- tag list -->
    <div class="filter-tag-list tag-list">
      <Tag
        title="All"
        slug="all"
        :contentType="contentType"
        :selected="selectedFilter === 'all'"
        @updateFilter="selectedFilter = 'all'"
      />
      <Tag
        v-for="filter in filters"
        :title="filter"
        :slug="filter.replace(' ', '-')"
        :selected="selectedFilter === filter"
        :contentType="contentType"
        :key="filter"
        @updateFilter="selectedFilter = $event"
      />
    </div>

  </header>
</template>


<style lang="scss">
  // headline positioning
  .filter-hero-headline {
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
  .filter-hero {
    // account for .tag-item bottom margin on filter-hero only
    // NOTE: applying this globaly messes up the work-item tag placement
    margin-bottom: 0;
  }

  // states for filter-hero component
  .project.is-hidden {
    display: none;
  }
</style>
