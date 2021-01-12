<script>
	import site from "../../content/site.json";

	export default {
		name: "MainLogo",
		props: {
			img: { default: "/images/icons/jf-icon.png" },
			img2x: { default: "/images/icons/jf-icon@2x.png" },
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
			<img class="main-logo-icon-img"
				:src="img"
				:srcset="`${img} 1x, ${img2x} 2x`"
				sizes="100vw"
				alt=" JF"
			/>
		</span>

		<span class="main-logo-text subhead">
			{{ site.title }}
		</span>
		<span class="u-visually-hidden"> home</span>

	</g-link>
</template>


<style lang="scss">
	// the link
	.main-logo {
		// sizing
		display: block;
		height: $nav-height;
		max-width: $logo-width;
		flex: 1 1 $logo-width;
		padding-left: 2rem;
		line-height: $nav-height;
		// theming
		background: $black;

		// override default
		& .main-logo-text {
			font-size: 18px;
			color: $white;

			@media (min-width: $bp-sm) {
				top: -1px;
			}
		}


		// big screen layout
		@media (min-width: $bp-lg) {
			// pin to top left
			left: -0.5rem;

			// interactions
			&:hover, &:focus {
				background-color: lighten($black, 1);
			}
		}

		// fudge vertical alignment on big screens
		& > * {
			transform: translateY(-1px);
		}
	}

	// the icon
	.main-logo-icon {
		@include brand-color-depth;
		// sizing
		width: $logo-icon-size;
		height: $logo-icon-size;
		// positioning
		display: inline-block;
		margin-right: 6px;
		vertical-align: middle;
		// theming
		border-radius: $radius-md;
		top: -0.125rem;
	}

	// tweakpoint to hide text
	@media (max-width: 16em - 0.001) {
		.main-logo-text {
			@include visually-hidden;
		}
	}

	// alt text treatment
	.main-logo-icon-img {
		// typography / sizing (fudged)
		@include body-semibold-font;
		font-size: 26px;
		letter-spacing: -2px;
		line-height: 1.1;
		// theming
		color: $white;

		// account for the broken image icon in newish chrome (fudged)
		@supports (-webkit-appearance:none) {
			&:not([src]) {
				top: -16px;
			}
		}
	}
</style>
