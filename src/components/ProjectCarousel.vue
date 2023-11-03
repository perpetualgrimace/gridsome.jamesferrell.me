<script>
export default {
  name: "ProjectCarousel",
  components: {
    Carousel: () =>
      import("vue-carousel/src/index")
        .then((m) => m.Carousel)
        .catch(),
    Slide: () =>
      import("vue-carousel/src/index")
        .then((m) => m.Slide)
        .catch(),
  },
  props: {
    slides: { default: {} },
    slug: { default: "" },
    maxWidth: { default: "100%" },
  },
};
</script>

<template>
  <div
    class="project-carousel u-margins-auto"
    :style="`max-width: ${maxWidth};`"
  >
    <Carousel :perPage="1" :navigationEnabled="true">
      <Slide v-for="({ slide }, i) in slides" :key="i">
        <g-image
          :src="`/images/projects/${slug}/${slides[i]}`"
          draggable="false"
        />
      </Slide>
    </Carousel>
  </div>
</template>

<style lang="scss"></style>
