<script>
  import site from "~/../content/site.json";
  import {uppercaseFirst} from "~/helpers.js"

  import Tag from "~/components/Tag"

  export default {
    name: "FilterHeader",
    components: {
      Tag
    },
    methods: {
      uppercaseFirst
    },
    props: {
      contentType: { default: "articles" },
      filter: { default: "all" },
      img: { default: "/images/icons/jf-icon.png" }
    },
    data () {
      return {
        site
      }
    }
  };
</script>


<template>
  <header class="filter-header header">
    <h1 class="filter-header-headline gamma">{{ uppercaseFirst(filter) }} {{ contentType }}</h1>

    <!-- filters -->
    <p class="filter-headline-label epsilon">Filter by:</p>

    <!-- tag list -->
    <ul class="filter-tag-list tag-list u-margin-bottom-sm">
      <li class="filter-tag-item">
        <Tag slug="all" title="All" :selected="filter === 'all'" />
      </li>
    </ul>
  </header>
</template>


<style lang="scss">
  // margin fix
  .filter-header {
    // account for .tag-item bottom margin on filter-header only
    // NOTE: applying this globaly messes up the work-item tag placement
    margin-bottom: 0;
  }

  // states for filter-header component
  [data-type-item].is-hidden {
    display: none;
  }

  // add highlight effect
  [data-type].is-highlighted {
    animation: highlight 1s ease-out;
  }

  // hightlight effect
  @keyframes highlight {
    from {
      box-shadow: 0 0 2em rgba($white, 0.25);
      background-color: darken($black, 15);
    }
  }
</style>
