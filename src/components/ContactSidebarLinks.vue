<script>
  import site from "../../content/site.json";
  import SocialLink from "~/components/SocialLink";

  export default {
    name: "ContactSidebarLinks",
    components: {
      SocialLink
    },
    data () {
      return {
        site
      }
    }
  };
</script>

<template>
  <ul class="secondary-social-list u-list-reset">
    <SocialLink v-for="social in site.moreSocialAccounts" :social="social" :key="social.name" />
  </ul>
</template>

<style lang="scss">
  .secondary-social-list .social-link {
    text-decoration-color: $light-2;
  }
</style>
