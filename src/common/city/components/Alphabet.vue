<template>
	<ul class="list">
		<li class="item" v-for="(item, key) of cities" :key="key" @click="handleLetterClick">{{ item.start_char }}</li>
	</ul>
</template>

<script>
export default {
	name: 'CityAlphabet',
	props: {
		cities: Array
	},
	data () {
		return {
			alphabets: []
		}
	},
	methods: {
		handleLetterClick (e) {
			this.$emit('change', e.target.innerHTML)
		}
	}
}
</script>

<style lang="stylus" scoped>
	.list
		display: flex
		flex-direction: column
		justify-content: center
		position: absolute
		top: 1rem
		right:0
		bottom:0
		width: .8rem
		.item
			line-height: .43rem
			text-align:center
			font-size:.24rem
			color: #999
</style>
