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

      <img class="main-logo-img"
        src="/images/icons/jf-icon.png"
        :srcset="`${img} 1x, /images/icons/jf-icon@2x.png 2x`"
        sizes="100vw"
        alt=" JF"
      />

      <author class="main-logo-text subhead">
        {{ site.title }}
      </author>
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
    // default padding
    padding-top: 0.75rem;

    // padding adjustment on medium viewports
    @media (min-width: $s) and (max-width: $l - 0.001) {
      // add padding to logo
      padding-top: 0.85rem;
    }

    // main style
    @media (max-width: $l - 0.001) {
      // contain background
      width: 11.5rem;
      padding-left: 2rem;
      // offset padding; needed so that the logo background is
      // flush with the left edge of the screen
      left: -2rem;
      // make sure toggled nav-menu is above nav-logo
      z-index: 0;
    }
  }

  .main-logo-img,
  .main-logo-text {
    display: inline-block;
    vertical-align: middle;
  }

  // on tiny screens, only show JF icon
  @media (max-width: 18em - 0.001) {
    .main-logo-text {
      opacity: 0 !important;
    }
  }
</style>
