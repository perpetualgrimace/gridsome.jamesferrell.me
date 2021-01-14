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

    <h1 class="image-hero-headline u-center-left">
      {{ headline }}
      <span class="hero-subhead u-font-md" v-if="subhead">
        <span class="u-screenreader">: </span>{{ subhead }}
      </span>
    </h1>

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

  // headline
  .image-hero-headline {
    margin-bottom: $gutter / 2;
    z-index: 1;
    grid-column: 2 / 12;

    @media (min-width: $bp-lg) {
      grid-column: 3 / 13
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
