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
	<div class="main-nav-container">
		<nav class="main-nav" role="navigation">
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
	.main-nav-container {
		top: 0;
		z-index: 11;
		margin-bottom: 0;
		background-color: $brand-black;

		// background color
		@media (min-width: $s) {
			background-color: $white;
		}

		// fixed nav on bigger screens
		@include bp-fixed-nav {
			@include box-shadow($shadow);
			position: fixed;
			left: 0;
			right: 0;

			& + .main {
				margin-top: $nav-height;
			}
		}
	}


	////////////////////////////////////////////
	// main nav element
	////////////////////////////////////////////

	// positioning
	.main-nav {
		height: $nav-height;
		display: flex;

		// layout adjustments on bigger screens
		@media (min-width: $m) {
			// max-width: $max-main-width;
		}

		// offset nav-link padding on 3 column layout
		@media (min-width: $l) {
			padding-left: 0.5rem;
		}
	}

	// base style for nav elements
	.main-nav * {
		@include body-semibold-font;
		@include font-smoothing;
		font-size: $epsilon;
		text-transform: uppercase;
		text-decoration: none;
		color: $gray;
	}


	////////////////////////////////////////////
	// main nav list
	////////////////////////////////////////////

	.main-nav-list {
		// small screens
		@media (max-width: $s - 0.001) {
			@include dropdown-hidden;
			@include box-shadow-lg;
			// max-width: $sidebar-width;
			display: flex;
			flex-direction: column;
			max-height: $nav-height;
			z-index: -1;

			&.is-collapsed .main-nav-link {
				display: none;
			}

			// expanded menu state
			&.is-expanded {
				@include dropdown-visible;
				@include absolute-expand;
				background-color: rgba($brand-black, 0.95);
				backdrop-filter: blur(4px);
				position: fixed;
				max-height: 100%;
				z-index: 30;
				transition:
					opacity $timing,
					transform $timing;
			}
		}

		// centered between logo and right screen edge
		@media (min-width: $s) {
			margin-left: auto;
			margin-right: auto;
		}
		// right aligned
		@media (min-width: $l) {
			margin-right: $gutter;
		}

		@media (max-height: $xxs - 0.001) {
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

		@media (max-width: $s - 0.001) {
			flex: 1 1 auto;
			display: flex;

			&:last-of-type {
				border-radius: 0 0 $radius-lg $radius-lg;
			}
		}

		// large screen style
		@media (min-width: $s) {
			width: auto;
			display: block;
			background-color: $white;
		}

		@media (max-height: $xxs - 0.001) {
			flex-basis: 50%;
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

		@media (max-width: $s - 0.001) {
			font-size: calc(2vh + #{$milli});
			padding: 0.25em $gutter * 2;

			&:focus {
				outline-offset: -2px;
			}
		}

		// extra padding where screen real estate allows
		@media (min-width: $s) {
			padding: 0 0.75em;
			line-height: $nav-height; // vertically center
			font-size: $epsilon;

			// interactions
			&:not(.is-active) {
				@include fancy-nav-hover;
			}
		}
		@media (min-width: $m) {
			padding: 0 calc(0.5em + 1vw);
		}

		// active page
		&.is-active {
			color: $dark-2;
		}
	}


	////////////////////////////////////////////
	// skip link
	////////////////////////////////////////////

	.skip-link {
		top: $nav-height + 0.13rem; // position under nav bar
		z-index: 8;
		transform: translateX(-100%);

		@media (min-width: $l) {
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
