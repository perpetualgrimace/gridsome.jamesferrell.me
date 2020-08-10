<script>
  export default {
    name: "SecondarySidebar",
    props: {
      content:  { default: null },
      heading:  { default: null },
      text:     { default: null },
      link:     { default: null },
      linkText: { default: null },

      downloadHeading:  { default: null },
      downloadText:     { default: null },
      downloadLink:     { default: null },
      downloadLinkText: { default: null }
    }
  };
</script>


<template>
  <!-- use main markdown content as sidebar -->
  <aside class="content secondary epsilon" v-html="content" v-if="content" />

  <!-- construct sidebar from individual props -->
  <aside class="content secondary epsilon" v-else-if="heading && text">
    <h2>{{ heading }}</h2>
    <p>{{ text }}</p>

    <p class="u-margin-top-sm" v-if="link">
      <a class="link-arrow" :href="link" v-if="link && link.includes('http')">
        {{ linkText || link }}
      </a>
      <g-link class="link-arrow" :to="link" v-else-if="link">
        {{ linkText || link }}
      </g-link>
    </p>

    <!-- download link -->
    <h2 v-if="downloadHeading">
      {{ downloadHeading }}
    </h2>
    <p v-if="downloadText">
      {{ downloadText }}
    </p>
    <p class="u-margin-top-sm" v-if="downloadLink">
      <a class="link-arrow-download" :href="downloadLink" download>
        {{ downloadLinkText || downloadLink }}
      </a>
    </p>
  </aside>
</template>


<style lang="scss">
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
  .secondary-content[class] { // specificy increase needed to override main.css
    @media (min-width: $xl) {
      h2:not(.gamma) {
        font-size: $delta;
      }
    }
  }

  // set secondary list item line-height and spacing
  // used in blog-article-secondary meta list
  .secondary-item {
    @include sidebar-paragraph-spacing;
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
