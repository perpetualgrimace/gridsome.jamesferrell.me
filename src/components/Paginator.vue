<static-query>
  query Blog ($page: Int) {
    articles: allArticle (page: $page, sortBy: "published") {
      edges {
        node {
          id
          title
          published (format: "MMMM YYYY")
          description
          path
          slug
        }
      }
    }
  }
</static-query>


<script>
  import GridIcon from "~/svg/GridIcon.svg";

  export default {
    name: "Paginator",
    components: {
      GridIcon
    },
    props: {
      currentID: { default: null }
    },
    computed: {
      total() {
        return this.$static.articles.edges.length.toString();
      },
      newestNode() {
        return this.$static.articles.edges.filter(
          page => page.node.id === this.total.toString()
        )[0].node;
      },
      oldestNode() {
        return this.$static.articles.edges.filter(
          page => page.node.id === "1"
        )[0].node;
      },

      prev() {
        // no older articles; wrap around to the newest one instead
        if (this.currentID === this.oldestNode.id) {
          return {
            slug: this.newestNode.path,
            title: this.newestNode.title,
            label: "newest"
          }
        }

        // else get the previous article
        const prevID = parseInt(this.currentID) - 1;
        const prevNode = this.$static.articles.edges.filter(
          page => page.node.id === prevID.toString()
        )[0].node;

        return {
          slug: prevNode.path,
          title: prevNode.title,
          label: "older"
        }
      },

      next() {
        // no newer articles; wrap around to the oldest one instead
        if (this.currentID === this.newestNode.id) {
          return {
            slug: this.oldestNode.path,
            title: this.oldestNode.title,
            label: "oldest"
          }
        }

        // else get the next article
        const nextID = parseInt(this.currentID) + 1;
        const nextNode = this.$static.articles.edges.filter(
          page => page.node.id === nextID.toString()
        )[0].node;

        return {
          slug: nextNode.path,
          title: nextNode.title,
          label: "newer"
        };
      }
    }
  };
</script>


<template>
  <nav class="paginator u-margin-bottom-sm">
    <ul class="paginator-list u-center u-margin-top-off-children">

      <li class="paginator-item paginator-item-first">
        <g-link :to="prev.slug" class="paginator-link u-margin-top-off-children">
          <span class="paginator-inner">
            <span class="paginator-label u-uppercase epsilon">
              {{ prev.label }}
            </span>
            <span class="u-visually-hidden"> article: </span>
            <span class="paginator-title heading">
              {{ prev.title }}
            </span>
          </span>
        </g-link>
      </li>

      <li class="paginator-item paginator-item-middle">
        <g-link to="/blog" class="paginator-link">
          <span class="paginator-inner">
            <GridIcon />
            <span class="u-visually-hidden">All articles</span>
          </span>
        </g-link>
      </li>

      <li class="paginator-item paginator-item-second">
        <g-link :to="next.slug" class="paginator-link u-margin-top-off-children">
          <span class="paginator-inner">
            <span class="paginator-label u-uppercase epsilon">
              {{ next.label }}
            </span>
            <span class="u-visually-hidden"> article: </span>
            <span class="paginator-title heading">
              {{ next.title }}
            </span>
          </span>
        </g-link>
      </li>

    </ul>
  </nav>
</template>


<style lang="scss">

  .paginator-list {
    @include box-shadow;
  }

  .paginator-item-first {
    border-bottom: 1px solid $light-1;
  }

  // hide blog list icon by default
  .paginator-item-middle {
    display: none;
  }

  .paginator-link {
    display: block;
    width: 100%;
    height: rem(90); // needed for alignment hack
    padding: $font-xs;
    background: #fff;
    text-decoration: none;
  }

  .paginator-inner {
    @include vertical-center;
    display: block; // required; spans hate positioning
    line-height: 0.01; // fix list icon alignment
  }

  // stack them spans up
  .paginator-label,
  .paginator-title {
    display: block;
    width: 100%;
  }

  // label text style
  .paginator-label {
    @include body-semibold-font;
    line-height: 1;
    color: $dark-1;
  }

  // title text style
  .heading.paginator-title { // specifity override
    color: $brand-color;
  }

  .grid-icon {
    transition: transform $duration-sm;
  }

  ////////////////////////////////
  // flexbox enhancement
  ////////////////////////////////

  // list icon in the middle, older/newer links take up the rest of the space
  @supports (display: flex) {
    // bigger screens only
    @media (min-width: $bp-xxs) {
      .paginator-list {
        display: flex;
      }

      // take up a bunch of room by default
      .paginator-item {
        flex: 2;
      }

      // reset border from default (stacked) layout
      .paginator-item-first {
        border-bottom: none;
      }

      // smaller middle icon
      .paginator-item-middle {
        display: block; // icon is display:none by default
        flex: 1;
        max-width: rem(60); // probably breaks ie11
        // reset and adjust borders
        border-left: 1px solid $light-1;
        border-right: 1px solid $light-1;
      }
    }
  }


  ////////////////////////////////
  // interactions
  ////////////////////////////////

  // :hover & :focus
  .paginator-link:hover,
  .paginator-link:focus {
    @include box-shadow-xl;
    z-index: 1; // bring forward

    // title
    .paginator-title {
      color: $brand-light;
    }

    // fancy list icon transition
    .grid-icon {
      transform: scale(1.125) rotateZ(-90deg);

      // :hover color
      path {
        fill: $brand-light;
      }
    }
  }


  // :active
  .paginator-link:active {

    // title
    .paginator-title {
      color: $brand-dark;
    }

    // list
    .grid-icon {
      transform: rotateZ(-90deg); // stay rotated from :hover/:focus, return to original size

      // :active color
      path {
        fill: $brand-dark;
      }
    }
  }
</style>
