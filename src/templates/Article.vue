<page-query>
  query ($path: String!) {
    d: article (path: $path) {
      id
      title
      published (format: "D MMMM, YYYY")
      content
      heroImg
    }
  }
</page-query>


<script>
  import moment, {fromNow} from "moment";
  import ImageHeader from "~/components/ImageHeader";
  import Colophon from "~/components/Colophon";

  export default {
    components: {
      ImageHeader, Colophon
    },
    metaInfo() {
      return {
        title: this.$page.d.title
      }
    },
    computed: {
      relativeDate() {
        return moment(this.$page.d.published).fromNow();
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

    <div class="article">
      <div class="content" v-html="$page.d.content" />
    </div>

    <template slot="sidebar">
      <dl>
        <dt>Published</dt>
        <dd>{{ relativeDate }}</dd>
      </dl>
    </template>

    <template slot="cta">
      <Colophon />
    </template>
  </Layout>
</template>


<style lang="scss">

</style>
