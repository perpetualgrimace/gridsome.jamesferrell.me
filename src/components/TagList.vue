<script>
  import Tag from "~/components/Tag.vue";

  export default {
    name: "TagList",
    components: {
      Tag
    },
    props: {
      tags: {
        type: Array,
        default: ["missing-`tags`-prop-in-TagList.vue"]
      },
      selectedFilter: { default: "all", type: String }
    }
  };
</script>


<template>
  <ul class="tag-list">
    <Tag v-for="tag in tags" :title="tag" :key="tag" :selected="selectedFilter === tag" />
  </ul>
</template>


<style lang="scss">
</style>
