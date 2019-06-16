<script>
  export default {
    name: "Tag",
    props: {
      title: { default: "missing `title` prop in Tag.vue" },
      slug: { default: null },
      selected: { default: false }
    }
  };
</script>


<template>
  <a
    class="tag epsilon"
    :class="selected && 'is-selected'"
    :href="`#${slug}`"
    v-if="slug"
  >
    {{ title }}
    <span class="u-visually-hidden" v-if="selected"> (currently selected)</span>
  </a>
  <span class="tag epsilon" v-else>
    {{ title }}
  </span>
</template>


<style lang="scss">
  .tag {
    // typography
    @include body-semibold-font;
    @include font-smoothing;
    text-transform: uppercase;
    // sizing & positoning
    display: inline-block;
    padding: 0.2rem 0.5rem 0.2rem 0.5rem;
    // theming
    background-color: $black;
    border-radius: $radius;
    color: $white;

    // links
    &[href] {
      background-color: $dark-1;

      // interactions
      &:hover, &:focus {
        color: $white;
        background-color: $brand-light;
      }
    }

    // selected state
    &.is-selected {
      background-color: $black;
      pointer-events: none;
    }
  }
</style>
