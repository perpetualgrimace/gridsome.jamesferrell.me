<script>
export default {
  name: "ProjectIframeHeader",
  props: {
    onToggleFullscreen: { type: Function },
    isFullscreen: { default: false },
    baseUrl: { default: null },
  },
};
</script>

<template>
  <div class="project-iframe-header">
    <h2 class="project-iframe-url u-font-sm">{{ baseUrl }}</h2>
    <button
      class="project-iframe-fullscreen-button u-font-xs"
      @click="onToggleFullscreen($event)"
      :aria-pressed="isFullscreen || 'false'"
    >
      toggle fullscreen
      <img
        class="social-svg"
        :src="
          `/images/icons/ui/${
            isFullscreen ? 'fullscreen-collapse' : 'fullscreen-expand'
          }.svg`
        "
        alt=""
      />
    </button>
  </div>
</template>

<style lang="scss">
.project-iframe-header {
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  display: flex;
  justify-content: space-between;
  height: 1.1rem;
  padding-left: $radius-sm;
  padding-right: $radius-sm;
  overflow: hidden;
  background-color: $dark-3;
  border: 1px solid $black;
  border-radius: $radius-md;
}
.project-iframe-url {
  @include body-font;
  margin-right: $gutter;
  top: 1px;
}
.project-iframe-fullscreen-button {
  display: flex;
  align-items: center;
  opacity: 0.666;
  transition: opacity $duration-xs ease-out;

  &:hover,
  &:focus {
    opacity: 1;
  }

  img {
    margin-left: 0.5em;
  }
}
</style>
