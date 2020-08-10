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
		name: 'Footer',
		components: {
			SocialLink
		},
		data () {
			return {
				site
			}
		}
	}
</script>


<template>
	<footer class="footer brand-theme">

		<div class="footer-container g-container">
			<div class="footer-nav g-columns">
				<ul class="footer-nav-list g-col g-6" id="footer-nav">
					<li class="footer-nav-item" v-for="nav in site.mainNav">
						<g-link :to="nav.link" class="footer-nav-link" active-class="is-active" exact-active-class="is-active">
							{{ nav.title }}
						</g-link>
					</li>

					<li class="footer-nav-break" aria-hidden />

					<li class="footer-nav-item" v-for="social in site.socialAccounts">
						<SocialLink  :social="social" :key="social.name" />
					</li>
				</ul>
				<div class="footer-copyright epsilon g-col g-6" role="contentinfo" v-html="$static.d.content" />
			</div>
		</div>
	</footer>
</template>


<style lang="scss">
	.footer {
		@include radial-gloss;
		background-color: $brand-black !important;
		// box-shadow: inset 0 1rem 2rem -1rem $shadow-dark;
		z-index: 1;
	}

	.footer-container.g-container {
		max-width: 100%;
	}

	.footer-nav-list {
		@media (min-width: $s) {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
		}
	}

	.footer-nav-item + .footer-nav-item {
		@media (max-width: $s - 0.001) {
			border-top: 2px solid rgba($white, 0.125);
		}
	}

	// footer links
	.footer-nav-link, 
	.social-link {
		@include body-semibold-font;
		@include font-smoothing;
		padding: 0.5rem;
		text-transform: uppercase;
		text-decoration: none;
		font-size: $epsilon;
		color: $gray;

		// active page link
		&.is-active {
			color: $light-1;
		}

		// interactions
		&:hover, &:active, &:focus {
			color: $white;
			text-decoration: underline;
		}

		@media (max-width: $s - 0.001) {
			display: block;
			// offset padding
			margin-left: -0.5em;
			margin-right: -0.5em;
			transform-origin: left center;

			&:hover, &:focus {
				color: $white;
				transform: scale(1.075);
			}
		}
	}

	.footer-nav-break {
		width: 100%;
		height: 0.5em;
	}

	.footer-copyright {
		@media (min-width: $s) and (max-width: $l - 0.001) {
			text-align: center;
			margin-top: -0.5em !important;
		}
	}

	.footer-copyright p + p {
		margin-top: 0.5em;
	}
</style>
