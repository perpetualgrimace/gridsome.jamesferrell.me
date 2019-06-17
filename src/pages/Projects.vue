<page-query>
  query Projects {
    d: projects(path: "/projects") {
      title
      headline
      ctaHeadline
      content
    }
  }
</page-query>

<script>
  import site from "../../content/site.json";
  import ProjectList from "~/components/ProjectList.vue";
  import FilterHeader from "~/components/FilterHeader";
  import CTA from "~/components/CTA";

  export default {
    components: {
      ProjectList, FilterHeader, CTA
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
  <Layout :singleColumn="true">

    <FilterHeader contentType="projects" />

    <ProjectList />

    <template slot="cta">
      <CTA :heading="$page.d.ctaHeadline" />
    </template>

  </Layout>
</template>


<style lang="scss">
</style>
