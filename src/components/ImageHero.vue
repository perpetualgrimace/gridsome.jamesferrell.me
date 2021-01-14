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

    <h1 class="image-hero-headline">
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
    display: flex;
    align-items: center;
    overflow: hidden;
    min-height: 10rem;
    padding: 2rem; // align left edge to content, ensure even spacing

    // add glossy overlay to pseudo element so it shows up over the hero image
    &:before {
      @include pseudo;
      @include absolute-expand;
      @include radial-gloss;
      z-index: 1;
    }

    // expand background on bigger screens
    @media (min-width: $bp-xxxl) {
      @include fullwidth;
      z-index: -1; // but dont let it overlap the MainSidebar tho
    }

    // offset sidebar
    @media (min-width: $bp-xl) {
      & ~ .secondary-content {
        top: 11.96rem;
      }
    }
  }

  // headline
  .image-hero-headline {
    display: inline-block;
    z-index: 1;
    top: -0.25rem; // fudge into x-height vertical alignment
    width: $outer-width - 4rem;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
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
