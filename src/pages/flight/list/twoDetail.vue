<template>
	<div class="detail">
		<div class="header">
			<div class="iconfont back-icon">&#xe63c;</div>
			<p class="title">航班详情</p>
		</div>
		<div class="list-wrapper" v-for="(item, index) in flightList" :key="index">
			<div class="list-item">
				<div class="list-header">
					<div class="title">
						<span>{{ flightDate | allDate }}</span>
					</div>
					<p class="punctuality">{{ fromCityName }} - {{ toCityName }}</p>
				</div>
				<div class="list-content">
					<div class="p-img">
						<img src="../../../assets/images/ic_bijia_qu.png" alt="" />
					</div>
					<div class="top">
						<span class="s-time">{{ item.flightItemGo.startTime }}</span>
						<span class="air-plane">{{ item.flightItemGo.companyName }}</span>
						<img src="../../../assets/images/ic_flyto_2.png" alt="" class="fly_to" />
						<span class="air-time">准点率：{{ item.flightItemGo.onTimeRate }}</span>
						<span class="e-time">{{ item.flightItemGo.endTime }}</span>
					</div>
					<div class="middle">
						<span class="s-location">{{ item.flightItemGo.fromAirportName }}</span>
						<span class="e-location">{{ item.flightItemGo.toAirportName }}</span>
					</div>
				</div>
			</div>
			<div class="list-item">
				<div class="list-header">
					<div class="title">
						<span>{{ returnFlightDate | allDate }}</span>
					</div>
					<p class="punctuality">{{ toCityName }} - {{ fromCityName }}</p>
				</div>
				<div class="list-content">
					<div class="p-img">
						<img src="../../../assets/images/ic_bijia_fan.png" alt="" />
					</div>
					<div class="top">
						<span class="s-time">{{ item.flightItemBack.startTime }}</span>
						<span class="air-plane">{{ item.flightItemBack.companyName }}</span>
						<img src="../../../assets/images/ic_flyto_2.png" alt="" class="fly_to" />
						<span class="air-time">准点率：{{ item.flightItemBack.onTimeRate }}</span>
						<span class="e-time">{{ item.flightItemBack.endTime }}</span>
					</div>
					<div class="middle">
						<span class="s-location">{{ item.flightItemBack.fromAirportName }}</span>
						<span class="e-location">{{ item.flightItemBack.toAirportName }}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="list-item">
			<div class="list-header">
				<div class="title">
					<span>请选择</span>
				</div>
			</div>
			<div class="order-content">
				<ul class="order-list">
					<li v-for="(item, index) in priceList" :key="index">
						<span class="checkbox on"></span>
						<span class="order-title">{{ item.channelName }}</span>
						<span class="order-info">
							<u>往返套票特惠价</u>
							<em>￥{{ item.price }}</em>
						</span>
					</li>
				</ul>
			</div>
		</div>
		<ul class="go-order">
				<li v-for="(item, index) in priceList" :key="index">
					<span class="order-title">往返总价</span>
					<span class="order-info">
						<em>￥{{ item.price }}</em>
						<a href="#">立即预订</a>
					</span>
				</li>
		</ul>
	</div>
</template>

