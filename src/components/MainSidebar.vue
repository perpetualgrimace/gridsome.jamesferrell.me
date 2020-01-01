<static-query>
  query MainSidebar {
    d: mainSidebar(id: "1") {
      content
    }
  }
</static-query>

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
  <div class="main-sidebar brand-black-theme">
    <div class="main-sidebar-inner">

      <ul class="main-sidebar-social-list">
        <SocialLink v-for="social in site.socialAccounts" :social="social" :key="social.name" />
      </ul>

      <footer class="main-sidebar-copyright epsilon" role="contentinfo" v-html="$static.d.content" />
    </div>
  </div>
</template>

<style lang="scss">
  .main-sidebar {
    & footer a {
      font-weight: inherit;
    }
  }

  ////////////////////////////////
  // baseline adjustments
  ////////////////////////////////
  .main-sidebar-copyright > p {
    @include sidebar-paragraph-spacing;
  }


  ////////////////////////////////
  // container positioning
  ////////////////////////////////
  .main-sidebar {
    @media (max-width: $l - 0.001) {
      width: 100%;
      order: 1; // push below footer nav on small screens
      text-align: center;

      & .main-sidebar-inner {
        width: 100%;
        column-width: 20rem;
        column-gap: $gutter * 4;
        column-rule: 1px solid $brand-dark;

        & .main-sidebar-social-list {
          border-bottom: none;
          padding-top: 1rem;
        }
        & .social-item:not(:last-child) {
          margin-right: 1em;
        }

        & .main-sidebar-copyright {
          padding-top: 0;
        }
      }
    }
    @media (min-width: $l) {
      @include secondary-content-width;
      padding-top: $nav-height;
    }
  }

  .main-sidebar-inner {
    padding: $gutter;
    z-index: 2; // in front of footer on small screens

    @media (min-width: $l) {
      max-width: $sidebar-width;
      margin: 0 auto;
      padding: rem(40);
      width: 100%;
      z-index: 1; // clickable on big screens
    }
    @include bp-fixed-nav {
      display: flex;
      flex-direction: column;
      min-height: calc(100% - #{$nav-height});
      justify-content: space-between;
    }
  }

  // add padding, 1px border between social links and copyright
  .main-sidebar-social-list {
    padding-bottom: 1rem;
    border-bottom: 1px solid $brand-dark;

    @media (min-width: $l) {
      padding-bottom: 2rem;
    }

    @media (max-width: $m) {
      &[class][class] { padding-top: 0; }
    }
  }

  .main-sidebar-copyright {
    padding-top: 1rem;

    @media (min-width: $l) {
      padding-top: 2rem;
    }
  }


  ////////////////////////////////
  // social list items
  ////////////////////////////////
  .main-sidebar-social-list > .social-item {
    display: inline-block;
    width: 100%;
  }

  @media (max-width: $l - 0.001) {
    // flex + space-between is magic
    .main-sidebar-social-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      // unset width so flexbox can flex
      > .social-item {
        width: auto;
      }
    }
  }
</style>
