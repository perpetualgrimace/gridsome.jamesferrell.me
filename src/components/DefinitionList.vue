<static-query>
  query DefinitionList ($page: Int) {
    lists: allDefinitionList (page: $page) {
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
    name: "DefinitionList",
    props: {
      slug: { default: "employment-list" }
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
  <div class="definition-list content u-font-sm" :class="`${slug}-definition-list`">
    <div v-html="list" />
  </div>
</template>

<style lang="scss">
  .definition-list {
    @include list-block;

    // paragraphs
    &[class] p {
      margin-top: 0.75em;
      line-height: 1.275;
    }

    // Dates
    h2[id="employment"] ~ h3 + p {
      display: block; // necessary to honor margin adjustment
      margin-top: 0.25em;
      margin-bottom: -0.25em;
      font-size: $font-xs;
      text-transform: uppercase;
    }

    &.employment-list-definition-list {
      @supports (grid-template-columns: 1fr $gutter 1fr) {
        @media (min-width: $bp-xs) {
          columns: 1; // reset

          div {
            display: grid;
            grid-template-columns: 1fr $gutter 1fr;
            grid-auto-flow: dense;
          }

          h2 {
            grid-column: 1 / 4;
          }

          h3,
          h3 + p,
          h3 + p + p {
            grid-column: 1 / 2;
          }

          $employmentColumnsToOffset: (
            "front-end-designer-at-datawheel",
            "lead-designer-at-cefco"
          );
          @each $sectionId in $employmentColumnsToOffset {
            h3[id=#{$sectionId}],
            h3[id=#{$sectionId}] + p,
            h3[id=#{$sectionId}] + p + p {
              grid-column: 3 / 4;
            }
          }
        }
      }
    }

    // @media (min-width: $bp-xs) {
    //   // make datawheel text bigger and span across columns
    //   h3[id="front-end-designer-at-datawheel"] {
    //     &,
    //     & + p,
    //     & + p + p,
    //     & + p + p + p {
    //       column-span: all;
    //     }
    //
    //     & + p + p + p {
    //       margin-bottom: 1.5em;
    //     }
    //   }
    // }
  }
</style>
