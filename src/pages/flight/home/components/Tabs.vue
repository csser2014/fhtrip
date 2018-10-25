<template>
	<div class="home-tabs">
		<div class="tabs-bar">
			<ul class="tabs-bar-nav">
				<li class="tabs-tab" v-for="item in tabList" @click="changeTab(item)" :key="item.index" :class="[tabIndex == item.index ? 'tabs-active' : '']">
					<span>{{ item.name }}</span>
				</li>
			</ul>
		</div>
		<div class="tabs-content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HomeTabs',
	props: {
		tabList: Array,
		tabIndex: Number
	},
	methods: {
		changeTab (tab) {
			this.$emit('changeTab', tab)
		}
	}
}
</script>

<style lang="stylus" scoped>
	.tabs-bar
		line-height:1rem
		width: 100%
	.tabs-bar-nav
		display:flex
		box-shadow: 0 1px 5px 1px rgba(0,0,0,0.1)
	.tabs-tab
		flex:1
		text-align:center
		span
			color:#666
			font-size: .3rem
	.tabs-active
		span
			border-bottom: .04rem solid #48B28D
			color: #48B28D
			width: .8rem
			padding-bottom:.3rem
			white-space:nowrap
</style>
