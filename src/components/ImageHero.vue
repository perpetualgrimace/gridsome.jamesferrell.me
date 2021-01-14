<script>
  export default {
    name: "ImageHero",
    props: {
      headline:   {default: "missing `headline` prop in ImageHero.vue"},
      subhead:    {default: null},
      imgSrc:     {default: null},
      defaultImg: {default: "/images/workspace-hero.jpg"}
    }
  }
</script>


<template>
  <header class="image-hero hero dark-theme" role="banner">

    <div class="image-hero-inner">
      <h1 class="image-hero-headline u-center-left">
        {{ headline }}
        <span class="hero-subhead u-font-md" v-if="subhead">
          <span class="u-screenreader">: </span>{{ subhead }}
        </span>
      </h1>

      <div class="image-hero-meta" v-if="$slots.meta">
        <slot name="meta" />
      </div>

      <div class="image-hero-filters" v-if="$slots.filters">
        <slot name="filters" />
      </div>
    </div>

    <g-image class="image-hero-img" :src="imgSrc || defaultImg" draggable="false" />

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
  }

  // text container
  .image-hero-inner {
    margin-bottom: $gutter / 2;
    z-index: 1;
    display: flex;
    flex-direction: column;
    min-height: 100%;
    // layout
    grid-column: 1 / 13;

    @media (min-width: $bp-xs) { grid-column: 2 / 12; }
    @media (min-width: $bp-lg) { grid-column: 3 / 11 }

    .image-hero-headline {
      margin-top: auto;

      &:last-child {
        margin-bottom: auto;
      }
    }

    .image-hero-filters {
      margin-top: 0.5em;
      margin-bottom: auto;
    }

    .image-hero-meta {
      margin-top: auto;

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
