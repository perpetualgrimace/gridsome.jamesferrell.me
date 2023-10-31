<script>
export default {
  name: "ProjectHero",
  props: {
    headline: { default: "missing `headline` prop in ProjectHero.vue" },
    subhead: { default: null },
    color: { default: "black" },
    overlapped: { default: true },
  },
};
</script>

<template>
  <header
    class="project-hero hero dark-theme"
    :class="overlapped ? 'is-overlapped' : ''"
    role="banner"
    :style="{ 'background-color': color }"
  >
    <div class="project-hero-inner">
      <h1 class="project-hero-headline u-center-left">
        {{ headline }}
        <span class="hero-subhead u-font-md" v-if="subhead">
          <span class="u-screenreader">: </span>{{ subhead }}
        </span>
      </h1>

      <div class="project-hero-meta" v-if="$slots.meta">
        <slot name="meta" />
      </div>

      <div class="project-hero-filters" v-if="$slots.filters">
        <slot name="filters" />
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.project-hero {
  @include hero-base;
  overflow: hidden;

  // add glossy overlay to pseudo element so it shows up over the hero image
  &:before {
    @include pseudo;
    @include absolute-expand;
    @include radial-gloss;
    z-index: 1;
  }

  // reset min-height & use aspect-ratio where available on tiny screens
  @media (max-width: $bp-xxs - 0.001) {
    &,
    & .project-hero-inner {
      min-height: 10rem;
      aspect-ratio: 2 / 1;
      margin-top: auto;
    }
  }
}

// text container
.project-hero-inner {
  margin-bottom: $gutter / 2;
  z-index: 1;
  display: flex;
  flex-direction: column;
  // layout
  grid-column: 1 / 13;

  @media (min-width: $bp-md) {
    min-height: calc(#{$hero-height} + 12vh); // fudged, can't use 100%
  }

  @media (min-width: $bp-xs) {
    grid-column: 2 / 12;
  }
  @media (min-width: $bp-lg) {
    grid-column: 3 / 11;
  }

  .project-hero-headline {
    margin-top: auto;

    &:last-child {
      margin-bottom: auto;
    }
  }

  .project-hero-filters {
    margin-top: $gutter;
    margin-bottom: auto;
  }

  .project-hero-meta {
    margin-top: auto;
    margin-bottom: -1.125rem; // fudged

    @media (min-width: $bp-xxs) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      & > :first-child {
        margin-right: $gutter;
      }
    }
  }
}

// offset overlapped content so heading is still centered
.project-hero.is-overlapped .project-hero-inner {
  @media (min-width: $bp-md) {
    margin-bottom: $gutter;
    padding-bottom: $hero-overlap / 2;
  }
}

.hero-subhead {
  display: block; // make the span stackable
  margin-top: 0.25em; // space it out from the title
}
</style>
