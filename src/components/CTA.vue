<script>
  import site from "../../content/site.json";
  import Button from "~/components/Button";

  export default {
    name: "Colophon",
    components: {
      Button
    },
    props: {
      heading:  { default: site.ctaHeading },
      text:     { default: site.ctaText },
      link:     { default: site.ctaLink },
      linkText: { default: site.ctaLinkText },
      classes:  { default: null }
    },
    data () {
      return {
        site
      }
    }
  };
</script>


<template>
  <article class="cta brand-theme u-left-center u-margin-bottom-sm" :class="classes">
    <h2>{{ heading }}</h2>
    <p>{{ text }}</p>

    <Button :link="link" classes="button-inverted link-arrow epsilon" :text="linkText" />
  </article>
</template>


<style lang="scss">
  .cta {
    // add padding to container
    padding: 1.5rem 2rem 2rem 2rem;
    border-radius: 2px;

    // set heading style to beta
    h2, h3 {
      font-size: $beta;
      z-index: auto; // reset anchor link offset
    }

    // set vertical spacing
    p:first-of-type {
      margin-top: 0.625em;
      margin-bottom: 0.5em;
    }
  }

  ////////////////////////////////////
  // contextual adjustments
  ////////////////////////////////////

  // override margin-reset for p > .link-arrow
  .cta > p:last-of-type > [class*='link-arrow'] {
    margin-top: 0.75rem;
  }

  // adjust margin when a CTA follows a sidebar container
  .secondary-content + .primary-content > .cta {
    margin-top: 0.25rem;

    // three column layout
    @media (min-width: $l) {
      margin-top: 0;
    }
  }
</style>
