<script>
	export default {
		name: "Sidebar",
		props: {
			content:  { default: null },
			heading:  { default: null },
			text:     { default: null },
			link:     { default: null },
			linkText: { default: null },

			downloadHeading:  { default: null },
			downloadText:     { default: null },
			downloadLink:     { default: null },
			downloadLinkText: { default: null }
		}
	};
</script>


<template>
	<!-- use main markdown content as sidebar -->
	<aside class="content secondary u-font-sm" v-html="content" v-if="content" />

	<!-- construct sidebar from individual props -->
	<aside class="content secondary u-font-sm" v-else-if="heading && text">
		<h2>{{ heading }}</h2>
		<p>{{ text }}</p>

		<p class="u-margin-top-sm" v-if="link">
			<a class="link-arrow" :href="link" v-if="link && link.includes('http')">
				{{ linkText || link }}
			</a>
			<g-link class="link-arrow" :to="link" v-else-if="link">
				{{ linkText || link }}
			</g-link>
		</p>

		<!-- download link -->
		<h2 v-if="downloadHeading">
			{{ downloadHeading }}
		</h2>
		<p v-if="downloadText">
			{{ downloadText }}
		</p>
		<p class="u-margin-top-sm" v-if="downloadLink">
			<a class="link-arrow-download" :href="downloadLink" download>
				{{ downloadLinkText || downloadLink }}
			</a>
		</p>
	</aside>
</template>


<style lang="scss">
	.secondary {
		// style secondary content like primary content, add visual separator
		@media (max-width: $bp-sm - 0.001) {
			// compensate for _layout.scss's .section + .section margin-top reset
			padding-top: 2.5rem;

			// visual separator
			&:before {
				@include pseudo;
				@include hr;
				position: absolute;
				top: 0.5rem;
			}

			// bump up text sizes to primary
			h2 {
				font-size: $font-xl;
			}
			p:not([class*="card-"]) { // exclude card meta
				font-size: $font-md;
			}
		}

		@media (min-width: $bp-sm) {
			line-height: 1.25;

			& + p {
				margin-top: 0.625em;
			}
		}
	}
</style>
