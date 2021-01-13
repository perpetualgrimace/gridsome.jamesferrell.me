<script>
  export default {
    name: "ProjectDeviceLaptop",
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
  <div class="device-container laptop-container">
    <div class="device-shell laptop-shell" />
    <div class="device-screen laptop-screen">
      <img
        v-if="lazy"
        class="device-img"
        :data-src="src"
        :data-srcset="srcset"
        sizes="524px"
        alt=""
      />
      <img
        v-else
        class="device-img"
        :src="src"
        :srcset="srcset"
        sizes="524px"
        alt=""
      />
    </div>

    <div class="laptop-bottom" />
    <div class="laptop-bottom-bevel" />
  </div>
</template>


<style lang="scss">
  .laptop-shell {
    width: 560px;
    height: 386px;
  }

  .laptop-screen {
    width: 524px;
    height: 328px;
    left: 18px;
    top: 23px;
  }

  .laptop-bottom {
    @include device-shadow;
    position: absolute;
    left: -65px;
    top: 372px;
    width: 690px;
    height: 14px;
    background: $light-3;
    border-radius: 2px 2px 0 0;
    z-index: 1;
  }

  .laptop-bottom-bevel {
    @include device-shadow;
    position: absolute;
    left: -65px;
    top: 380px;
    width: 690px;
    height: 12px;
    background: $gray;
    border-radius: 7.5% / 100%; // now *that's* a CSS trick
  }
</style>
