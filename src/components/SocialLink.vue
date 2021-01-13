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
		@include nav-link-base;

		// custom colors
		@each $color, $hex in $socialColors {
			&[href*="#{$color}"] {
				&:hover, &:focus {
					color: $hex;
				}
			}
		}

		// icons inherit custom color
		&:hover, &:focus {
			.social-icon {
				background-color: currentColor;
				transform: scale(1.125);
			}
		}
	}

	// icon style and placement
	.social-icon {
		// alignment
		display: inline-block;
		vertical-align: middle;
		top: -2px; // fudge the icon up
		width: 1rem;
		height: 1rem;
		margin-right: 0.375em;
		// theming
		background-color: $dark-1;
		border-radius: $radius-sm;
		transition: transform $duration-xs;
	}

</style>
