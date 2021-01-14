<static-query>
	query Colophon {
		d: colophon(id: "1") {
			content
		}
	}
</static-query>

<script>
	import site from "../../content/site.json";

	export default {
		name: "HomeHero",
		props: {
			headline: { default: "Hello!" },
			classes:  { default: null },
			img:      { default: "/images/jamesatar.jpg" },
			img2x:    { default: "/images/jamesatar@2x.jpg" }
		},
		data() {
			return {
				site,
				faceClicked: false
			}
		},
		methods: {
			onFaceClick: function() {
				if (!this.faceClicked) alert("Hey, that's not very nice 😬");
				this.faceClicked++;
				if (this.faceClicked === 10) alert("Stahp! 😫");
				if (this.faceClicked >= 20) alert("kbye 👋");
			}
		}
	};
</script>


<template>
	<div class="home-hero brand-theme">
		<!-- my face -->
		<div class="home-hero-avatar">
			<img
				class="home-hero-avatar-img"
				:class="faceClicked ? 'is-clicked' : ''"
				:src="img"
				:srcset="`${img} 1x, ${img2x} 2x`"
				alt="😬"
				draggable="false"
				aria-hidden
				title=" ...is there something on my face? 😬"
				@click="onFaceClick"
				:style="faceClicked ? `
					transform: scale(${ 1 - (faceClicked * 0.05) });
					opacity: ${ 1 - (faceClicked * 0.03) };
				` : null"
			/>
		</div>

		<!-- name & bio -->
		<h1 class="home-hero-headline">
			{{ headline }}
		</h1>

		<!-- bio -->
		<div
			class="home-hero-bio"
			v-html="$static.d.content"
		/>
	</div>
</template>


<style lang="scss">

	.home-hero-avatar {
		margin-bottom: $gutter; // non-grid fallback

		@media (min-width: $bp-md) {
			width: rem(160);
		}
	}
	.home-hero-avatar-img {
		border-radius: 50%;
		overflow: hidden;
		width: 100%;
		height: 100%;
		cursor: not-allowed;
		transition: transform 0.2s cubic-bezier(0, 0.25, 0.6, 4);
	}

	.home-hero-bio > p {
		margin-bottom: 0.625em;

		@media (min-width: $bp-md) {
			font-size: $font-xl;
			line-height: 1.333;
			margin-bottom: 0.666em;
		}
	}

	////////////////////////////////
	// layout
	////////////////////////////////

	.home-hero {
		@include hero-base;

		@supports (display: grid) {
			align-items: normal; // prevent headline & bio from distributing themselves vertically 

			.home-hero-avatar {
				grid-column: 1 / 7;
				margin: auto 0 auto auto;
			}

			.home-hero-headline {
				grid-column: 7 / 13;
				margin: auto auto ($gutter / 2) 0;
			}

			.home-hero-bio {
				grid-column: 1 / 13;
			}

			@media (min-width: $bp-xs) {
				.home-hero-bio {
					grid-column: 2 / 12;
				}
			}

			@media (min-width: $bp-sm) {
				.home-hero-avatar {
					grid-column: 1 / 4;
					grid-row: 1 / span 2;
				}

				.home-hero-headline,
				.home-hero-bio {
					grid-column: 4 / 12;
				}
			}
		}
	}

</style>
