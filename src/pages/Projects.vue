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
  import FilterHeader from "~/components/FilterHeader";
  import SecondarySidebar from "~/components/SecondarySidebar";

  export default {
    components: {
      ProjectList, FilterHeader, SecondarySidebar
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

    <FilterHeader contentType="projects" />

    <ProjectList />
    <template slot="sidebar">
      <SecondarySidebar :content="$page.d.content" />
    </template>

  </Layout>
</template>


<style lang="scss">
</style>
