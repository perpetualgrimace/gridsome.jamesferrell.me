<script>
  import site from "../../content/site.json";
  import HamBurger from "./HamBurger.vue";
  import MainLogo from "./MainLogo.vue";

  export default {
    name: 'MainNav',
    components: {
      HamBurger,
      MainLogo
    },
    data () {
      return {
        site
      }
    }
  };
</script>


<template>
  <div class="main-nav-container">
    <nav class="main-nav" role="navigation">
      <!-- skip link -->
      <a class="button-inverted skip-link u-visually-hidden" href="#main">Skip to content</a>

      <!-- nav menu toggle for small screens -->
      <HamBurger />

      <!-- logo + name for small screens -->
      <MainLogo />

      <!-- main nav -->
      <ul id="nav" class="main-nav-list is-collapsed">
        <li class="main-nav-item" v-for="nav in site.mainNav">
          <g-link :to="nav.link" class="main-nav-link" active-class="is-active" exact-active-class="is-active">
            {{ nav.title }}
          </g-link>
        </li>
      </ul>
    </nav>
  </div>
</template>


<style lang="scss">
  // NOTE: fixed nav media query:
  // @media (min-width: $l) and (min-height: $s) {}

  ////////////////////////////////////////////
  // container
  ////////////////////////////////////////////

  // default positioning and theming
  .main-nav-container {
    top: 0;
    z-index: 11;
    margin-bottom: 0;
    background-color: $brand-black;

    // background color
    @media (min-width: $s) {
      background-color: $white;
    }

    // fixed nav on bigger screens
    @media (min-width: $l) and (min-height: $s) {
      @include box-shadow($shadow);
      position: fixed;
    }
  }


  ////////////////////////////////////////////
  // main nav element
  ////////////////////////////////////////////

  // positioning
  .main-nav {
    height: $nav-height;

    // layout adjustments on bigger screens
    @media (min-width: $m) {
      max-width: $max-main-width;
    }

    // offset nav-link padding on 3 column layout
    @media (min-width: $l) {
      padding-left: 0.5rem;
    }
  }

  // base style for nav elements
  .main-nav * {
    @include body-semibold-font;
    @include font-smoothing;
    font-size: $epsilon;
    text-transform: uppercase;
    text-decoration: none;
    color: $gray;
  }


  ////////////////////////////////////////////
  // main nav list
  ////////////////////////////////////////////

  // small screens
  @media (max-width: $s - 0.001) {
    .main-nav-list {
      @include dropdown-hidden;
      @include box-shadow-lg;
      max-width: $sidebar-width;
      right: $gutter;
      border-radius: 0 0 $radius-lg $radius-lg;
    }
  }


  // medium screens
  @media (min-width: $s) and (max-width: $l - 0.001) {
    .main-nav-list {
      // position next to nav-logo
      position: absolute;
      top: 0;
      left: 11.75rem;
    }
  }


  // expanded menu state via js
  .main-nav-list.is-expanded {
    @include dropdown-visible;
    @include nav-toggle-max-width;

    // position expanded list directly below menu toggle button
    @media (max-width: $s - 0.001) {
      margin-top: -0.78rem; // fudged
    }
  }


  ////////////////////////////////////////////
  // main nav items
  ////////////////////////////////////////////

  // nav items
  .main-nav-item {
    width: 100%;
    height: auto;
    float: left;
    background-color: $white;

    @media (max-width: $s - 0.001) {
      & + & {
        border-top: 1px solid $light-1;
      }
      &:last-of-type {
        border-radius: 0 0 $radius-lg $radius-lg;
        overflow: hidden;
      }
    }

    // large screen style
    @media (min-width: $s) {
      width: auto;
      display: block;
    }
  }


  ////////////////////////////////////////////
  // main nav links
  ////////////////////////////////////////////

  // nav links
  .main-nav-link {
    display: block;
    line-height: 40px;
    font-size: 18px;
    z-index: 1;
    overflow: hidden;
    padding-left: rem(15);
    padding-right: rem(15);

    // extra padding where screen real estate allows
    @media (min-width: $s) {
      padding: 0 rem(9);
      line-height: $nav-height; // vertically center
      font-size: $epsilon;
    }

    // active page
    &.is-active-pg {
      color: $dark-2;
    }
  }


  ////////////////////////////////////////////
  // main nav link interactions
  ////////////////////////////////////////////

  .main-nav-link {
    // simplified hover effect via background-color on smaller screens
    &:hover, &:active, &:focus {
      background-color: $brand-color;
      color: $white;
    }
    // fancy hover via pseudo element on bigger screens
    @media (min-width: $l) {
      @include fancy-nav-hover;
    }
  }


  ////////////////////////////////////////////
  // skip link
  ////////////////////////////////////////////
  
  .skip-link {
    top: $nav-height + 0.13rem; // position under nav bar
    z-index: 8;
    transform: translateX(-100%);

    @media (min-width: $l) {
      left: 1.5rem;
    }

    // focus
    &:focus {
      clip: auto;
      height: auto;
      width: auto;
      transform: none;
    }
  }
</style>
