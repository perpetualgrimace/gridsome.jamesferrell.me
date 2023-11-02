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
  <div>
    <h2 class="project-iframe-url">{{ baseUrl }}</h2>
    <button
      class="button project-iframe-fullscreen-button"
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

<style lang="scss"></style>
