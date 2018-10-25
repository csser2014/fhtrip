<template>
	<scroll class="list-wrapper-content" ref="mainlist" :data="dataList">
		<div class="list-main">

			<div class="list-item" v-for="(item, index) in dataList" :key="index" @click="handleDetail(item)">
				<div class="list-content">
					<div class="d-trip">
						<div class="p-img">
							<img src="../../../../assets/images/ic_bijia_qu.png" alt="" />
						</div>
						<div class="top">
							<span class="s-time">{{ item.flightItemGo.startTime }}</span>
							<span class="air-plane">{{ item.flightItemGo.companyName }}</span>
							<img src="../../../../assets/images/ic_flyto_2.png" alt="" class="fly_to" />
							<span class="air-time">准点率：{{ item.flightItemGo.onTimeRate }}</span>
							<span class="e-time">{{ item.flightItemGo.endTime }}</span>
						</div>
						<div class="middle">
							<span class="s-location">{{ item.flightItemGo.fromAirportName }}</span>
							<span class="e-location">{{ item.flightItemGo.toAirportName }}</span>
						</div>
					</div>
					<div class="d-trip">
						<div class="p-img">
							<img src="../../../../assets/images/ic_bijia_fan.png" alt="" />
						</div>
						<div class="top">
							<span class="s-time">{{ item.flightItemBack.startTime }}</span>
							<span class="air-plane">{{ item.flightItemBack.companyName }}</span>
							<img src="../../../../assets/images/ic_flyto_2.png" alt="" class="fly_to" />
							<span class="air-time">准点率：{{ item.flightItemBack.onTimeRate }}</span>
							<span class="e-time">{{ item.flightItemBack.endTime }}</span>
						</div>
						<div class="middle">
							<span class="s-location">{{ item.flightItemBack.fromAirportName }}</span>
							<span class="e-location">{{ item.flightItemBack.toAirportName }}</span>
						</div>
					</div>
					<div class="bottom" @click.stop="handleChannel(item)">
						<h2>
							<span class="total">共搜索到经济舱报价{{ item.flightPrice.length }}个</span>
							<span class="show">展开查看<em></em></span>
						</h2>
						<ul class="order-list" v-show="item.isShow">
							<li v-for="(it, idx) in item.flightPrice" :key="idx">
								<span class="order-title">{{ it.lowestChannelName }}</span>
								<span class="order-info">
									<i v-if="it.isLowestPrice">最低</i>
									<em>￥{{ it.lowestPrice }}</em>
									<a href="#">预订</a>
								</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</scroll>
</template>

<script>
import Scroll from 'common/scroll/scroll'
export default {
	name: 'OneItem',
	components: {
		Scroll
	},
	props: {
		dataList: Array
	},
	data () {
		return {
			click: {type: Boolean, default: true}
		}
	},
	methods: {
		handleChannel (e) {
			e.isShow = !e.isShow
		},
		handleDetail (item) {
			console.log(item)
			this.$router.push({
				path: '/flight/twoflightdetail',
				query: {
					fromCityCode: this.startCityCode,
					fromCityName: this.startCity,
					toCityCode: this.endCityCode,
					toCityName: this.endCity,
					flightDate: this.startDateValue,
					returnFlightDate: this.endDateValue,
					flightNo: item.flightNo,
					returnFlightNo: item.returnflightNo,
					fromAirportCode: item.flightItemGo.fromAirportCode,
					toAirportCode: item.flightItemGo.toAirportCode
				}
			})
		}
	},
	computed: {
		// 出发地
		startCity: {
			get () {
				return this.$store.state.default_start_city
			},
			set (newValue) {
				this.$store.state.default_start_city = newValue
			}
		},
		// 到达地
		endCity: {
			get () {
				return this.$store.state.default_end_city
			},
			set (newValue) {
				this.$store.state.default_end_city = newValue
			}
		},
		// 出发地代号
		startCityCode: {
			get () {
				return this.$store.state.default_start_city_code
			},
			set (newValue) {
				this.$store.state.default_start_city_code = newValue
			}
		},
		// 到达地代号
		endCityCode: {
			get () {
				return this.$store.state.default_end_city_code
			},
			set (newValue) {
				this.$store.state.default_end_city_code = newValue
			}
		},
		// 出发时间
		startDate: {
			get () {
				return this.$store.state.default_start_date
			},
			set (newValue) {
				this.$store.state.default_start_date = newValue
			}
		},
		// 结束时间
		endDate: {
			get () {
				return this.$store.state.default_end_date
			},
			set (newValue) {
				this.$store.state.default_end_date = newValue
			}
		},
		// 出发时间的值
		startDateValue: {
			get () {
				return this.$store.state.default_start_date_value
			},
			set (newValue) {
				this.$store.state.default_start_date_value = newValue
			}
		},
		// 到达时间的值
		endDateValue: {
			get () {
				return this.$store.state.default_end_date_value
			},
			set (newValue) {
				this.$store.state.default_end_date_value = newValue
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
	.list-wrapper-content
		position: absolute
		top: 2rem
		right: 0
		bottom: 1.2rem
		left: 0
		overflow: hidden;
	.list-item
		padding-left: .3rem
		border-top: 4px solid #f2f2f2
		padding-bottom: .3rem
		.list-header
			font-size: .2rem
			line-height: .9rem
			overflow:hidden
			border-bottom: 1px solid #f0f0f0
			.title
				float:left
				color:#333
				font-size: .24rem
				.air-logo
					width: .40rem
					height: .40rem
					margin-right: .1rem
			.punctuality
				float:right
				margin-right: .3rem
		.list-content
			margin-right: .3rem
			.d-trip
				position:relative
			.p-img
				position:absolute
				left:0
				top:.5rem
				img
					width: .32rem
					height: .32rem
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
					margin-left: .8rem
				.air-plane, .air-time
					position:absolute
					font-size: .2rem
					-webkit-transform: scale(calc(10 / 12))
					transform: scale(calc(10 / 12))
					color:#999
				.air-plane
					top: -0.23rem
					left: 2.1rem
					width: 2.5rem
					display: inline-block
					text-align: center
				.air-time
					top: .3rem
					left: 2.9rem
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
				.s-location, .e-location
					position: absolute
					top: 0
					display: block
					width: 2rem
					text-align: center
				.s-location
					left: .3rem
				.e-location
					left: 4.5rem
			.bottom
				background: #f8f8f8
				border-radius: 4px
				margin-top: .3rem
				h2
					-webkit-transform: scale(calc(10 / 12))
					height: .6rem
					line-height: .6rem
					transform: scale(calc(10 / 12))
					font-size: .2rem
					.total
						margin-left: -.3rem
					.show
						float:right
						margin-right: -.3rem
				.order-list
					li
						border-top: 1px solid #f0f0f0
						height: .96rem
						line-height: .96rem
						.order-title
							margin-left: .3rem
							color:#333
							font-size: .3rem
							font-weight:bold
						.order-info
							float:right
							margin-right: .3rem
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
</style>
