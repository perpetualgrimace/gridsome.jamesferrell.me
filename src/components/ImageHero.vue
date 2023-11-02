<script>
export default {
  name: "ImageHero",
  props: {
    headline: { default: "missing `headline` prop in ImageHero.vue" },
    imgSrc: { default: null },
    defaultImg: { default: "/images/workspace-hero.png" },
    overlapped: { default: false },
  },
};
</script>

<template>
  <header
    class="image-hero hero dark-theme"
    :class="overlapped ? 'is-overlapped' : ''"
    role="banner"
  >
    <div class="image-hero-inner">
      <h1 class="image-hero-headline u-center-left">
        {{ headline }}
      </h1>

      <div class="image-hero-meta" v-if="$slots.meta">
        <slot name="meta" />
      </div>

      <div class="image-hero-filters" v-if="$slots.filters">
        <slot name="filters" />
      </div>
    </div>

    <g-image
      class="image-hero-img"
      :src="imgSrc || defaultImg"
      draggable="false"
    />
  </header>
</template>

<style lang="scss">
.image-hero {
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
    & .image-hero-inner {
      min-height: 10rem;
      aspect-ratio: 2 / 1;
      margin-top: auto;
    }
  }
}

// text container
.image-hero-inner {
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

  .image-hero-headline {
    margin-top: auto;

    &:last-child {
      margin-bottom: auto;
    }
  }

  .image-hero-filters {
    margin-top: $gutter;
    margin-bottom: auto;
  }

  .image-hero-meta {
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
.image-hero.is-overlapped .image-hero-inner {
  @media (min-width: $bp-md) {
    margin-bottom: $gutter;
    padding-bottom: $hero-overlap / 2;
  }
}

// hero image container
.image-hero-img {
  @include absolute-expand;
  object-fit: cover;
}

.hero-subhead {
  display: block; // make the span stackable
  margin-top: 0.25em; // space it out from the title
}
</style>
