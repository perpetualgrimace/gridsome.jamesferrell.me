<script>
  export default {
    name: "Tag",
    props: {
      title: { default: "missing `title` prop in Tag.vue" }
    }
  };
</script>


<template>
  <span class="tag epsilon">
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
  }

  // tag-links
  // TODO: move to TagLink component
  .tag-link {
    background-color: $dark-1;

    // interactions
    &:hover, &:focus {
      color: $white;
      background-color: $brand-light;
    }

    // selected state
    &.is-selected {
      background-color: $black;
      pointer-events: none;
    }
  }
</style>
