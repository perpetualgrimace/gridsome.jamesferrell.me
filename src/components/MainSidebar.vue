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
  <div class="main-sidebar">
    <div class="tertiary brand-black-theme">
      <div class="tertiary-inner">

        <ul class="tertiary-social-list">
          <SocialLink v-for="social in site.socialAccounts" :social="social" :key="social" />
        </ul>

        <footer class="tertiary-copyright tertiary-text epsilon" role="contentinfo" v-html="$static.d.content" />
      </div>
    </div>
  </div>
</template>


<style lang="scss">

  .main-sidebar {
    z-index: 1; // in front of hero

    & footer a {
      font-weight: inherit;
    }
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
    max-width: $max-container-width / 2; // keep line-length reasonable
    padding: $gutter;

    @media (min-width: $l) {
      max-width: $sidebar-width;
      margin: 0 auto;
      padding: rem(40);
      width: 100%;
    }
    @media (min-width: $l) and (min-height: $s) {
      position: fixed;
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
