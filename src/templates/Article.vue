<page-query>
  query ($path: String!) {
    d: article (path: $path) {
      id
      slug
      title
      published
      updated
      content
      heroImg
    }
  }
</page-query>


<script>
  import moment, {fromNow} from "moment";
  import ImageHeader from "~/components/ImageHeader";
  import Colophon from "~/components/Colophon";
  import Paginator from "~/components/Paginator";

  export default {
    components: {
      ImageHeader, Colophon, Paginator
    },
    metaInfo() {
      return {
        title: this.$page.d.title
      }
    },
    computed: {
      relativeDate() {
        return moment(this.$page.d.published, "YYYY-MM-DD").fromNow();
      },
      relativeUpdated() {
        return this.$page.d.updated ? moment(this.$page.d.updated, "YYYY-MM-DD").fromNow() : null;
      }
    }
  }
</script>


<template>
  <Layout>
    <template slot="hero">
      <ImageHeader
        :id="$page.d.id"
        :headline="$page.d.title"
        :imgSrc="$page.d.heroImg"
      />
    </template>

    <VueRemarkContent class="content" />

    <!-- TODO: time to read -->
    <!-- TODO: twitter share link -->
    <!-- TODO: style sidebar -->
    <template slot="sidebar">
      <dl>
        <dt>Published</dt>
        <dd>{{ relativeDate }}</dd>
      </dl>

      <dl v-if="relativeUpdated">
        <dt>Last updated</dt>
        <dd>{{ relativeUpdated }}</dd>
      </dl>
    </template>

    <template slot="cta">
      <Paginator :currentID="$page.d.id" />
      <Colophon classes="u-margin-bottom-sm" />
    </template>
  </Layout>
</template>


<style lang="scss">

</style>
