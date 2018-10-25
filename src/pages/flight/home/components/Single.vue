<template>
	<div class="tabs-main">
		<div class="tabs-item">
			<ul class="arrive-info">
				<li class="a-start">出发</li>
				<li class="a-end">到达</li>
			</ul>
			<ul class="select-city">
				<li class="start-city" @click="handleCity('start')">{{ this.startCity }}</li>
				<li class="tab-img" @click.prevent="exchangeCity"><img src="../../../../assets/images/ic_bijia_change.png" alt="" /></li>
				<li class="end-city" @click="handleCity('end')">{{ this.endCity }}</li>
			</ul>
			<ul class="select-date">
				<li class="start-date" @click="handleDate('start')">
					<span class="s-date">{{ this.startDate | date }}</span><span class="s-week">{{ this.startDate | week }}</span>
				</li>
				<li class="end-date" v-if="tabType === 'return'" @click="handleDate('end')">
					<span class="s-date">{{ this.endDate | date }}</span><span class="s-week">{{ this.endDate | week }}</span>
				</li>
				<li v-else>&nbsp;</li>
			</ul>
			<div class="price-submit" @click="searchPrice">
				<div class="price-btn">开始比价</div>
			</div>
		</div>
		<div class="s-history">
			<h2>常用航班</h2>
			<ul>
				<li>广州 - 北京 <span class="iconfont close-icon">&#xe844;</span></li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
	name: 'HomeSingle',
	props: {
		tabType: String
	},
	filters: {
		date (value) {
			return value.split(' ')[0]
		},
		week (value) {
			return value.split(' ')[1]
		}
	},
	methods: {
		// 交换城市和城市代号
		exchangeCity () {
			let tmpCity = this.startCity
			let tmpCityCode = this.startCityCode

			this.startCity = this.endCity
			this.endCity = tmpCity

			this.startCityCode = this.endCityCode
			this.endCityCode = tmpCityCode

			this.changeStartCity(this.startCity)
			this.changeStartCityCode(this.startCityCode)

			this.changeEndCity(this.endCity)
			this.changeEndCityCode(this.endCityCode)
		},
		handleCity (type) {
			this.$emit('changeCity', type)
		},
		handleDate (type) {
			this.$emit('changeDate', type)
		},
		searchPrice () {
			if (this.tab_type === 'single') {
				// 单程
				this.$router.push({
					path: '/flight/oneflightcompare',
					query: {
						fromCityCode: this.startCityCode,
						fromCityName: this.startCity,
						toCityCode: this.endCityCode,
						toCityName: this.endCity,
						flightDate: this.startDateValue,
						r: Math.random()
					}
				})
			} else {
				// 返程
				this.$router.push({
					path: '/flight/twoflightcompare',
					query: {
						fromCityCode: this.startCityCode,
						fromCityName: this.startCity,
						toCityCode: this.endCityCode,
						toCityName: this.endCity,
						flightDate: this.startDateValue,
						routeType: 2,
						returnFlightDate: this.endDateValue,
						randomId: Math.random()
					}
				})
			}
		},
		...mapMutations(['changeStartCity', 'changeEndCity', 'changeStartCityCode', 'changeEndCityCode'])
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
		endDateValue: {
			get () {
				return this.$store.state.default_end_date_value
			},
			set (newValue) {
				this.$store.state.default_end_date_value = newValue
			}
		},
		...mapState(['tab_type'])
	},
	mounted () {
	}
}
</script>

<style lang="stylus" scoped>
	.tabs-item
		padding: .4rem .3rem 0 .3rem
		.arrive-info, .select-city
			display: flex
		.arrive-info
			li
				flex: 1
				color:#bbb
				font-size: .24rem
			.a-start
				text-align:left
			.a-end
				text-align:right
		.select-city
			margin-top: .12rem
			height: .8rem
			li
				&.start-city, &.end-city
					flex: 1
					border-bottom: 1px solid #F0F0F0
					color:#333
					font-size: .3rem
				&.end-city
					text-align:right
				&.tab-img
					width: .6rem
					img
						width: .6rem
						height: .6rem
		.select-date
			display: flex
			border-bottom: 1px solid #F0F0F0
			height: 1.4rem
			line-height: 1.4rem
			li
				flex: 1
				&.end-date
					text-align:right
				.s-date
					color:#333
					font-size: .3rem
				.s-week
					color:#bbb
					font-size: .24rem
					margin-left: .08rem
		.price-submit
			height: 1.8rem
			line-height: 1.8rem
			.price-btn
				background: #48B28D;
				border-radius: 4px;
				color:#fff
				text-align:center
				height: 1rem
				line-height: 1rem
				width: 100%
				font-size: .3rem
	.s-history
		h2
			background: #F5F5F5
			height: .6rem
			line-height: .6rem
			padding-left: .3rem
			color:#bbb
			font-size:.24rem
		ul
			li
				margin-top: 0.4rem
				display: inline-block
				width: 2rem
				font-size: 0.24rem
				color: #bbb
				text-align: center
				padding: 0 0.2rem
				white-space:nowrap
				.close-icon
					color: #dfdfdf
					font-size: .26rem
</style>
