<script>
  export default {
    name: "ProjectController",
    props: {
      img: { default: "missing `img` prop in ProjectController.vue" }
    }
  };
</script>


<template>
  <span class="tag epsilon">
    {{ img }}
  </span>
</template>


<style lang="scss">
</style>
