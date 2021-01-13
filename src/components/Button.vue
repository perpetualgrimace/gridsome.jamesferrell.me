<script>
  export default {
    name: "Button",
    props: {
      onClick: { default: null, type: Function },
      type:    { default: null },
      link:    { default: null },
      classes: { default: null },
      text:    { default: "missing `text` prop in Button.vue" }
    }
  };
</script>


<template>
  <!-- button with click event -->
  <button class="button" :class="classes" :type="type" @click="onClick" v-if="onClick">
    {{ text }}
  </button>
  <!-- button with type only -->
  <button class="button" :class="classes" :type="type" v-else-if="type && !onClick">
    {{ text }}
  </button>
  <!-- link -->
  <g-link class="button" :class="classes" :to="link" v-else-if="link">
    {{ text }}
  </g-link>
</template>


<style lang="scss">

  // mixin only used in this file
  @mixin button-base(
    $primary-color: $brand-color,
    $light-color:   $brand-light,
    $dark-color:    $brand-dark,
    $text-color:    $white
  ) {
    @include body-semibold-font;
    display: inline-block;
    overflow: hidden; // clip :after gradient fill
    z-index: 1; // needed to make :after pseudo element visible
    margin-top: 0.75rem;
    text-transform: uppercase;
    text-decoration: none !important;
    color: $text-color !important;
    background-color: $primary-color; // base color
    border-bottom: 2px solid transparent; // initial state
    // default padding and border-radius; may be overwritten by button variants
    padding: 0.65em 1.25em 0.55em 1.25em; // forever fudged
    border-radius: $radius-sm;

    // transitionable gradient fill
    &:after {
      @include pseudo;
      @include absolute-expand;
      z-index: -1;
      background-image: linear-gradient(to bottom, $light-color, $primary-color);
      opacity: 0; // initial opacity
    }

    // hover state
    &:hover,
    &:focus {
      color: $text-color;
      border-color: $dark-color;
      // transform: perspective(50em) rotateX(10deg) scale(1.0125); // 3d effect

      // show gradient fill
      &:after {
        opacity: 1;
        transform: none;
      }
    }

    // focus
    &:focus {
      @include box-shadow-focus;
    }

    // active state
    &:active {
      background: $dark-color;
      color: $text-color;
      border-color: $dark-color;
      // transform: perspective(50em) rotateX(8deg) scale(1); // more subtle 3d effect

      // partially hide gradient fill to allow darker background color to show through
      &:after {
        opacity: 0.625;
      }
    }
  }

  // OG button
  .button {
    @include button-base;
  }

  // inverted
  .button-inverted {
    @include button-base($white, $white, $light-1, $brand-color);
    @include box-shadow;
  }
</style>
