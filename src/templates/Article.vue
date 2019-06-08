<page-query>
  query ($path: String!) {
    d: article (path: $path) {
      title
      published (format: "D MMMM, YYYY")
      content
      heroImg
    }
  }
</page-query>


<script>
  export default {
    metaInfo () {
      return {
        title: this.$page.d.title
      }
    }
  }
</script>


<template>
  <Layout>
    <div class="article">
      <h1>{{ $page.d.title }}</h1>
      <span>{{ $page.d.date }}</span>
      <g-image v-if="$page.d.heroImg" :src="$page.d.heroImg" />
      <div class="content" v-html="$page.d.content" />
    </div>
  </Layout>
</template>


<style lang="scss">

</style>
