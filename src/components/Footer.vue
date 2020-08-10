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
	<footer class="footer dark-theme">

		<div class="g-container">
			<div class="footer-nav g-columns milli">
				<ul class="footer-nav-list g-col g-4" id="footer-nav">
					<li class="footer-nav-item" v-for="nav in site.mainNav">
						<g-link :to="nav.link" class="footer-nav-link" active-class="is-active" exact-active-class="is-active">
							{{ nav.title }}
						</g-link>
					</li>
				</ul>
				<ul class="footer-social-list g-col g-4">
					<SocialLink v-for="social in site.socialAccounts" :social="social" :key="social.name" />
				</ul>
				<div class="footer-copyright epsilon g-col g-4" role="contentinfo" v-html="$static.d.content" />
			</div>
		</div>
	</footer>
</template>


<style lang="scss">
	.footer {
		@include radial-gloss;
		box-shadow: inset 0 1rem 2rem -1rem $shadow-dark;
		z-index: 1;
	}

	// footer links
	.footer-nav-link {
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
	}
</style>
