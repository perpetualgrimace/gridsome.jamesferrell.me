<script>
  export default {
    name: "HamBurger",
    props: {
      onClick: { type: Function },
      menuOpen: { default: false }
    }
  }
</script>


<template>
  <a
    class="hamburger u-hide-above-s"
    :class="menuOpen ? 'is-active' : 'is-inactive'"
    @click="onClick($event)"
    data-nav="toggle"
    href="#footer-nav"
  >
    <span class="hamburger-text">menu</span>
    <div class="hamburger-icon" :class="menuOpen ? 'is-active' : 'is-inactive'">
      <span class="hamburger-icon-bun hamburger-icon-bun-top" />
      <span class="hamburger-icon-bun hamburger-icon-bun-patty" />
      <span class="hamburger-icon-bun hamburger-icon-bun-bottom" />
    </div>
  </a>
</template>


<style lang="scss">
  // nav toggle button container
  .hamburger {
    @include box-shadow(rgba($black, 0.25));
    // positioning
    position: absolute;
    top: 0.675rem;
    right: $gutter;
    padding: 0 10px 0 9px; // somewhat fudged
    line-height: 30px;
    height: 30px;
    max-width: 10rem;
    z-index: 1; // position above logo on tiny viewports
    // anchor menu text to right side when toggled
    text-align: right;
    // theming
    background-color: $white;
    border-radius: $radius-lg;
    transition: max-width $timing;

    // menu toggle text
    .hamburger-text {
      font-size: 18px; // set in pixels like the icon and links
      color: $brand-color;
    }

    // click me
    &.is-inactive:hover .hamburger-icon,
    &.is-inactive:focus .hamburger-icon {
      transform: scale(1.125);
    }

    // nav-toggle active state
    &.is-active {
      @include nav-toggle-max-width;
      width: calc(100% - 2rem);
      max-width: $sidebar-width;
      background-color: $brand-color;
      border-radius: $radius-lg $radius-lg 0 0;
      box-shadow: none;

      &:focus {
        outline-offset: 2px;
      }

      .hamburger-text {
        color: $white;
      }
    }
  }

  // hamburger icon container
  .hamburger-icon {
    display: inline-block;
    margin-left: 0.4rem;
    transition: transform $timing-fast;
  }

  // hamburger initial state
  .hamburger-icon-bun {
    display: block;
    width: 16px;
    height: 2px;
    border-radius: 1px;
    background-color: $brand-color;
    transition: transform $timing;

    // stacked buns
    & + & {
      margin-top: 3px;
    }
  }

  // hamburger active state
  .hamburger-icon.is-active {
    transform: translateX(5px);

    .hamburger-icon-bun {
      background-color: $white;
    }

    .hamburger-icon-bun-top {
      transform: rotateZ(45deg) translateY(7px);
    }
    .hamburger-icon-bun-patty {
      opacity: 0;
    }
    .hamburger-icon-bun-bottom {
      transform: rotateZ(-45deg) translateY(-7px);
    }
  }
</style>
