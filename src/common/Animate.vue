<template>
	<transition>
		<slot></slot>
	</transition>
</template>

<script>
export default {
	name: 'SlideAnimate'
}
</script>

<style lang="stylus" scoped>
	.v-enter-active, .v-leave-active
		transition: all .2s
	.v-enter, .v-leave-to
		transform: translateX(100%)
</style>
