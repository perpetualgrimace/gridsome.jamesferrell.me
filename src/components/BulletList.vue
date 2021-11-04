<static-query>
  query BulletList ($page: Int) {
    lists: allBulletList (page: $page) {
      edges {
        node {
          path
          content
          slug
        }
      }
    }
  }
</static-query>


<script>
  export default {
    name: "BulletList",
    props: {
      slug: { default: "keynote-commands-list" }
    },
    computed: {
      list() {
        const edges = this.$static.lists.edges;
        const currentList = edges.filter(edge => edge.node.slug === this.slug)[0].node.content;
        return currentList;
      }
    }
  };
</script>


<template>
  <div class="bullet-list content u-font-sm" :class="`${slug}-bullet-list`">
    <div v-html="list" />
  </div>
</template>


<style lang="scss">
  .bullet-list {
    @include list-block;

    li {
      line-height: 1rem;

      & + li {
        margin-top: 0.5rem;
      }
    }

    &.skills-list-bullet-list {
      @media (min-width: $bp-xs) {
        columns: 1; // reset

        div {
          display: grid;
          grid-template-columns: 1fr $gutter 1fr;
          grid-auto-flow: dense;
        }

        h2,
        h3[id="capable-but-not-excited-about"],
        h3[id="capable-but-not-excited-about"] + ul {
          grid-column: 1 / 4;
        }

        h3,
        h3 + ul {
          grid-column: 1 / 2;
        }

        h3[id=core-design-skills],
        h3[id=core-design-skills] + ul {
          grid-column: 3 / 4;
        }

        // inline list
        h3[id="capable-but-not-excited-about"] + ul li {
          display: inline-block;
          line-height: 1; // thanks inline-block
          padding-right: $gutter * 0.575; // fudged
          margin-right: $gutter;

          &:last-child {
            padding-right: 0;
            margin-right: 0;
          }
        }
      }
    }

    @media (min-width: $bp-xs) {
      h3[id="grouping-and-locking"] + p + ul {
        break-after: always;

        & + h3 { margin-top: 0; }
      }
    }
  }
</style>
