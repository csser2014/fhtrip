<template>
	<div class="wrapper" ref="wrapper">
		<slot></slot>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
	name: 'BScroll',
	props: {
		click: {
			type: Boolean,
			default: true
		},
		data: {
			type: Array,
			default: () => []
		},
		isShow: {
			type: Boolean,
			default: false
		},
		probeType: {
			type: Number,
			default: 1
		}
	},
	mounted () {
		setTimeout(() => {
			this.initScroll()
		}, 20)
	},
	watch: {
		data () {
			setTimeout(() => {
				this.refresh()
			}, 20)
		},
		isShow () {
			setTimeout(() => {
				this.refresh()
			}, 20)
		}
	},
	methods: {
		initScroll () {
			if (!this.$refs.wrapper) {
				return
			}
			this.scroll = new BScroll(this.$refs.wrapper, {
				probeType: this.probeType,
				click: this.click
			})
		},
		refresh () {
			this.scroll && this.scroll.refresh()
		},
		scrollToElement () {
			this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
		}
	}
}
</script>

<style lang="stylus" scoped>
</style>
