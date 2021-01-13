<script>
	import {Fragment} from "vue-fragment";
	import MainNav from "~/components/MainNav";
	import Footer from "~/components/Footer";

	export default {
		components: {
			Fragment, MainNav, Footer
		},
		props: {
			wrapperClass: { default: null, type: String },
			singleColumn: { default: false, type: Boolean }
		}
	}
</script>


<template>
	<Fragment>
		<MainNav />

		<transition name="transition-fade" appear>
			<main class="main u-padding-top-off" id="main">

				<slot name="hero" />

				<div class="content-wrapper" :class="wrapperClass ? `${wrapperClass}-content-wrapper` :  singleColumn ? 'single-column' : 'with-sidebar'">
					<div class="section primary-content">
						<slot />
					</div>

					<div class="section secondary-content" v-if="$slots.sidebar">
						<slot name="sidebar" />
					</div>					
				</div>

				<div class="section cta-content" v-if="$slots.cta">
					<slot name="cta" />
				</div>
			</main>
		</transition>

		<Footer />
	</Fragment>
</template>


<style lang="scss">

	.transition-fade-enter {
		opacity: 0;
		transform: translateY(10px);

		&-active {
			transition:
				opacity $duration-md,
				transform $duration-sm;

			// hide avatar when loading in
			& .colophon-avatar-inner {
				opacity: 0;
			}
		}
	}
</style>
