<script>
  export default {
    name: "ImageHeader",
    props: {
      headline: {default: "missing `headline` prop in ImageHeader.vue"},
      subhead: {default: null},
      imgSrc: {default: null},
    }
  }
</script>


<template>
  <header class="image-header header dark-theme" role="banner">

    <h1 class="image-header-headline">
      {{ headline }}
      <span class="header-subhead delta" v-if="subhead">
        <span class="u-screenreader">: </span>{{ subhead }}
      </span>
    </h1>

    <!-- <g-image v-if="$page.d.imgSrc" :src="$page.d.imgSrc" /> -->

  </header>
</template>


<style lang="scss">
  ////////////////////////////////
  // global header styles
  ////////////////////////////////

  // subhead (span nested within .header-headline)
  .header-subhead {
    display: block; // make the span stackable
    margin-top: 0.25em; // space it out from the title
  }

  // hero image container
  .hero {
    @include absolute-expand;
    background-size: cover;
    background-position: center;
  }


  ////////////////////////////////
  // image header
  ////////////////////////////////

  .image-header {
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
    @media (min-width: $xxxl) {
      @include fullwidth;
    }
  }

  // headline
  .image-header-headline {
    display: inline-block;
    z-index: 1;
    top: -0.25rem; // fudge into x-height vertical alignment

    // adjust text alignment on bigger screens
    @media (min-width: $xxxl) {
      width: $max-main-width - 4rem;
      margin-left: auto;
      margin-right: auto;
    }
  }
</style>
