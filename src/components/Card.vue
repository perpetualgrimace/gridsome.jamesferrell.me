<script>
  import moment, {fromNow} from "moment";

  export default {
    name: "Card",
    props: {
      visible:     { default: true },
      title:       { default: "missing `title` prop in Card.vue" },
      slug:        { default: "missing `slug` prop in Card.vue" },
      link:        { default: "#missing-`link`-prop-in-Card.vue" },
      description: { default: "missing `description` prop in Card.vue" },
      published:   { default: "missing `published` prop in Card.vue" }
    },
    computed: {
      relativeDate() {
        return moment(this.published).fromNow();
      }
    }
  };
</script>


<template>
  <article class="card-container g-col">

    <!-- inner container -->
    <div class="card-inner">

      <!-- link -->
      <g-link :to="link" class="card-link" :aria-describedby="slug" />

      <!-- caption -->
      <div class="card-caption">

        <!-- heading -->
        <g-link :to="link" class="card-title heading delta" tabindex="-1" :id="slug">
          {{ title }}
        </g-link>

        <!-- description -->
        <p class="card-description epsilon u-margin-top-sm">
          {{ description }}
        </p>

        <p class="card-meta milli u-uppercase u-margin-top-sm">
          posted {{ relativeDate }}
        </p>
      </div>


      <!-- <a href="<?= $item->url() ?>" class="<?= $contentType?>-card-thumb card-thumb" tabindex="-1">
        <img class="<?= $contentType?>-card-img card-img" src="<?= $thumbImg ?>" alt="" draggable="false">
      </a> -->

    </div>

  </article>
</template>


<style lang="scss">
  ////////////////////////////////
  // standard card
  ////////////////////////////////

  .card-container {
    width: 100%;
  }

  .card-inner {
    @include box-shadow;
    padding: $delta;
    background: #fff;
  }


  // thumbnail and caption alignment
  .card-thumb,
  .card-caption {
    display: inline-block;
    vertical-align: top;

    @media (min-width: $s) {
      vertical-align: middle;
    }
  }


  // thumbnail image size
  .card-thumb {
    background: $light-1;
    width: $thumb-width;
    height: $thumb-height;

    // extend clickable zone
    &:after {
      @include pseudo;
      position: absolute;
      width: $gutter;
      height: 100%;
      top: 0;
      left: 100%;
      z-index: 1;
    }

    // hovering image triggers adjacent title
    &:hover + .card-caption > .card-title {
      color: $brand-light;
    }
  }

  // image size
  .card-img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }


  // caption positioning
  .card-caption {
    margin-top: 0;
    // padding-left: $gutter;
    width: 100%;
  }


  // linked card title
  a.card-title {
    color: $brand-color; // override .heading color
    // stop .card-title from inheriting parent line-height by changing it to a block element ¯\_(ツ)_/¯
    display: block;
  }


  // adjust line height
  .card-description {
    line-height: 1.25;
  }


  // small screen treatment
  @media (max-width: $s - 0.001) {
    .card-meta {
      display: none;
    }
  }
  // three column treatment
  @media (min-width: $xl) {
    .secondary-content .card-meta {
      display: none;
    }
  }


  ////////////////////////////////////
  // link & interactions
  ////////////////////////////////////

  .card-link {
    @include absolute-expand;
    z-index: 3;
    overflow: hidden;

    // adjust title color on :hover / :focus
    &:hover, &:focus {
      & + .card-caption .card-title {
        color: $brand-light;
      }
    }
    &:active + .card-caption .card-title {
      color: $brand-dark;
    }
  }

  .card-inner.is-focused {
    @include box-shadow-xl;
  }

  ////////////////////////////////
  // Flexbox layout enhancement
  ////////////////////////////////

  // flexbox browsers only
  @supports (display: flex) {
    // let them flex
    .card-list {
      display: flex;
      flex-wrap: wrap;

      // set ideal width, let cards grow or shrink as necessary
      > .card-container {
        flex: 1 1 20rem;
      }

      // needed to make the inner container fill up parent container
      .card-inner {
        height: 100%;
      }
    }
  }
</style>
