<script>
  import {Fragment} from "vue-fragment";
  import MainNav from "~/components/MainNav";
  import Footer from "~/components/Footer";

  export default {
    components: {
      Fragment, MainNav, Footer
    },
    props: {
      wrapperClass: { default: null, type: String },
      singleColumn: { default: false, type: Boolean }
    }
  }
</script>


<template>
  <Fragment>
    <MainNav />

    <transition name="transition-fade" appear>
      <main class="main u-padding-top-off" id="main">

        <slot name="hero" />

        <div class="section primary-content" :class="singleColumn && 'single-column'">
          <slot />
        </div>

        <div class="section secondary-content" v-if="$slots.sidebar">
          <slot name="sidebar" />
        </div>

        <div class="section cta-content" v-if="$slots.cta">
          <slot name="cta" />
        </div>
      </main>
    </transition>

    <Footer />
  </Fragment>
</template>


<style lang="scss">

  .transition-fade-enter {
    opacity: 0;
    transform: translateY(10px);

    &-active {
      transition:
        opacity $timing 0.25s,
        transform $timing 0.25s;

      // hide avatar when loading in
      & .colophon-avatar-inner {
        opacity: 0;
      }
    }
  }
</style>
