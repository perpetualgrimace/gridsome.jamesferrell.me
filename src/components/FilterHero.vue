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
  import ImageHero from "~/components/ImageHero";

  export default {
    name: "FilterHero",
    components: {
      Tag, ImageHero
    },
    props: {
      contentType:    { default: "articles" },
      selectedFilter: { default: "all" }
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
  <ImageHero :headline="`${ uppercaseFirst(selectedFilter) } ${ contentType }`">
    <template slot="filters">
      <!-- filters -->
      <p class="u-visually-hidden">Filter by:</p>

      <!-- tag list -->
      <ul class="filter-tag-list tag-list u-center-left">
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
      </ul>      
    </template>  
  </ImageHero>
</template>


<style lang="scss">
  .filter-tag-list .tag:not(:last-child) {
    margin-right: 0.5em;
  }
  .tag:hover .tag-link {
    color: $white;
    background-color: $brand-light;
  }
  .filter-tag-list .tag.is-selected .tag-link {
    color: $white;
    background-color: $brand-color;
  }
</style>
