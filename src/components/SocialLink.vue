<script>
  import site from "../../content/site.json";

  export default {
    name: "SocialLink",
    props: {
      social: { type: Object }
    }
  };
</script>


<template>
  <li class="social-item">
    <a :href="social.link" :class="`social-link social-link-${social.name} u-uppercase epsilon`">
      <span class="social-icon">
        <img class="social-svg" :src="`/images/icons/social/${social.name}.svg`" alt="">
      </span>
      <span class="social-text">{{ social.name }}</span>
    </a>
  </li>
</template>


<style lang="scss">
  // default styles
  .social-link {
    color: $brand-color;

    // interactions
    &:hover, &:focus {
      color: $brand-light;

      .social-text {
        text-decoration: underline;
      }
    }
  }

  // icon style and placement
  .social-icon {
    @include brand-color-depth;
    // alignment
    display: inline-block;
    vertical-align: middle;
    top: -1px; // fudge the icon up
    width: 1rem;
    height: 1rem;
    margin-right: 0.4em;
    // aesthetic
    border-radius: $radius;

    // scale icon to container
    svg, image, img {
      @include absolute-expand;
    }
  }

</style>
