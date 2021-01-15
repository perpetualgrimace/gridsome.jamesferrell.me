<script>
	import site from "../../content/site.json";
	import LogoIcon from "~/svg/LogoIcon.svg";

	export default {
		name: "MainLogo",
		components: {
			LogoIcon
		},
		props: {
			tabbable: { default: true }
		},
		data () {
			return {
				site
			}
		}
	};
</script>


<template>
	<g-link to="/" class="main-logo" active-class="" exact-active-class="is-active" :tabindex="tabbable ? null : '-1'">

		<span class="main-logo-icon">
			<LogoIcon />
		</span>

		<span class="main-logo-text u-font-md">
			{{ site.title }}
		</span>
		<span class="u-visually-hidden"> home</span>

	</g-link>
</template>


<style lang="scss">
	// the link
	.main-logo {
		@include nav-link-base;
		// sizing
		display: block;
		height: $nav-height;
		max-width: $logo-width;
		flex: 1 1 $logo-width;
		padding-left: $gutter;
		line-height: $nav-height;

		// override default
		& .main-logo-text {
			@include body-semibold-font;
			color: $dark-1;

			@include dark-mode {
				color: $white;				
			}

			@media (min-width: $bp-sm) {
				top: -1px;
			}
		}

		// fudge vertical alignment on big screens
		& > * {
			transform: translateY(-1px);
		}
	}

	// the icon
	.main-logo-icon {
		// sizing
		width: $logo-icon-size;
		height: $logo-icon-size;
		// positioning
		display: inline-block;
		margin-right: 3px;
		vertical-align: middle;
		// theming
		background-color: $dark-2;
		color: $white;
		border-radius: $radius-sm;
		top: -0.125rem;
		transition: 
			color $duration-xs,
			background-color $duration-xs;

		// hover / current state
		.main-logo:hover &, .main-logo:focus & {
			background-color: $brand-light;
		}
		.main-logo.is-active & {
			background-color: $brand-color;
		}

		& > svg {
			vertical-align: top;

			& > path {
				fill: currentColor;
			}
		}
	}

	// tweakpoint to hide text
	@media (max-width: 16em - 0.001) {
		.main-logo-text {
			@include visually-hidden;
		}
	}
</style>
