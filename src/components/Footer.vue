<script>
  import site from "../../content/site.json";

  export default {
    name: 'Footer',
    data () {
      return {
        site
      }
    },
    computed: {
      footerLinks() {
        // take the mainNav array and merge in the secondaryNav array
        return site.mainNav.concat(site.secondaryNav);
      }
    }
  }
</script>


<template>
  <footer class="footer dark-theme">
    <div class="g-container">

      <div class="footer-nav g-columns milli">
        <ul class="footer-nav-list g-col" id="footer-nav">
          <li class="footer-nav-item" v-for="nav in footerLinks">
            <g-link :to="nav.link" class="footer-nav-link" active-class="is-active" exact-active-class="is-active">
              {{ nav.title }}
            </g-link>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>


<style lang="scss">
  .footer {
    @include radial-gloss;
    box-shadow: inset 0 1rem 2rem -1rem $shadow-dark;
  }

  // footer links
  .footer-nav-link {
    @include body-semibold-font;
    @include font-smoothing;
    display: block;
    padding: 0.5rem;
    text-transform: uppercase;
    font-size: $epsilon;
    color: $gray;

    // active page link
    &.is-active {
      color: $light-1;
    }

    // interactions
    &:hover, &:active, &:focus {
      color: $white;
    }
  }

  // small screens
  @media (max-width: $xs - 0.001) {
    // padding override
    .footer-nav-list.g-col {
      padding-top: 0;
      padding-bottom: 0;
    }
    // display links inline
    .footer-nav-link {
      display: block;
      padding-left: 0;
    }
    // add border in between items
    .footer-nav-item + .footer-nav-item {
      border-top: 1px solid $dark-1;
    }
  }

  // switch to inline list style when the space is available
  @media (min-width: $xs) {
    .footer-nav {
      padding-top: rem(13);
      padding-bottom: rem(13);
    }
    .footer-nav-list {
      text-align: center;
    }
    .footer-nav-item {
      display: inline-block;
    }
  }

</style>