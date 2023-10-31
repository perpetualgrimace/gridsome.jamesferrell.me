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
import { Fragment } from "vue-fragment";
import moment, { fromNow } from "moment";

import site from "../../content/site.json";
import {
  formatTagAsSlug,
  generateTwitterLink,
  minutesToRead,
} from "~/helpers.js";

import Colophon from "~/components/Colophon";
import ImageHero from "~/components/ImageHero";
import Paginator from "~/components/Paginator";
import Tag from "~/components/Tag";

export default {
  components: {
    Fragment,
    Colophon,
    ImageHero,
    Paginator,
    Tag,
  },
  metaInfo() {
    return {
      title: this.$page.d.title,
    };
  },
  computed: {
    relativeDate() {
      return moment(this.$page.d.published, "YYYY-MM-DD").fromNow();
    },
    relativeUpdated() {
      return this.$page.d.updated
        ? moment(this.$page.d.updated, "YYYY-MM-DD").fromNow()
        : null;
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
      );
    },
  },
};
</script>

<template>
  <Layout singleColumn="true">
    <template slot="hero">
      <ImageHero
        :id="$page.d.id"
        :headline="$page.d.title"
        :imgSrc="$page.d.heroImg"
      >
        <template slot="meta">
          <p class="article-meta u-font-sm">
            Posted <i>{{ relativeDate }}</i>
            <Fragment v-if="relativeUpdated">
              and updated <i>{{ relativeUpdated }}</i>
            </Fragment>
            in <Tag :title="$page.d.topic" :slug="tagSlug" el="span" />
          </p>
          <p class="article-meta u-font-sm">
            Estimated time to read: <i>{{ timeToRead }}</i>
          </p>
        </template>
      </ImageHero>
    </template>

    <VueRemarkContent class="article-content content" />

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

.article-content {
  @include subgrid;
}

.article-meta {
  @include text-shadow;
  color: $light-2;

  i {
    color: $white;
  }
}
</style>
