<script>
import GridIcon from "~/svg/GridIcon.svg";

export default {
  name: "Paginator",
  components: {
    GridIcon,
  },
  props: {
    currentID: { default: null },
    allPages: { default: null },
    template: { default: "article" },
    parentPageLink: { default: "/blog" },
  },
  computed: {
    total() {
      return this.allPages.length.toString();
    },
    newestNode() {
      return this.allPages.filter(
        (page) => page.node.id === this.total.toString()
      )[0].node;
    },
    oldestNode() {
      return this.allPages.filter((page) => page.node.id === "1")[0].node;
    },

    prev() {
      // no older pages; wrap around to the newest one instead
      if (this.currentID === this.oldestNode.id) {
        return {
          slug: this.newestNode.path,
          title: this.newestNode.title,
          label: "newest",
        };
      }

      // else get the previous page
      const prevID = parseInt(this.currentID) - 1;
      const prevNode = this.allPages.filter(
        (page) => page.node.id === prevID.toString()
      )[0].node;

      return {
        slug: prevNode.path,
        title: prevNode.title,
        label: "older",
      };
    },

    next() {
      // no newer pages; wrap around to the oldest one instead
      if (this.currentID === this.newestNode.id) {
        return {
          slug: this.oldestNode.path,
          title: this.oldestNode.title,
          label: "oldest",
        };
      }

      // else get the next page
      const nextID = parseInt(this.currentID) + 1;
      const nextNode = this.allPages.filter(
        (page) => page.node.id === nextID.toString()
      )[0].node;

      return {
        slug: nextNode.path,
        title: nextNode.title,
        label: "newer",
      };
    },
  },
};
</script>

<template>
  <nav
    :class="
      `paginator u-margin-top-sm u-margin-bottom-sm${
        template !== 'article' ? ' is-fixed' : ''
      }`
    "
  >
    <ul class="paginator-list u-center u-margin-top-off-children">
      <li class="paginator-item paginator-item-first">
        <g-link
          :to="prev.slug"
          class="paginator-link u-margin-top-off-children"
        >
          <span class="paginator-inner">
            <span class="paginator-label u-uppercase u-font-sm">
              {{ prev.label }}
            </span>
            <span class="u-visually-hidden"> {{ template }}: </span>
            <span class="paginator-title heading">
              {{ prev.title }}
            </span>
          </span>
        </g-link>
      </li>

      <li class="paginator-item paginator-item-middle">
        <g-link :to="parentPageLink" class="paginator-link">
          <span class="paginator-inner">
            <GridIcon />
            <span class="u-visually-hidden">All {{ template }}s</span>
          </span>
        </g-link>
      </li>

      <li class="paginator-item paginator-item-last">
        <g-link
          :to="next.slug"
          class="paginator-link u-margin-top-off-children"
        >
          <span class="paginator-inner">
            <span class="paginator-label u-uppercase u-font-sm">
              {{ next.label }}
            </span>
            <span class="u-visually-hidden"> {{ template }}: </span>
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
@media (min-width: $bp-md) and (min-height: $bp-sm) {
  .paginator.is-fixed {
    position: fixed;
    z-index: 1;
    bottom: 0;
    left: $gutter / 2;
    right: $gutter / 2;

    .paginator-list {
      width: 48rem;
      max-width: 100%;
      margin: auto;
    }
  }
}

.paginator-list {
  @include box-shadow-lg;
  border-radius: $radius-md;

  @include dark-mode {
    @include box-shadow-lg(rgba($black, 0.666));
  }
}

.paginator-item-first {
  border-bottom: 1px solid $light-1;

  @include dark-mode {
    border-color: $dark-3;
  }

  .paginator-link {
    @media (max-width: $bp-xxs - 0.001) {
      border-top-left-radius: $radius-md;
      border-top-right-radius: $radius-md;
    }
    @media (min-width: $bp-xxs) {
      border-top-left-radius: $radius-md;
      border-bottom-left-radius: $radius-md;
    }
  }
}

// hide blog list icon by default
.paginator-item-middle {
  display: none;
}

.paginator-item-last .paginator-link {
  @media (max-width: $bp-xxs - 0.001) {
    border-bottom-left-radius: $radius-md;
    border-bottom-right-radius: $radius-md;
  }
  @media (min-width: $bp-xxs) {
    border-top-right-radius: $radius-md;
    border-bottom-right-radius: $radius-md;
  }
}

.paginator-link {
  display: flex;
  width: 100%;
  height: rem(90); // needed for alignment hack
  padding: $font-xs;
  // theming
  text-decoration: none;
  background-color: $white;

  @include dark-mode {
    background-color: $dark-2;
  }
}

.paginator-inner {
  margin: auto;
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

  @include dark-mode {
    color: $light-3;
  }
}

// title text style
.heading.paginator-title {
  // specifity override
  color: $brand-color;
  transition: color $duration-sm;
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
      flex: 0 0 rem(80);
      // reset and adjust borders
      border-left: 1px solid $light-1;
      border-right: 1px solid $light-1;

      @include dark-mode {
        border-color: $dark-3;
      }
    }
  }
}

////////////////////////////////
// interactions
////////////////////////////////

// :hover & :focus
.paginator-link:hover,
.paginator-link:focus {
  z-index: 1; // bring forward
  @include box-shadow-xl;

  @include dark-mode {
    @include box-shadow-xl(rgba($black, 0.666));
  }

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
    transform: rotateZ(
      -90deg
    ); // stay rotated from :hover/:focus, return to original size

    // :active color
    path {
      fill: $brand-dark;
    }
  }
}
</style>
