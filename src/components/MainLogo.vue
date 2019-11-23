<script>
  import site from "../../content/site.json";

  export default {
    name: "MainLogo",
    props: {
      img: { default: "/images/icons/jf-icon.png" },
      img2x: { default: "/images/icons/jf-icon@2x.png" }
    },
    data () {
      return {
        site
      }
    }
  };
</script>


<template>
  <g-link to="/" class="main-logo" active-class="" exact-active-class="is-active">

    <span class="main-logo-icon">
      <img class="main-logo-icon-img"
        :src="img"
        :srcset="`${img} 1x, ${img2x} 2x`"
        sizes="100vw"
        alt=" JF"
      />
    </span>

    <span class="main-logo-text subhead">
      {{ site.title }}
    </span>
    <span class="u-visually-hidden"> home</span>

  </g-link>
</template>


<style lang="scss">
  // the link
  .main-logo {
    // sizing
    display: block;
    height: $nav-height;
    max-width: 11.5rem;
    padding-left: 2rem;
    line-height: $nav-height;
    // theming
    background: $brand-black;

    // override default
    & .main-logo-text {
      color: $white;
    }


    // sidebar layout
    @media (min-width: $l) {
      // sizing
      width: $sidebar-width;
      max-width: $sidebar-width;
      // pin to top left
      position: absolute;
      left: -$sidebar-width; // offset sidebar
      // theming
      @include box-shadow;

      & .main-logo-text {
        // scale up text
        font-size: $delta;
        // positioning
        display: inline-block; // allow positioning
      }

      // interactions
      &:hover, &:focus {
        background-color: lighten($brand-black, 1);
      }
    }

    // fudge vertical alignment on big screens
    @media (min-width: $xl) {
      & > * {
        transform: translateY(-1px);
      }
    }
  }

  // the icon
  .main-logo-icon {
    @include brand-color-depth;
    // sizing
    width: $logo-icon-size;
    height: $logo-icon-size;
    // positioning
    display: inline-block;
    margin-right: 6px;
    vertical-align: middle;
    top: -1px; // fudge the icon up
    // theming
    border-radius: $radius;

    @media (min-width: $l) {
      top: -0.125rem;
      margin-right: 10px;
    }
  }

  // tweakpoint to hide text
  @media (max-width: 16em - 0.001) {
    .main-logo-text {
      @include visually-hidden;
    }
  }

  // alt text treatment
  .main-logo-icon-img {
    // typography / sizing (fudged)
    @include body-semibold-font;
    font-size: 26px;
    letter-spacing: -2px;
    line-height: 1.1;
    // theming
    color: $white;

    // account for the broken image icon in newish chrome (fudged)
    @supports (-webkit-appearance:none) {
      &:not([src]) {
        top: -16px;
      }
    }
  }
</style>
