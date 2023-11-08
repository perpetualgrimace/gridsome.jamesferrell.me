<script>
export default {
  name: "ProjectThumbnail",
  props: {
    lazy: { default: true },
    img: { default: "missing `img` prop in ProjectThumbnail.vue" },
  },
  computed: {
    src() {
      return `/images/projects/${this.img}`;
    },
    srcset() {
      return `
          /images/projects/${this.img} 1x,
          /images/projects/${this.img.replace(".", "@2x.")} 2x
        `;
    },
  },
};
</script>

<template>
  <div class="thumbnail">
    <img
      v-if="lazy"
      class="project-img thumbnail-img"
      :data-src="src"
      :data-srcset="srcset"
      sizes="880px"
      alt=""
    />
    <img
      v-else
      class="project-img thumbnail-img"
      :src="src"
      :srcset="srcset"
      sizes="880px"
      alt=""
    />
  </div>
</template>

<style lang="scss">
.thumbnail {
  @include device-shadow;
  border-radius: $radius-sm;
  overflow: hidden;
}

.project-img.thumbnail-img {
  display: block; // remove extra space at bottom
}
</style>
