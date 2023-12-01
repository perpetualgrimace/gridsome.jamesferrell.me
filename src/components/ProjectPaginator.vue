<static-query>
  query Project ($page: Int) {
    projects: allProject (page: $page, sortBy: "id") {
      edges {
        node {
          id
          title
          path
          slug
        }
      }
    }
  }
</static-query>

<script>
import Paginator from "~/components/Paginator";

export default {
  name: "ProjectPaginator",
  props: {
    currentID: { default: null },
    allPages: { default: null },
  },
  components: { Paginator },
};
</script>

<template>
  <Paginator
    :allPages="$static.projects.edges"
    :currentID="currentID"
    template="project"
    parentPageLink="/projects"
  />
</template>
