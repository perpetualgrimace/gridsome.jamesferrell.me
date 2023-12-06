<static-query>
	query Footer {
		d: footer(id: "1") {
			content
		}
	}
</static-query>

<script>
import site from "../../content/site.json";
import SocialLink from "./SocialLink";

export default {
  name: "Footer",
  components: {
    SocialLink,
  },
  data() {
    return {
      site,
    };
  },
};
</script>

<template>
  <footer class="footer">
    <!-- nav -->
    <ul class="footer-nav-list" id="footer-nav">
      <li class="footer-nav-item">
        <g-link
          to="/"
          class="footer-nav-link"
          exact-active-class="is-active"
        >
          home
        </g-link>
      </li>
      <li class="footer-nav-item" v-for="nav in site.mainNav">
        <g-link
          :to="nav.link"
          class="footer-nav-link"
          active-class="is-active"
          exact-active-class="is-active"
        >
          {{ nav.title }}
        </g-link>
      </li>
    </ul>

    <!-- social -->
    <div class="footer-social-wrapper">
      <ul class="footer-social-list">
        <li
          class="footer-social-item"
          v-for="social in site.socialAccounts"
        >
          <SocialLink :social="social" :key="social.name" />
        </li>
      </ul>
    </div>

    <!-- copyright, etc. -->
    <div
      class="footer-copyright"
      role="contentinfo"
      v-html="$static.d.content"
    />
  </footer>
</template>

<style lang="scss">
.footer {
  @include layout-wrapper;
  // fallback layout
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  // positioning
  margin-top: $gutter * 1.5;
  padding-top: $gutter;
  z-index: 1; // in front of paginator

  @media (min-width: $bp-sm) {
    margin-top: $gutter * 2;
    padding-top: $gutter * 1.25;
  }
  @media (min-width: $bp-md) {
    margin-top: $gutter * 3;
    padding-top: $gutter * 1.75;
  }
  @media (min-width: $bp-lg) {
    margin-top: $gutter * 4;
    padding-top: $gutter * 2.25;
  }

  @media (max-width: $bp-sm - 0.001) {
    padding-bottom: 0;
  }
  @media (min-width: $bp-sm) and (max-width: $bp-lg) {
    padding-bottom: $gutter / 2;
  }

  // theming
  &:after {
    @include pseudo;
    @include absolute-horizontal-center;
    width: 100vw;
    bottom: 0;
    top: 0;
    z-index: -1;
    background-color: $light-1;

    @include dark-mode {
      color: $dark-1;
      background-color: $dark-3;
    }
  }

  &:before {
    @include pseudo;
    position: absolute;
    width: calc(100% - #{$gutter * 2});
    height: $border-width;

    // positioning
    top: -$border-width;

    // theming
    border-radius: $border-width;
    background-color: $light-2;

    @include dark-mode {
      background-color: $dark-2;
    }
  }

  & > * {
    margin-bottom: $gutter * 2;

    @media (max-width: $bp-xs - 0.001) {
      &:not(:last-child) {
        flex: 1 0 50%;
      }
      &.footer-social-wrapper {
        padding-left: $gutter;
      }
    }

    @media (min-width: $bp-xs) {
      flex: 1 1 25%;

      &.footer-social-wrapper {
        order: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }

      &.footer-copyright {
        display: flex;
        flex-direction: column;
        flex: 1 1 50%;
        order: 0;
      }
    }

    &.footer-copyright {
      @media (min-width: $bp-md) {
        text-align: center;

        & p:last-child {
          margin-top: auto;
          margin-bottom: 1px;
        }
      }

      @media (max-width: $bp-md - 0.001) {
        & p:last-child {
          top: 0.5em;
        }
      }
    }
  }
}

// prevent awkward hover seizure
.footer-nav-list:before {
  @include pseudo;
  position: absolute;
  top: 0;
  bottom: 0;
  left: -$gutter;
  width: $gutter;
  z-index: 1;
}

// footer links
.footer-nav-link {
  @include nav-link-base;
  @include nav-link-hover;
  display: inline-block;
  margin-left: -0.75em;
  transition: transform $duration-xs;

  &.is-active,
  &:hover,
  &:focus {
    transform: translateX(0.625em);
  }
}

.footer-copyright > p {
  font-size: $font-sm;
  line-height: 1.5;

  & + p {
    margin-top: 0.75em;
  }

  // big screen, big space
  @media (min-width: $bp-sm) {
    line-height: 1.875;

    & + p {
      margin-top: 1.25em;
    }
  }

  // don't click my face
  &:last-of-type {
    font-size: $font-xs;
  }
}
</style>
