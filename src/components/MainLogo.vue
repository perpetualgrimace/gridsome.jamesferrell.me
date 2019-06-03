<script>
  import site from "../../content/site.json";

  export default {
    name: "MainLogo",
    props: {
      classes: { default: "u-hide-above-l" },
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
  <div :class="['main-logo', classes]">
    <g-link to="/" class="main-logo-link" exact-active-class="is-active">

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
  </div>
</template>


<style lang="scss">
  ////////////////////////////////////////////
  // nav logo for small screens
  // (site-intro used for 2+3 column layouts)
  ////////////////////////////////////////////

  // nav-logo positioning
  .main-logo {

    // main style
    @media (max-width: $l - 0.001) {
      // contain background
      width: 11.5rem;
      // offset padding; needed so that the logo background is
      // make sure toggled nav-menu is above nav-logo
      z-index: 0;
    }
  }

  .main-logo-link {
    line-height: $nav-height;
    padding-left: 2rem; /* NOTE: might need to change */
    display: block;
  }

  .main-logo-text {
    color: $white;
  }

  // on tiny screens, only show JF icon
  @media (max-width: 18em - 0.001) {
    .main-logo-text {
      opacity: 0 !important;
    }
  }

  .main-logo-icon {
    @include brand-color-depth;
    // alignment
    display: inline-block;
    vertical-align: middle;
    top: -1px; // fudge the icon up
    // set icon and margin in pixels; always be sharp
    width: $logo-icon-size;
    height: $logo-icon-size;
    margin-right: 6px;
    // aesthetic
    border-radius: $radius;
    overflow: hidden; // needed for JF to X transition

    @media (min-width: $l) {
      top: -2px;
    }
  }

  // alt text treatment
  .main-logo-icon-img {
    @include body-semibold-font;
    color: $white;
    // all fudged
    font-size: 26px;
    line-height: 1.1;
    letter-spacing: -2px;

    // account for the broken image icon in newish chrome (fudged)
    @supports (-webkit-appearance:none) {
      &:not([src]) {
        top: -16px;
      }
    }
  }
</style>
