<script>
  export default {
    name: "Tag",
    props: {
      title:    { default: "missing `title` prop in Tag.vue" },
      slug:     { default: null },
      selected: { default: false }
    }
  };
</script>


<template>
  <li class="tag epsilon" :class="selected && 'is-selected'">
    <a
      class="tag-link"
      :href="`#${slug}`"
      v-if="slug"
      @click="$emit('updateFilter', title)"
    >
      {{ title }}
      <span class="u-visually-hidden" v-if="selected"> (currently selected)</span>
    </a>
    <span class="tag-span" v-else>
      {{ title }}
    </span>
  </li>
</template>


<style lang="scss">
  .tag {
    display: inline-block;
    margin-bottom: 0.6em;

    // space out adjacent tags
    &:not(:last-of-type) {
      margin-right: $gutter / 2;
    }

    & > * {
      // typography
      @include body-semibold-font;
      @include font-smoothing;
      text-transform: uppercase;
      // sizing
      padding: 0.2rem 0.5rem 0.2rem 0.5rem;
      // theming
      border-radius: $radius;
      color: $white;
    }

    // links
    .tag-link {
      background-color: $dark-1;
      text-decoration: none;

      // interactions
      &:hover, &:focus {
        color: $white;
        background-color: $brand-light;
      }
    }

    // non-links
    .tag-span {
      display: block;
      background-color: $black;
    }

    // selected state
    &.is-selected {
      pointer-events: none;

      .tag-link {
        background-color: $black;
      }

      .tag-span {
        animation: highlight $timing;
      }
    }
  }
</style>
