<page-query>
  query ($path: String!) {
    d: article (path: $path) {
      id
      slug
      title
      published
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
      }
    }
  }
</script>


<template>
  <Layout>
    <VueRemarkContent>
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
        <Paginator :currentID="$page.d.id" />
        <Colophon classes="u-margin-bottom-sm" />
      </template>
    </VueRemarkContent>
  </Layout>
</template>


<style lang="scss">

</style>
