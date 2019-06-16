<script>
  import site from "../../content/site.json";
  import HamBurger from "./HamBurger.vue";
  import MainLogo from "./MainLogo.vue";
  import SocialLink from "./SocialLink.vue";

  export default {
    name: 'MainSidebar',
    components: {
      HamBurger,
      MainLogo,
      SocialLink
    },
    data () {
      return {
        site
      }
    }
  };
</script>


<template>
  <div class="main-sidebar">

    <div class="tertiary brand-black-theme">
      <div class="tertiary-inner">

        <ul class="tertiary-social-list">
          <SocialLink v-for="social in site.socialAccounts" :social="social" :key="social" />
        </ul>

        <footer class="tertiary-copyright tertiary-text epsilon" role="contentinfo">
          {{ site.copyright }}
          <!-- TODO: markdown parsing :/ -->
          <!-- {{ site.colophon }} -->
        </footer>

      </div>
    </div>
  </div>
</template>


<style lang="scss">

  .main-sidebar {
    z-index: 1; // in front of hero
  }

  ////////////////////////////////
  // baseline adjustments
  ////////////////////////////////
  .tertiary-text > p {
    line-height: 1.25;

      & + p {
        margin-top: 0.625em;
      }
    }


  ////////////////////////////////
  // container positioning
  ////////////////////////////////
  .tertiary {
    @media (min-width: $l) {
      @include secondary-content-width;
      padding-top: $nav-height;
    }
  }

  .tertiary-inner {
    @include main-sidebar-positioning;

    @media (min-width: $l) {
      width: 100%;
      max-width: 100%;
    }
  }

  // add padding, 1px border between social links and copyright
  .tertiary-social-list {
    padding-bottom: 1rem;
    border-bottom: 1px solid $brand-dark;

    @media (min-width: $l) {
      padding-bottom: 2rem;
    }
  }

  .tertiary-copyright {
    padding-top: 1rem;

    @media (min-width: $l) {
      padding-top: 2rem;
    }
  }


  ////////////////////////////////
  // social list items
  ////////////////////////////////
  .tertiary-social-list > .social-item {
    display: inline-block;
    width: 100%;

    // half width list items, where that makes sense
    @media (min-width: $xxs) and (max-width: $l - 0.001),
      /*OR*/ (min-width: $l) and (max-height: 43em - 0.001) {
        width: 50%;
      }
    }

  // flexbox enhancement: show all four items in a row
  @supports (justify-content: space-between) {
    @media (min-width: 25em) and (max-width: $xs - 0.001),
    /*OR*/ (min-width: $m) and (max-width: $l - 0.001) {
      // flex + space-between is magic
      .tertiary-social-list {
        display: flex;
        justify-content: space-between;

        // unset width so flexbox can flex
        > .social-item {
          width: auto;
        }
      }
    }
  }
</style>
