<script>
	export default {
		name: "SocialLink",
		props: {
			social: { type: Object }
		}
	};
</script>


<template>
	<li class="social-item">
		<a :href="social.link" :class="`social-link social-link-${social.name} u-uppercase u-font-sm`">
			<span class="social-icon">
				<img class="social-svg" :src="`/images/icons/social/${social.name}.svg`" alt="">
			</span>
			<span class="social-text">{{ social.name }}</span>
		</a>
	</li>
</template>


<style lang="scss">
	// default styles
	.social-link {
		color: $brand-color;
		text-decoration: none;

		@supports (text-decoration-color: currentColor) {
			text-decoration: underline;
			text-decoration-color: $black;
		}

		// interactions
		&:hover, &:focus {
			color: $brand-light;

			.social-text {
				text-decoration: underline;
			}
		}
	}

	// icon style and placement
	.social-icon {
		@include brand-color-depth;
		// alignment
		display: inline-block;
		vertical-align: middle;
		top: -2px; // fudge the icon up
		width: 1rem;
		height: 1rem;
		margin-right: 0.625em;
		// aesthetic
		border-radius: $radius-md;

		@media (min-width: $bp-xl) {
			top: -1px; // still more fudging
		}
	}

</style>
