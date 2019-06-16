<static-query>
  query {
    metaData {
      siteName
    }
  }
</static-query>


<script>
  import { Fragment } from "vue-fragment";
  import MainNav from "~/components/MainNav";
  import MainSidebar from "~/components/MainSidebar";
  import Footer from "~/components/Footer";

  export default {
    components: {
      Fragment, MainNav, MainSidebar, Footer
    },
    props: {
      nav: { default: true, type: Boolean }
    }
  }
</script>


<template>
  <Fragment>

    <MainNav />

    <transition name="transition-fade" appear>
      <main class="main u-padding-top-off" id="main">

        <slot name="hero" />

        <div class="section primary-content">
          <slot />
        </div>
        <div class="section secondary-content" v-if="$slots.sidebar">
          <slot name="sidebar" />
        </div>
      </main>
    </transition>

    <MainSidebar />

    <Footer />

  </Fragment>
</template>


<style lang="scss">

  .transition-fade-enter {
    opacity: 0;
    transform: translateY(10px);

    &-active {
      transition:
        opacity 0.25s ease-out,
        transform 0.25s ease-out;
    }
  }
</style>
