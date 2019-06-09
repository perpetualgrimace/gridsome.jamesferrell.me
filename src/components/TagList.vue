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
      }
    }
  };
</script>


<template>
  <ul class="tag-list">
    <Tag v-for="tag in tags" :title="tag" :key="tag" />
  </ul>
</template>


<style lang="scss">
  // list of tags, each wrapped in an li
  .tag-list > .tag {
    display: inline-block;
    margin-bottom: 0.5em;

    // space out adjacent tags
    &:not(:last-of-type) {
      margin-right: $gutter / 2;
    }
  }
</style>
