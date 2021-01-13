<script>
	import site from "../../content/site.json";
	import HamBurger from "./HamBurger";
	import MainLogo from "./MainLogo";

	export default {
		name: "MainNav",
		components: {
			HamBurger,
			MainLogo
		},
		data() {
			return {
				site,
				menuOpen: false
			}
		},
		methods: {
			toggleMenu: function(e) {
				if (e) e.preventDefault();
				this.menuOpen = !this.menuOpen;
			}
		}
	};
</script>


<template>
	<div class="main-nav">
		<nav class="main-nav-inner" role="navigation">
			<!-- skip link -->
			<a class="button-inverted skip-link u-visually-hidden" href="#main">Skip to content</a>

			<MainLogo :tabbable="!menuOpen" />
			
			<!-- nav menu toggle for small screens -->
			<HamBurger :onClick="toggleMenu" :menuOpen="menuOpen" />


			<!-- main nav -->
			<ul id="nav" class="main-nav-list" :class="menuOpen ? 'is-expanded' : 'is-collapsed'">
				<li class="main-nav-item u-hide-above-s">
					<g-link to="/" class="main-nav-link" exact-active-class="is-active">
						home
					</g-link>
				</li>
				<li class="main-nav-item" v-for="nav in site.mainNav">
					<g-link :to="nav.link" class="main-nav-link" active-class="is-active" exact-active-class="is-active">
						{{ nav.title }}
					</g-link>
				</li>
			</ul>
		</nav>
	</div>
</template>


<style lang="scss">

	// default positioning and theming
	.main-nav {
		top: 0;
		z-index: 11;
		margin-bottom: 0;

		// fixed nav on bigger screens
		@include bp-fixed-nav {
			position: fixed;
			left: 0;
			right: 0;
			// theming
			background-color: rgba($light-1, 0.95); // fallback
			background: linear-gradient(to bottom, $light-1, rgba($light-1, 0.9));

			// glass edge
			&:after {
				@include pseudo;
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				height: 1px;
				background-color: $light-1;
			}

			// offset fixed nav height
			& + .main {
				margin-top: $nav-height;
			}
		}
	}


	////////////////////////////////////////////
	// main nav element
	////////////////////////////////////////////

	// positioning
	.main-nav-inner {
		@include layout-wrapper(0, $inner-width);
		height: $nav-height;
		display: flex;
	}

	// base style for nav elements
	.main-nav * {
		@include nav-link-base;
	}


	////////////////////////////////////////////
	// main nav list
	////////////////////////////////////////////

	.main-nav-list {
		// small screens
		@media (max-width: $bp-sm - 0.001) {
			@include dropdown-hidden;
			@include box-shadow-lg;
			// max-width: $sidebar-width;
			display: flex;
			flex-direction: column;
			max-height: $nav-height;
			z-index: -1;

			&.is-collapsed .main-nav-link {
				@include visually-hidden;
			}

			// expanded menu state
			&.is-expanded {
				@include dropdown-visible;
				@include absolute-expand;
				background-color: rgba($black, 0.95);
				backdrop-filter: blur(4px);
				position: fixed;
				max-height: 100%;
				z-index: 30;
				transition:
					opacity $duration-sm,
					transform $duration-sm;
			}
		}

		// right aligned
		@media (min-width: $bp-sm) {
			margin-left: auto;
			margin-right: $gutter;
		}

		@media (max-height: $bp-xxxs - 0.001) {
			flex-direction: row;
			flex-wrap: wrap;
		}
	}


	////////////////////////////////////////////
	// main nav items
	////////////////////////////////////////////

	// nav items
	.main-nav-item {
		width: 100%;
		height: auto;
		float: left;

		// small screens
		@media (max-width: $bp-sm - 0.001) {
			flex: 1 1 auto;
			display: flex;
		}
		@media (max-height: $bp-xxxs - 0.001) {
			flex-basis: 50%;
		}

		// big screens
		@media (min-width: $bp-sm) {
			width: auto;
			display: block;

			&:not(:last-of-type) {
				margin-right: 2px;
			}
			&:last-of-type {
				margin-right: -0.75em; // offset link padding
			}
		}
	}


	////////////////////////////////////////////
	// main nav links
	////////////////////////////////////////////

	// nav links
	.main-nav-link {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 1 1 100%;
		width: 100%;
		z-index: 1;
		overflow: hidden;

		// small screens
		@media (max-width: $bp-sm - 0.001) {
			font-size: calc(2vh + #{$font-xs});
			padding: 0.25em $gutter * 2;

			&:hover, &:focus {
				color: $white;
			}

			&:focus {
				outline-offset: -2px;
			}
		}

		// big screens
		@media (min-width: $bp-sm) {
			@include nav-link-hover;
			line-height: $nav-height; // vertically center
			font-size: $font-sm;
		}
	}


	////////////////////////////////////////////
	// skip link
	////////////////////////////////////////////

	.skip-link {
		top: $nav-height + 0.13rem; // position under nav bar
		z-index: 8;
		transform: translateX(-100%);

		@media (min-width: $bp-lg) {
			left: 1.5rem;
		}

		// focus
		&:focus {
			clip: auto;
			height: auto;
			width: auto;
			transform: none;
		}
	}
</style>
