<script>
// import Layout from "~/layouts/NotDefault.vue";
import { Fragment } from "vue-fragment";
export default {
  components: {
    Fragment
  },
  metaInfo: {
    title: 'About us'
  }
}
</script>

<template>
  <Layout>
    <h1>About us</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error doloremque omnis animi, eligendi magni a voluptatum, vitae, consequuntur rerum illum odit fugit assumenda rem dolores inventore iste reprehenderit maxime! Iusto.</p>
    <template slot="sidebar">
      <p>I'm a sidebar</p>
    </template>

    <ul>
      <Fragment>
        <li>one</li>
        <li>two</li>
      </Fragment>
    </ul>
  </Layout>
</template>
