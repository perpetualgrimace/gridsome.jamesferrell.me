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
    <Carousel
      :perPage="1"
      :navigationEnabled="true"
      :loop="true"
      :paginationPadding="0"
    >
      <Slide v-for="({ slide }, i) in slides" :key="i">
        <g-image
          :src="`/images/projects/${slug}/${slides[i]}`"
          draggable="false"
        />
      </Slide>
    </Carousel>
  </div>
</template>

<style lang="scss">
$carousel-button-width: 1.95rem;

.project-carousel {
  @include device-shadow;
  border: $gutter solid $dark-2;
  border-radius: $radius-sm;
}
.VueCarousel-wrapper {
  @include box-shadow-xl($shadow-dark);
}

.VueCarousel-navigation {
  @include absolute-vertical-center;
  width: 100%;
}
.VueCarousel-navigation-button {
  width: $carousel-button-width;
  height: $carousel-button-width;
  background-color: $dark-1 !important;
  color: transparent !important;
  border-radius: 1rem;
  opacity: 0.666;

  &:hover,
  &:focus {
    opacity: 1;
    background-color: $brand-color !important;
  }

  &:before {
    @include pseudo;
    @include absolute-expand;
    background-image: url("/images/icons/ui/chevron-right.svg");
    background-size: 1.25rem;
    background-position: center;
    background-repeat: no-repeat;
  }

  &.VueCarousel-navigation-prev {
    margin-left: -$carousel-button-width;
  }
  &.VueCarousel-navigation-next {
    margin-right: -$carousel-button-width;
  }

  &.VueCarousel-navigation-prev:before {
    transform: scaleX(-1);
  }
}

.VueCarousel-pagination {
  position: absolute;
  bottom: $gutter / 2;
}
.VueCarousel-dot {
  @include box-shadow($shadow-dark);
  background: $gray !important;

  &:not(:last-child) {
    margin-right: 1em;
  }

  // extend clickable area
  &:before {
    @include pseudo;
    position: absolute;
    width: 300%;
    height: 300%;
    top: -50%;
    left: -50%;
  }

  &:hover,
  &:focus {
    background: $brand-light !important;
  }
  &--active {
    background: $brand-color !important;
  }
}
</style>
