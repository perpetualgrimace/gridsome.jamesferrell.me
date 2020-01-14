<static-query>
  query Footer {
    d: footer(id: "1") {
      content
    }
  }
</static-query>

<script>
  import site from "../../content/site.json";
  import SocialLink from "./SocialLink";

  export default {
    name: 'Footer',
    components: {
      SocialLink
    },
    data () {
      return {
        site
      }
    }
  }
</script>


<template>
  <footer class="footer dark-theme">

    <div class="g-container">
      <div class="footer-nav g-columns milli">
        <ul class="footer-nav-list g-col g-4" id="footer-nav">
          <li class="footer-nav-item" v-for="nav in site.mainNav">
            <g-link :to="nav.link" class="footer-nav-link" active-class="is-active" exact-active-class="is-active">
              {{ nav.title }}
            </g-link>
          </li>
        </ul>
        <ul class="footer-social-list g-col g-4">
          <SocialLink v-for="social in site.socialAccounts" :social="social" :key="social.name" />
        </ul>
        <div class="footer-copyright epsilon g-col g-4" role="contentinfo" v-html="$static.d.content" />
      </div>
    </div>
  </footer>
</template>


<style lang="scss">
  .footer {
    @include radial-gloss;
    box-shadow: inset 0 1rem 2rem -1rem $shadow-dark;
    z-index: 1;
  }

  // footer links
  .footer-nav-link {
    @include body-semibold-font;
    @include font-smoothing;
    display: block;
    padding: 0.5rem;
    text-transform: uppercase;
    text-decoration: none;
    font-size: $epsilon;
    color: $gray;

    // active page link
    &.is-active {
      color: $light-1;
    }

    // interactions
    &:hover, &:active, &:focus {
      color: $white;
      text-decoration: underline;
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
    .footer-nav-list {
      text-align: center;
    }
    .footer-nav-item {
      display: inline-block;
    }
  }

  // in between the stacked gray nav, and the centered gray nav
  @media (min-width: $xs) and (max-width: $l - 0.001) {
    .footer[class] {
      background: $brand-black;
      margin-bottom: -2rem;
    }
    .footer-nav {
      margin-top: -#{rem(13)};
      margin-bottom: -#{rem(13)};

      .footer-nav-list {
        display: flex;
        justify-content: space-between;
        // override grid
        &.g-col {
          width: calc(100% + #{$gutter});
          max-width: calc(100% + #{$gutter});
          margin: 0 -#{$gutter / 2};
        }

        & > * {
          flex: 1 0 16.666%;
        }
      }
    }
  }

  @media (min-width: $l) {
    .footer-nav {
      padding-top: rem(13);
      padding-bottom: rem(13);
    }
  }

</style>
