<static-query>
  query {
    metaData {
      siteName
    }
  }
</static-query>


<script>
  import { Fragment } from "vue-fragment";
  import MainNav from "~/components/MainNav.vue";
  import MainSidebar from "~/components/MainSidebar.vue";

  export default {
    components: {
      Fragment, MainNav, MainSidebar
    },
    props: {
      nav: { default: true, type: Boolean }
    }
  }
</script>


<template>
  <Fragment>

    <MainNav />

    <transition name="is-fading" appear>
      <main class="main u-padding-top-off" id="main">
        <div className="section primary-content">
          <slot />
        </div>
        <div class="section secondary-content" v-if="$slots.sidebar">
          <slot name="sidebar" />
        </div>
      </main>
    </transition>

    <MainSidebar />

  </Fragment>
</template>


<style lang="scss">
  .nav-link.is-active {
      color: black;
  }

  .is-fading-enter {
    opacity: 0;
    transform: translateY(10px);

    &-active {
      transition:
        opacity 0.25s ease-out,
        transform 0.25s ease-out;
    }
  }
</style>
