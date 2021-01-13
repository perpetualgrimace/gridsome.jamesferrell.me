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
      topic
      hashtag
    }
  }
</page-query>


<script>
  import {Fragment} from "vue-fragment";
  import moment, {fromNow} from "moment";

  import TwitterIcon from "../../static/images/icons/social/share-icon-twitter.svg";

  import site from "../../content/site.json";
  import {formatTagAsSlug, generateTwitterLink, minutesToRead} from "~/helpers.js";

  import Colophon from "~/components/Colophon";
  import ImageHeader from "~/components/ImageHeader";
  import Paginator from "~/components/Paginator";
  import Tag from "~/components/Tag";

  export default {
    components: {
      Fragment, TwitterIcon, Colophon, ImageHeader, Paginator, Tag
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
      },
      timeToRead() {
        return minutesToRead(this.$page.d.content);
      },
      tagSlug() {
        return formatTagAsSlug(this.$page.d.topic);
      },
      twitterLink() {
        return generateTwitterLink(
          this.$page.d.title,
          `https://${site.baseURL}/blog/${this.$page.d.slug}`,
          this.$page.d.hashtag
        )
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

    <template slot="sidebar">
      <dl class="u-font-sm article-sidebar">
        <dt>Category:</dt>
        <dd><Tag :title="$page.d.topic" :slug="tagSlug" el="span" /></dd>
        <br />

        <dt>Published:</dt>
        <dd>{{ relativeDate }}</dd>
        <br />

        <Fragment v-if="relativeUpdated">
          <dt>Last updated:</dt>
          <dd>{{ relativeUpdated }}</dd>
          <br />
        </Fragment>

        <dt>Estimated time to read:</dt>
        <dd>{{ timeToRead }}</dd>
        <br />

        <dt class="u-visually-hidden">Share:</dt>
        <dd>
          <a :href="twitterLink" class="secondary-link article-sidebar-link" target="_blank">
            <TwitterIcon />
            <span class="article-sidebar-link-text">Tweet this article</span>
          </a>
        </dd>
      </dl>
    </template>

    <template slot="cta">
      <Paginator :currentID="$page.d.id" />
      <Colophon classes="u-margin-bottom-sm" />
    </template>
  </Layout>
</template>


<style lang="scss">
  .content p > img {
    width: 100%;
  }

  // text next to label where there's room
  .article-sidebar {
    dt, dd  { display: inline-block; }
    dt      { margin-right: 0.25em; }
    dd      { margin-bottom: 0.875em; }
    dd .tag { margin-bottom: -0.2rem; } // offset tag padding
  }
</style>
