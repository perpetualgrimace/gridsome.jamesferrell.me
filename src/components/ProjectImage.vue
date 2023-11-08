<script>
export default {
  name: "ProjectImage",
  props: {
    src: { default: "" },
    slug: { default: "" },
    maxWidth: { default: "" },
  },
};
</script>

<template>
  <div
    class="project-image u-margins-auto"
    :style="`max-width: ${maxWidth || '960px'};`"
  >
    <g-image :src="`/images/projects/${slug}/${src}`" draggable="false" />
  </div>
</template>

<style lang="scss">
.project-image {
  @include device-shadow;
  border-radius: $radius-md;
  overflow: hidden;
}
</style>