<script>
import { handleOrder, getReturnFlightDetail } from 'api/flight'
import { mapMutations } from 'vuex'
export default {
	name: 'TwoDetail',
	data () {
		return {
			timeout: 10000,
			flightList: [],
			priceList: [],
			lowestPirceList: [],
			fromCityName: '',
			toCityName: '',
			flightDate: '',
			returnFlightDate: ''
		}
	},
	filters: {
		allDate (value) {
			let week = new Date(value).getDay()
			let weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
			return value + ' ' + weekDay[week]
		}
	},
	methods: {
		getFlightDetail () {
			const params = {
				fromCityCode: this.$route.query.fromCityCode,
				fromCityName: this.$route.query.fromCityName,
				toCityCode: this.$route.query.toCityCode,
				toCityName: this.$route.query.toCityName,
				flightDate: this.$route.query.flightDate,
				flightNos: this.$route.query.flightNo,
				returnFlightNos: this.$route.query.returnFlightNo,
				returnFlightDate: this.$route.query.returnFlightDate,
				RouteType: 2
			}
			getReturnFlightDetail(params).then(this.handleDetail)
		},
		handleDetail (res) {
			let data = res.data
			let airFerightList = data.airFerightList
			if (data.state === true && airFerightList.length > 0) {
				let airFerightListData = airFerightList[0]

				this.flightList.push({
					'flightItemGo': this.flightItem(airFerightListData),
					'flightItemBack': this.flightItem(airFerightListData.returnFlight)
				})

				this.priceList.push({
					'price': airFerightListData.pakeagePrice,
					'channelId': airFerightListData.lowestChannelId,
					'channelName': airFerightListData.lowestChannelName
				})

				/*
				airFerightListData.allChannelPrice.forEach((it, idx) => {
					let price = parseInt(it.lowestPrice)
					let channelId = it.channelId
					let channelName = it.channelName
					let reserveUrl = it.reserveUrl
					this.priceList.push({'price': price, 'channelName': channelName, 'reserveUrl': reserveUrl, 'channelId': channelId})
				})

				let lowestPrice = this.$_.min(this.priceList, function (obj) {
					return obj.price
				})

				this.lowestPirceList.push(lowestPrice)
				*/
			}
		},
		flightItem (item) {
			let fromAirportName = item.fromAirportName === null ? '--' : item.fromAirportName
			let toAirportName = item.toAirportName === null ? '--' : item.toAirportName
			let fromAirportCode = item.fromAirportCode === null ? '--' : item.fromAirportCode
			let toAirportCode = item.toAirportCode === null ? '--' : item.toAirportCode

			// let carrierCode = item.carrierCode === null ? '--' : item.carrierCode

			// let cabinType = item.cabinType === null ? '--' : item.cabinType
			// let backData = item.returnFlight || {}
			// let backstartTime = backData.startTime === null ?  '--' : backData.startTime

			let companyName = item.carrierName === null ? '--' : item.carrierName

			let startTime = item.startTime === null ? '--' : item.startTime
			let endTime = item.endTime === null ? '--' : item.endTime
			let flightNo = item.flightNo === null ? '--' : item.flightNo
			// let flightType = item.flightType === null ? '--' : item.flightType
			let onTimeRate = item.onTimeRate === null ? '--' : item.onTimeRate

			startTime = startTime.split(' ')[1]

			endTime = endTime.split(' ')[1]

			onTimeRate = onTimeRate === '' ? '--' : onTimeRate

			return {
				fromAirportCode: fromAirportCode,
				toAirportCode: toAirportCode,
				fromAirportName: fromAirportName,
				toAirportName: toAirportName,
				companyName: companyName,
				startTime: startTime,
				endTime: endTime,
				flightNo: flightNo,
				onTimeRate: onTimeRate

			}
		},
		handleOrder (item) {
			const params = {
				fromCityCode: this.$route.query.fromCityCode,
				fromCityName: this.$route.query.fromCityName,
				toCityCode: this.$route.query.toCityCode,
				toCityName: this.$route.query.toCityName,
				beginFlightDay: this.$route.query.flightDate,
				flightNo: this.$route.query.flightNos,
				toAirportCode: this.$route.query.toAirportCode,
				fromAirportCode: this.$route.query.fromAirportCode,
				channelId: item.channelId,
				price: item.price
			}
			handleOrder(params).then((res) => {
				this.handleDetailOrder(res, item)
			})
		},
		handleDetailOrder (res, item) {
			let data = res.data
			if (data.state === true) {
				let link = data.message
				let code = parseInt(data.code)
				if (code === 2) {

				} else {
					this.changeLink(link)
					this.$router.push({
						path: '/flight/complete',
						query: {
							fromCityName: this.$route.query.fromCityName,
							toCityName: this.$route.query.toCityName,
							flightDate: this.$route.query.flightDate,
							flightNos: this.$route.query.flightNos,
							channelName: item.channelName,
							price: item.price
						}
					})
					// window.location.href = link
				}
			} else {
				alert('暂时无法预订')
			}
		},
		goBack () {
			this.$router.go(-1)
		},
		...mapMutations(['changeLink'])
	},
	activated () {
		this.fromCityName = this.$route.query.fromCityName
		this.toCityName = this.$route.query.toCityName
		this.flightDate = this.$route.query.flightDate
		this.returnFlightDate = this.$route.query.returnFlightDate
		this.getFlightDetail()
	},
	deactivated () {
		this.$destroy(true)
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
			.checkbox
				background-image: url(../../../assets/images/checkbox.gif)
				height: .32rem
				width: .32rem
				display: inline-block
				background-size: cover
			span
				&.on
					background-image: url(../../../assets/images/checkbox_on.gif)
			border-bottom: 1px solid #f0f0f0
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
	.go-order
		position:fixed
		bottom:0
		left:0
		width:100%
		background:#fff
		border-top:1px solid #f0f0f0
		height: 1.2rem
		line-height: 1.2rem
		li
			border:none
			height: 1.2rem
			line-height: 1.2rem
			.order-info
				a
					width: 2rem
					height: .8rem
					line-height: .8rem
				em
					font-weight:bold
					font-size: .4rem
</style>
