<static-query>
  query Colophon {
    d: colophon(id: "1") {
      content
    }
  }
</static-query>

<script>
  import site from "../../content/site.json";

  export default {
    name: "Colophon",
    props: {
      headline: { default: site.title },
      classes:  { default: null },
      img:      { default: "/images/jamesatar.jpg" },
      img2x:    { default: "/images/jamesatar@2x.jpg" }
    },
    data () {
      return {
        site
      }
    }
  };
</script>


<template>
  <div class="colophon brand-theme" :class="classes">
    <div class="colophon-inner">

      <!-- my face -->
      <div class="colophon-avatar">
        <div class="colophon-avatar-inner">
          <img
            class="colophon-avatar-img"
            :src="img"
            :srcset="`${img} 1x, ${img2x} 2x`"
            alt="😬"
          />
        </div>
      </div>

      <!-- name & bio -->
      <div class="colophon-caption">
        <!-- hidden h1 (home page) -->
        <h1 class="u-visually-hidden" v-if="headline !== site.title">
          {{ headline }}
        </h1>
        <!-- name -->
        <span class="colophon-caption-name subhead" v-else>
          {{ headline }}
        </span>

        <!-- bio -->
        <div
          class="colophon-caption-bio"
          :class="headline === site.title && 'epsilon'"
          v-html="$static.d.content"
        />
      </div>
    </div>
  </div>
</template>


<style lang="scss">

  // home hero
  .main > .colophon:first-child {
    @include fullwidth;

    @media (max-width: $m - 0.001) {
      padding: 1rem;
    }

    @media (min-width: $l) {
      min-height: 10rem;

      .colophon-inner {
        padding: 2rem 9.5rem;
      }
    }

    // break the avatar out of the grid where there's space
    .colophon-inner {
      @media (min-width: $l) and (min-height: 43em) {
        margin-left: -5rem;
        z-index: 2;
      }
    }

    @media (min-width: $xl) {
      & ~ .secondary-content {
        top: 11.5rem;
      }
    }
  }

  // add padding to inner container
  .colophon-inner {
    padding: $gutter;

    // more padding
    @media (min-width: $m) {
      padding: rem(30) rem(40);
    }
  }

  .colophon-caption-bio > p {
    @include sidebar-paragraph-spacing;
  }


  ////////////////////////////////
  // layout
  ////////////////////////////////

  // display avatar and caption inline and vertically center
  .colophon-avatar,
  .colophon-caption {
    @media (min-width: $xs) {
      display: inline-block;
      vertical-align: middle;
    }
  }

  // avatar sizing
  .colophon-avatar {
    width: calc(#{rem(100)});

    @media (max-width: $xs - 0.001) {
      margin: -0.5em auto 1.5em auto;
      width: calc(#{rem(200)});
      z-index: 12; // in front of main-nav
    }

    // bigger avatar on bigger screens
    @media (min-width: $l) {
      width: calc(#{rem(160)});
    }
  }

  .colophon-avatar-inner {
    animation: popIn $timing-longest 0.45s; // page transition duration + delay
    @media (min-width: $xs) {
      padding-right: 1em;
    }
    @media (min-width: $l) {
      padding-right: 2em;
    }
  }

  .colophon-avatar-img {
    border-radius: 50%;
    overflow: hidden;
    width: 100%;
    height: 100%;
    // initial placeholder state
    font-size: rem(58);

    @media (min-width: $l) {
      font-size: rem(80);
      transform: scale(1.125);
    }
  }

  // caption sizing
  .colophon-caption {
    @media (min-width: $xs) {
      width: calc(99.9% - #{rem(100)});
    }

    // account for bigger avatar on bigger screens
    @media (min-width: $m) {
      width: calc(99.9% - #{rem(160)});;
    }
  }

  // JAMES FERRELL positioning
  .colophon-caption-name {
    display: inline-block; // needed to make span use margin
    margin-bottom: 0.25em;
  }


  ////////////////////////////////////
  // contextual adjustments
  ////////////////////////////////////

  // let it breath
  * + .colophon {
    margin-top: 2rem;
  }
</style>
