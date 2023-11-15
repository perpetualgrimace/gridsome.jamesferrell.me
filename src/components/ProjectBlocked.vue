<script>
import { getBaseUrlFromString } from "~/helpers.js";

import Button from "~/components/Button";

export default {
  name: "ProjectBlocked",
  components: { Button },
  props: {
    externalLink: { default: "missing.link" },
  },
  methods: { getBaseUrlFromString },
};
</script>

<template>
  <div class="project-blocked">
    <g-image src="/images/xzbitsad.jpg" alt="Xhibit is sad" />
    <h2 class="u-font-xxl u-margin-bottom">
      Yo dawg, I heard you like websites
    </h2>
    <p class="u-font-lg u-margin-bottom">
      Unfortunately,
      <a :href="externalLink" target="_blank">{{
        getBaseUrlFromString(externalLink)
      }}</a>
      won’t let me put their website in my website — so in this case you
      won't be able to website while you website.
    </p>
    <p class="u-font-sm">
      <a class="button" :href="externalLink" target="_blank">
        Open
        <span class="u-visually-hidden">{{
          getBaseUrlFromString(externalLink)
        }}</span>
        in a new tab
      </a>
    </p>
  </div>
</template>

<style lang="scss">
.project-blocked {
  height: 100%;
  background-color: $dark-3;
  padding: $gutter * 2 $gutter * 2 $gutter $gutter * 2;
  border-top: 1px solid $black;
  border-radius: 0 0 $radius-md $radius-md;
  overflow-y: auto;

  img {
    float: left;
    width: 14rem;
    max-width: 33.333%;
    min-width: 5rem;
    margin-right: $gutter * 2;
    margin-bottom: $gutter;
  }
}
</style>
