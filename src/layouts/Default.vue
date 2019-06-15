<static-query>
  query {
    metaData {
      siteName
    }
  }
</static-query>


<script>
  import { Fragment } from "vue-fragment";
  import MainNav from "~/components/MainNav";
  import MainSidebar from "~/components/MainSidebar";
  import Footer from "~/components/Footer";

  export default {
    components: {
      Fragment, MainNav, MainSidebar, Footer
    },
    props: {
      nav: { default: true, type: Boolean }
    }
  }
</script>


<template>
  <Fragment>

    <MainNav />

    <transition name="transition-fade" appear>
      <main class="main u-padding-top-off" id="main">
        <div class="section primary-content">
          <slot />
        </div>
        <div class="section secondary-content" v-if="$slots.sidebar">
          <slot name="sidebar" />
        </div>
      </main>
    </transition>

    <MainSidebar />

    <Footer />

  </Fragment>
</template>


<style lang="scss">

    .transition-fade-enter {
      opacity: 0;
      transform: translateY(10px);

      &-active {
        transition:
          opacity 0.25s ease-out,
          transform 0.25s ease-out;
      }
    }

    // sidebar

    // set secondary heading font size
    .secondary > h2 {
      font-size: $delta;
    }

    // space out secondary headings
    .secondary > * + h2 {
      margin-top: 1.75em;
    }

    // style secondary text content in stacked layout
    // NOTE: to be used on texty pages with texty secondary content
    .secondary-content-scaling {
      @media (max-width: $xl - 0.001) {
        @include secondary-content-as-primary;
      }
    }

    // set secondary list item line-height and spacing
    // used in blog-article-secondary meta list
    .secondary-item {
      line-height: 1.25;

      & + & {
        margin-top: 1.25em;
      }
    }

    // give the label some room to breath
    .secondary-label,
    .share-icon-twitter-svg {
      margin-right: 0.25em;
    }

    // align share icon and text
    .secondary-link > * {
      display: inline-block;
      vertical-align: middle;
    }


    // flexbox enhancement
    @supports (flex-wrap: wrap) {
      // small screens only
      @media (max-width: $xl - 0.001) {

        // space out the items in a flexy way
        .secondary-meta-list {
          display: flex;
          align-items: flex-start;
          justify-content: space-around;
          flex-wrap: wrap;
          max-width: 46rem;

          // make the items not bunch up against each other
          > .secondary-item {
            padding-left: $gutter;
            padding-right: $gutter;
            text-align: center;
          }

          // adjust top margin of the first item to match the others;
          // accounts for added height from adjacent .tag
          > .secondary-item:first-of-type {
            margin-top: 1em;
          }
        }
      }
    }

    // twitter link
    .secondary-link[href*='twitter'] {
      // interactions
      &:hover svg,
      &:focus svg {
        transform: scale(1.25) rotateZ(-6deg);

        // change fill to twitter color
        path {
          fill: $twitter-color;
        }
      }
    }

    // targets opposite of _layout.scss media query (contact page exceptions);
    // where secondary-content is positioned below contact-form
    @media (min-width: 24em) and (max-width: 48em - 0.001),
    /*OR*/ (min-width: $l) and (max-width: 70em - 0.001) {

      // style secondary content in stacked layout
      .contact-secondary-content {
        @include secondary-content-as-primary;
      }

      // display secondary content inline
      .secondary-social-list {
        > li {
          // background: blue; // debug
          display: inline-block;

          // space items out
          &:not(:last-of-type) {
            margin-right: $gutter * 2;
          }
        }
      }
    }


    // minor spacing tweak for blog-list as secondary content (on home page)
    .secondary-content-blog-list {
      @media (max-width: $xl - 0.001) {
        margin-bottom: -0.5rem;
      }
    }
</style>
