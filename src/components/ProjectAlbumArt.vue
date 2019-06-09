<script>
  export default {
    name: "ProjectAlbumArt",
    props: {
      img: { default: "missing `img` prop in ProjectAlbumArt.vue" }
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
