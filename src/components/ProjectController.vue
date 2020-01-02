<script>
  export default {
    name: "ProjectController",
    props: {
      lazy: { default: true },
      img: { default: "missing `img` prop in ProjectDeviceLaptop.vue" }
    },
    computed: {
      src() {
        return `/images/projects/${this.img}`;
      },
      srcset() {
        return `
          /images/projects/${this.img} 1x,
          /images/projects/${this.img.replace(".", "@2x.")} 2x
        `
      }
    }
  };
</script>


<template>
  <div class="controller">
    <img
      v-if="lazy"
      class="project-img controller-img"
      :data-src="src"
      :data-srcset="srcset"
      sizes="320px"
      alt=""
    />
    <img
      v-else
      class="project-img controller-img"
      :src="src"
      :srcset="srcset"
      sizes="320px"
      alt=""
    />
  </div>
</template>


<style lang="scss">

  // keep image centered within container
  .controller {
    text-align: center;
  }


  // hide the cord on small viewports
  @media (max-width: 68em - 0.001) {
    // limit container height
    .controller {
      overflow: hidden;
      height: 160px;
    }
    // position image so cord is hidden
    .controller-img {
      bottom: 75px;
      max-width: 100%; // flow off the screen
    }
  }

  // when the controller starts to scale down, switch to percentage based units for positioning
  @media (max-width: 24em - 0.001) {
    .controller-img {
      bottom: 0;
      margin-top: -20%;
    }
  }


  // caption left, image right layout
  @media (min-width: 68em) {
    // position controller right
    .controller {
      position: absolute;
      text-align: right;
      width: 50%;
      top: -1.5rem;
      right: 0;
    }

    // let the image be actual size and break out of the container slightly if needed
    .controller-img {
      max-width: none;
    }

    .controller-project {
      // make the caption vertically centerable
      .project-inner {
        height: rem(220);
      }

      // vertically center caption, limit width
      .project-caption {
        @include vertical-center;
        width: 50%;
      }
    }
  }

  // fudged vertical alignment on huge screens
  .controller-img {
    @media (min-width: $xxl) {
      transform: scale(1.125) translateX(10%);
    }
    @media (min-width: $xxxl) {
      border: blue;
    }
  }
</style>
