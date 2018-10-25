<template>
	<div class="detail">
		<div class="header">
			<div class="iconfont back-icon">&#xe63c;</div>
			<p class="title">即将带你进入{{ this.$route.query.channelName }}</p>
		</div>
		<div class="list-item">
			<div class="order-content">
				<ul class="order-list">
					<li>
						<span class="order-title">{{ this.$route.query.fromCityName }}-{{ this.$route.query.toCityName }}</span>
						<span class="order-info">
							<u>{{ this.$route.query.flightNos }}</u>
						</span>
					</li>
					<li>
						<span class="order-title">出发日期</span>
						<span class="order-info">
							<u>{{ this.$route.query.flightDate }}</u>
						</span>
					</li>
					<li>
						<span class="order-title">{{ this.$route.query.channelName }}</span>
						<span class="order-info">
							<em>￥{{ this.$route.query.price }}</em>
						</span>
					</li>
				</ul>
			</div>
		</div>
		<ul class="list-info">
			<li>
				<img src="../../../assets/images/logo-1.gif" alt="" class="a-img" />
				<p>完成机票比价</p>
			</li>
			<li class="a-loading">
				<span class="reach">即将带你进入{{ this.$route.query.channelName }}</span>
				<span><img src="../../../assets/images/loading.gif" alt="" class="loading" /></span>
			</li>
			<li>
				<img src="../../../assets/images/logo-2.gif" alt="" class="b-img" />
				<p>跳转机票预订</p>
			</li>
		</ul>
		<div class="explain">
			<p>您正在跳出比价佳旅行，并进入旅游产品提供商提供的网站。比价佳行对该旅游产品提供商提供的网站或资源不拥有任何控制权，就其因您对其使用而可能产生的任何损失或损害不承担任何责任。如有任何问题，请直接与相关的旅游产品提供商联系。</p>
		</div>
		<p class="source">数据来源：比价佳旅行</p>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'OneDetail',
	methods: {
		jumpLink () {
			setTimeout(() => {
				window.location.href = this.default_link
			}, 5000)
		}
	},
	computed: {
		...mapState(['default_link'])
	},
	mounted () {
		this.jumpLink()
	}
}
</script>

<style lang="stylus" scoped>
	.detail
		position: fixed
		width: 100%
		height: 100%
		top: 0px
		background-color:#f0f0f0
	.header
		height: 1rem
		background: #fff
		position: relative
		.back-icon
			position: absolute
			left: 0.28rem
			top: 0.32rem
			color: #000
			font-size: 0.48rem
		.title
			font-size: .3rem
			color:#333
			text-align:center
			line-height: 1rem
			font-weight:bold
	.list-item
		padding-left: .3rem
		border-top: 4px solid #f2f2f2
		background:#fff
		.list-header
			font-size: .2rem
			line-height: .9rem
			overflow:hidden
			border-bottom: 1px solid #f0f0f0
			.title
				float:left
				color:#333
				font-size: .24rem
				span
					border-left: .06rem solid #48B28D
					padding-left: .12rem
			.punctuality
				float:right
				margin-right: .3rem
		.list-content
			height: 1.5rem
			margin-right: .3rem
			.top
				position:relative
				margin-top: .3rem
				height: .8rem
				line-height: .8rem
				font-size: .4rem
				color:#333
				font-weight: bold
				overflow:hidden
				.s-time
					margin-left: .5rem
				.air-plane, .air-time
					position:absolute
					font-size: .2rem
					-webkit-transform: scale(calc(10 / 12))
					transform: scale(calc(10 / 12))
					color:#999
				.air-plane
					top: -.23rem
					left: 2.2rem
				.air-time
					top: .3rem
					left: 2.5rem
				.fly_to
					width: 2rem
					height: .1rem
					margin: 0 .5rem
				.e-time
					em
						color:#333
						font-size: .24rem
						font-weight: normal
				.price
					float:right
					color: #e8465a
			.middle
				color:#333
				font-size: .24rem
				height: .35rem
				line-height: .35rem
				position:relative
				.s-location, .e-location, .low-price
					position: absolute
					top: 0
				.s-location
					left: .3rem
				.e-location
					left: 4.5rem
				.low-price
					-webkit-transform: scale(calc(10 / 12))
					transform: scale(calc(10 / 12))
					font-size: .2rem
					border:1px solid #e8465a
					color: #e8465a
					padding: .05rem
					line-height: .25rem
					right: -.1rem
	ul
		li
			border-bottom: 1px solid #f0f0f0
			height: .96rem
			line-height: .96rem
			.order-title
				color:#333
				font-size: .3rem
				font-weight:bold
			.order-info
				float:right
				margin-right: .3rem
				b
					color:#bbb
					font-size:.24rem
				i, em
					color: #e8465a
				em
					font-size: .3rem
					margin: 0 .2rem 0 0
				i
					-webkit-transform: scale(calc(10 / 12))
					transform: scale(calc(10 / 12))
					font-size: .2rem
					border:1px solid #e8465a
					display:inline-block
					line-height:1
					padding: .05rem
				a
					height: .6rem
					line-height: .6rem
					width: 1.2rem
					color:#fff
					font-size: .28rem
					background: #48b28d
					border-radius: 2px
					text-align:center
					display:inline-block
	.list-info
		height: 2rem
		line-height: 2rem
		margin-top:.65rem
		margin-left:.75rem
		overflow:hidden
		li
			float:left
			width: 1.8rem
			height: 1rem
			line-height: 1
			text-align: center
			p
				margin-top: .25rem
				color:#333
				font-size: .28rem
			&.a-loading
				width: 3rem
				text-align:center
			.a-img, .b-img
				width: 1rem
				height: 1rem
			span
				display:block
				line-height: 2.5
				&.reach
					color: #48b28d
					font-size: .24rem
				.loading
					width: 2.44rem
					height: 0.4rem
	.explain
		margin: .3rem
		background: #e9e9e9
		border-radius: 4px
		padding: .2rem
		p
			color:#999
			font-size: .18rem
			text-align: justify
			line-height: .35rem
	.source
		position:absolute
		bottom: .48rem
		left:0
		width: 100%
		text-align:center
		font-size: .24rem
		color:#bbb

</style>
