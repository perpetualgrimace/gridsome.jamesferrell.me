<page-query>
  query Projects {
    d: projects(path: "/projects") {
      title
      headline
      content
    }
  }
</page-query>

<script>
  import site from "../../content/site.json";
  import ProjectList from "~/components/ProjectList.vue";
  export default {
    components: {
      ProjectList
    },
    metaInfo: {
      title: "Projects"
    },
    data () {
      return {
        site
      }
    }
  }
</script>

<template>
  <Layout>

    <h1>All projects</h1>

    <ProjectList />
    <template slot="sidebar">
      <div v-html="$page.d.content" />
    </template>

  </Layout>
</template>


<style lang="scss">
</style>
