<script>
  export default {
    name: "ProjectAlbumArt",
    props: {
      lazy: { default: true },
      img: { default: "missing `img` prop in ProjectAlbumArt.vue" }
    },
    computed: {
      src() {
        return `./images/projects/${this.img}`;
      },
      srcset() {
        return `
          ./images/projects/${this.img} 1x,
          ./images/projects/${this.img.replace(".", "@2x.")} 2x
        `
      }
    }
  };
</script>


<template>
  <div class="album">
    <img
      v-if="lazy"
      class="project-img album-img"
      :data-src="src"
      :data-srcset="srcset"
      sizes="320px"
      alt=""
    />
    <img
      v-else
      class="project-img album-img"
      :src="src"
      :srcset="srcset"
      sizes="320px"
      alt=""
    />
  </div>
</template>


<style lang="scss">
  ////////////////////////////////////
  // album positioning
  ////////////////////////////////////

  // make the album look physical
  .album-img {
    @include device-shadow;
    border-radius: $radius;
  }


  // caption left, image right layout
  @media (min-width: 68em) {

    // set container height
    .album-project {
      height: rem(400);

      // position album right
      .album {
        float: right;
        width: 49.9%;
        text-align: right;
      }

      // set album size by height
      .album-img {
        height: rem(340);
        width: auto;
        max-width: none;
      }

      // make the caption vertically centerable
      .project-inner {
        height: rem(360);
      }

      // vertically center caption, limit width
      .project-caption {
        @include vertical-center;
        width: 50%;
        float: left; // needed to make the floated album not clear
      }
    }
  }
</style>
