<script>
  export default {
    name: "Tag",
    props: {
      title:        { default: "missing `title` prop in Tag.vue" },
      contentType:  { default: "articles" },
      slug:         { default: null },
      selected:     { default: false },
      el:           { default: "li" }
    },
    computed: {
      link() {
        return `/${ this.contentType === "articles" ? "blog" : "projects" }#${ this.slug }`
      }
    }
  };
</script>


<template>
  <component :is="el" class="tag u-font-sm" :class="selected && 'is-selected'">
    <a
      class="tag-link"
      :href="link"
      v-if="slug"
      @click="$emit('updateFilter', title)"
    >
      {{ title }}
      <span class="u-visually-hidden" v-if="selected"> (currently selected)</span>
    </a>
    <span class="tag-span" v-else>
      {{ title }}
    </span>
  </component>
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
      border-radius: $radius-md;
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
        animation: highlight $duration-lg;
      }
    }
  }
</style>
