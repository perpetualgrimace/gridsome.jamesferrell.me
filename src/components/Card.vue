<script>
  import moment, {fromNow} from "moment";

  export default {
    name: "Card",
    props: {
      title:          { default: "missing `title` prop in Card.vue" },
      slug:           { default: "missing `slug` prop in Card.vue" },
      link:           { default: "#missing-`link`-prop-in-Card.vue" },
      description:    { default: "missing `description` prop in Card.vue" },
      published:      { default: "missing `published` prop in Card.vue" },
      updated:        { default: null },
      selectedFilter: { default: "all" },
      tags:           { default: "webdev" }
    },
    computed: {
      relativeDate() {
        return moment(this.published, "YYYY-MM-DD").fromNow();
      },
      // relativeUpdatedDate() {
      //   if (this.updated) {
      //     return moment(this.updated, "YYYY-MM-DD").fromNow();
      //   }
      //   else return null;
      // },
      splitTags() {
        return this.tags.toLowerCase().split(",");
      },
      isHidden() {
        if (this.selectedFilter !== "all" && !this.splitTags.includes(this.selectedFilter)) {
          return true;
        }
        return false;
      }
    }
  };
</script>


<template>
  <article class="card-container g-col" :class="isHidden ? 'is-hidden' : 'is-visible'">

    <!-- inner container -->
    <div class="card-inner">

      <!-- link -->
      <g-link :to="link" class="card-link" :aria-describedby="slug" />

      <!-- caption -->
      <div class="card-caption">

        <!-- heading -->
        <g-link :to="link" class="card-title heading u-font-md" tabindex="-1" :id="slug">
          {{ title }}
        </g-link>

        <!-- description -->
        <p class="card-description u-font-sm u-margin-top-sm">
          {{ description }}
        </p>

        <p class="card-meta u-font-xs u-uppercase">
            published {{ relativeDate }}
          <!-- <span class="card-meta-updated" v-if="relativeUpdatedDate">, updated {{ relativeUpdatedDate }}
          </span> -->
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

    // hidden state
    &.is-hidden {
      display: none;
    }
  }

  .card-inner {
    @include box-shadow-lg;
    padding: $font-md;
    background-color: $white;
    border-radius: $radius-sm;

    &:hover, &:focus-within {
      transform: scale(1.025);
      @include box-shadow-xl;
    }
  }


  // thumbnail and caption alignment
  .card-thumb,
  .card-caption {
    display: inline-block;
    vertical-align: top;

    @media (min-width: $bp-sm) {
      vertical-align: middle;
    }
  }


  // thumbnail image size
  // .card-thumb {
  //   background: $light-1;

  //   // extend clickable zone
  //   &:after {
  //     @include pseudo;
  //     position: absolute;
  //     width: $gutter;
  //     height: 100%;
  //     top: 0;
  //     left: 100%;
  //     z-index: 1;
  //   }

  //   // hovering image triggers adjacent title
  //   &:hover + .card-caption > .card-title {
  //     color: $brand-light;
  //   }
  // }

  // // image size
  // .card-img {
  //   object-fit: cover;
  //   width: 100%;
  //   height: 100%;
  // }


  // caption positioning
  .card-caption {
    margin-top: 0;
    // pin relative date to bottom right
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    & :nth-last-child(2) {
      margin-bottom: auto;
    }

    & :last-child {
      text-align: right;
      margin-bottom: -0.5em;
    }
  }


  // linked card title
  a.card-title {
    color: $brand-color; // override .heading color
    // stop .card-title from inheriting parent line-height by changing it to a block element ¯\_(ツ)_/¯
    display: block;
    text-decoration: none;
  }


  // adjust line height
  .card-description {
    line-height: 1.25;

    & + p {
      margin-top: 0.625em;
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

  .card-inner.is-focused,
  .card-inner:hover {
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
        flex: 1 1 16rem;
      }

      // needed to make the inner container fill up parent container
      .card-inner {
        height: 100%;
      }
    }
  }
</style>
