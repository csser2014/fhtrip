<template>
	<ul class="tab-bottom">
		<li class="throught">
			<span></span>
			<p>只看直飞</p>
		</li>
		<li class="allday" @click="handleEvent('time')">
			<span></span>
			<p>从早到晚</p>
		</li>
		<li class="order_price" @click="handleEvent('price')">
			<span></span>
			<p>按价格排序</p>
		</li>
	</ul>
</template>

<script>
export default {
	name: 'TabBottom',
	props: {
		dataList: Array
	},
	methods: {
		handleEvent (type) {
			this.$emit('change', type)
		}
	}
}
</script>

<style lang="stylus" scoped>
	.tab-bottom
		background:#fff
		display:flex
		height: 1.2rem
		border-top:1px solid #f0f0f0
		position: fixed
		bottom:0
		left:0
		width:100%
		text-align:center
		li
			flex: 1
			padding-top: .25rem
			p
				color:#999
				font-size: .2rem
				-webkit-transform: scale(calc(10 / 12))
				transform: scale(calc(10 / 12))
				margin-top: .05rem
			&.filter
				span
					background-image: url('../../../../assets/images/ic_bijia_shaixuan.png')
					background-size: .36rem .36rem
					display:inline-block
					width: .36rem
					height: .36rem
			&.throught
				span
					background-image: url('../../../../assets/images/ic_bijia_zhifei.png')
					background-size: .4rem .4rem
					display:inline-block
					width: .4rem
					height: .4rem
			&.allday
				span
					background-image: url('../../../../assets/images/ic_bijia_time.png')
					background-size: .36rem .36rem
					display:inline-block
					width: .36rem
					height: .36rem
			&.order_price
				span
					background-image: url('../../../../assets/images/ic_bijia_jiage.png')
					background-size: .36rem .36rem
					display:inline-block
					width: .36rem
					height: .36rem
</style>
