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
  <div class="block block-list block-bullet-list content epsilon">
    <div v-html="list" />
  </div>
</template>


<!-- TODO: style bullet list -->
<!-- TODO: trim unused block styles -->
<style lang="scss">
  ////////////////////////////////
  // list block types
  ////////////////////////////////

  // add columns where that makes sense
  .block-list {

    // halfway between $xs and $s
    @media (min-width: 35em) {
      columns: 2;
      column-gap: $gutter * 2;
      break-inside: avoid;
    }

    // if it's too small for columns, bump up font sizes
    @media (max-width: 35em - 0.001) {

      // headings and terms
      dt, h3 {
        font-size: $bigger-than-delta;
      }

      // subheads
      .block-definition-subhead {
        font-size: $epsilon;
      }

      // list items and defintions
      dd > p,
      li {
        font-size: $delta;
      }
    }
  }

  // keep groups grouped
  .block-bullet-list-group,
  .block-definition-list > li {
    break-inside: avoid;
  }


  ////////////////////////////////
  // contextual adjustments
  ////////////////////////////////

  // default spacing
  .block + .block {
    margin-top: 1rem;
  }

  // extra spacing for heading blocks
  .block + .block-heading {
    margin-top: 2rem;
  }

  .block-heading + .block-definition-list {
    margin-top: 0.8rem;
  }

  .block-bullet-list + .block-text {
    margin-top: 1.75rem;
  }

  .block-text + .block-text {
    margin-top: 1.75rem;
  }

  // definition list adjustments
  .block-definition-list {
    // definition adjustment
    dd {
      margin-top: 0.75em;
      line-height: 1.275;

      // subhead adjustment
      > .block-definition-subhead {
        display: block; // necessary to honor margin adjustment
        margin-top: -0.5em;
      }
    }
    // spacing of individual definitions (each definition is wrapped in an li)
    li + li {
      margin-top: 1em;
    }
  }
</style>
