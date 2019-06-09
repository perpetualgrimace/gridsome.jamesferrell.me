<script>
  export default {
    name: "ProjectDeviceMobile",
    props: {
      lazy: { default: true },
      img: { default: "missing `img` prop in ProjectDeviceMobile.vue" }
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
  <div class="device-container mobile-container">
    <div class="device-shell mobile-shell" />
    <div class="device-screen mobile-screen">
      <img
        v-if="lazy"
        className="device-image"
        :data-src="src"
        :data-srcset="srcset"
        sizes="144px"
        alt=""
      />
      <img
        v-else
        className="device-image"
        :src="src"
        :srcset="srcset"
        sizes="144px"
        alt=""
      />
  </div>
</div>
</template>


<style lang="scss">
  // shared styles
  // TODO: device wrapper component?
  .device-shell {
    @include device-shadow;
    background: $black;
    border: 1px solid $dark-1;
    border-radius: 20px;
  }

  .device-screen {
    position: absolute;
    background: $gray;
    box-shadow: 0 0 12px rgba($white, 0.05);
    overflow: hidden; // change to auto to allow scrolling, but probably isn't elegant on widows devices
  }

  // position and size elements in the screen
  .device-screen > * {
    display: block;
    width: 100%;
  }

  // mobile styles
  .mobile-shell {
    width: 160px;
    height: 320px;
  }

  .mobile-screen {
    width: 144px;
    height: 256px;
    top: 32px;
    left: 8px;
  }
</style>
