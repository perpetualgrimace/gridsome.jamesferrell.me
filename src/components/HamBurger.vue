<script>
	export default {
		name: "HamBurger",
		props: {
			onClick: { type: Function },
			menuOpen: { default: false }
		}
	}
</script>


<template>
	<a
		class="hamburger u-hide-above-s"
		:class="menuOpen ? 'is-active' : 'is-inactive'"
		@click="onClick($event)"
		data-nav="toggle"
		href="#footer-nav"
	>
		<span class="hamburger-text">menu</span>
		<div class="hamburger-icon" :class="menuOpen ? 'is-active' : 'is-inactive'">
			<span class="hamburger-icon-bun hamburger-icon-bun-top" />
			<span class="hamburger-icon-bun hamburger-icon-bun-patty" />
			<span class="hamburger-icon-bun hamburger-icon-bun-bottom" />
		</div>
	</a>
</template>


<style lang="scss">
	// nav toggle button container
	.hamburger {
		// positioning
		@include absolute-vertical-center;
		right: $gutter;
		padding: 0 10px 0 9px; // somewhat fudged
		line-height: 30px;
		height: 30px;
		max-width: 10rem;
		z-index: 1; // position above logo on tiny viewports

		// menu toggle text
		.hamburger-text {
			font-size: 18px; // set in pixels like the icon and links
			color: inherit;
		}

		// click me
		&.is-inactive {
			transition-property: color; // override default link style

			&:hover, &:focus {
				.hamburger-icon {
					transform: scale(1.125);
				}
			}
		}

		// nav-toggle active state
		&.is-active {
			// sized to menu item height
			width: calc(100vh / 7);
			height: calc(100vh / 7);
			padding: 0;
			// absolutely position, then offset in a way that's transitionable
			position: absolute;
			top: -$gutter;
			right: -$gutter;
			transform: translate(-$gutter, $gutter);
			// centered X
			display: flex;
			background-color: transparent;
			border-radius: $radius-lg $radius-lg 0 0;
			box-shadow: none;
			z-index: 31;

			@media (max-height: $bp-xxxs - 0.001) {
				right: 0;
				top: 0;
			}

			&:focus {
				outline-offset: 2px;
			}

			.hamburger-text {
				@include visually-hidden;
				color: transparent;
			}

			.hamburger-icon {
				margin: auto;
				width: 1rem;
				height: 1rem;
				transform: scale(1.5) rotate(-90deg) translateX(0.375em); // frickin' fudged
			}
		}

		&:hover *, 
		&:focus * {
			color: $brand-color;
		}
	}

	// hamburger icon container
	.hamburger-icon {
		display: inline-block;
		margin-left: 0.4rem;
		transition: transform $duration-sm;
	}

	// hamburger initial state
	.hamburger-icon-bun {
		display: block;
		width: 16px;
		height: 2px;
		border-radius: 1px;
		background-color: currentColor;
		transition: transform $duration-sm;

		// stacked buns
		& + & {
			margin-top: 3px;
		}
	}

	// hamburger active state
	.hamburger-icon.is-active {
		transform: translateX(5px);

		.hamburger-icon-bun-top {
			transform: rotateZ(45deg) translateY(7px);
		}
		.hamburger-icon-bun-patty {
			opacity: 0;
		}
		.hamburger-icon-bun-bottom {
			transform: rotateZ(-45deg) translateY(-7px);
		}
	}
</style>
