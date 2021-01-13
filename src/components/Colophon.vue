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
		name: "Colophon",
		props: {
			headline: { default: site.title },
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
	<div class="colophon brand-theme" :class="classes">
		<div class="colophon-inner">

			<!-- my face -->
			<div class="colophon-avatar">
				<div class="colophon-avatar-inner">
					<img
						class="colophon-avatar-img"
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
			</div>

			<!-- name & bio -->
			<div class="colophon-caption">
				<!-- hidden h1 (home page) -->
				<h1 class="u-visually-hidden" v-if="headline !== site.title">
					{{ headline }}
				</h1>
				<!-- name -->
				<span class="colophon-caption-name subhead" v-else>
					{{ headline }}
				</span>

				<!-- bio -->
				<div
					class="colophon-caption-bio"
					:class="headline === site.title && 'u-font-sm'"
					v-html="$static.d.content"
				/>
			</div>
		</div>
	</div>
</template>


<style lang="scss">

	.colophon {
		@include hero-radius;
	}
	
	// add padding to inner container
	.colophon-inner {
		display: flex;
		padding: $gutter;

		// face on top on small screens
		@media (max-width: $bp-xxs - 0.001) {
			flex-wrap: wrap;
		}

		// more padding
		@media (min-width: $bp-md) {
			padding: rem(30) rem(40);
		}
	}

	.colophon-caption-bio > p {
		@include sidebar-paragraph-spacing;
	}


	////////////////////////////////
	// layout
	////////////////////////////////

	// display avatar and caption inline and vertically center
	// avatar sizing
	.colophon-avatar {
		min-width: calc(#{rem(100)});

		@media (max-width: $bp-xxs - 0.001) {
			margin: -0.5em auto 1.5em auto;
			min-width: calc(#{rem(200)});
		}

		@media (min-width: $bp-xxs) {
			margin-top: auto;
			margin-bottom: auto;
		}

		// bigger avatar on bigger screens
		@media (min-width: $bp-lg) {
			min-width: calc(#{rem(160)});
		}
	}

	.colophon-avatar-inner {
		// animation: popIn $duration-lg 0.45s; // page transition duration + delay

		@media (min-width: $bp-xxs) {
			padding-right: 1em;
		}
		@media (min-width: $bp-lg) {
			padding-right: 2em;
		}
	}

	.colophon-avatar-img {
		border-radius: 50%;
		overflow: hidden;
		width: 100%;
		height: 100%;
		// initial placeholder state
		font-size: rem(58);

		@media (min-width: $bp-lg) {
			font-size: rem(80);
			transform: scale(1.125);
		}

		&:not(.is-clicked):hover {
			cursor: pointer;
			animation: pulse 2s 1s;
		}
		&.is-clicked {
			cursor: not-allowed;
			transition: transform 0.2s cubic-bezier(0, 0.25, 0.6, 4);
		}
	}

	// caption sizing
	.colophon-caption {
	}

	// JAMES FERRELL positioning
	.colophon-caption-name {
		display: inline-block; // needed to make span use margin
		margin-bottom: 0.25em;
	}


	////////////////////////////////////
	// contextual adjustments
	////////////////////////////////////

	// let it breathe
	* + .colophon {
		margin-top: 2rem;
	}
</style>
