<template>
	<div>
		<div class="list-wrapper" v-show="isShowList">
			<two-calendar @changeDate="showCalendar"></two-calendar>
			<two-item :dataList="dataList"></two-item>
			<tab-bottom :dataList="dataList" @change="handleOrder"></tab-bottom>
		</div>
		<home-calendar v-show="isCalendarShow" @closeCalendar="closeCalendar" :isCalendarShow="isCalendarShow" :isType="isType"></home-calendar>
	</div>
</template>

<script>
import { getReturnAllFlight, getAllChannels } from 'api/flight'
import merge from 'webpack-merge'
import { mapState, mapMutations } from 'vuex'
import TwoCalendar from 'flight/list/components/twoFlightCalendar'
import TwoItem from 'flight/list/components/twoItem'
import TabBottom from 'flight/list/components/tabBottom'
import HomeCalendar from 'common/Calendar'
export default {
	name: 'TwoCompare',
	components: {
		TwoCalendar,
		TwoItem,
		TabBottom,
		HomeCalendar
	},
	data () {
		return {
			isCalendarShow: false,
			isShowList: true,
			isType: 'multi',
			channelIds: [],
			channelCNNames: [],
			intervalTimes: [],
			requestTimesArray: [],
			tmpListArray: [],
			timeout: 10000,
			priceType: 'asc',
			completeChannelId: [],
			dataList: []
		}
	},
	computed: {
		...mapState(['default_start_date', 'default_start_date_value', 'default_end_date', 'default_end_date_value'])
	},
	methods: {
		getAllChannels () {
			const params = {
				type: 2,
				isDomestic: 1,
				isReturn: 1,
				r: Math.random()
			}
			getAllChannels(params).then(this.handleAllChannel)
		},
		handleAllChannel (res) {
			if (res.data && res.data.code === '1') {
				let data = res.data

				data.channelInfo.forEach((item) => {
					let intervalTime = parseInt(item.intervalTime)
					let requestTimes = parseInt(item.requestTimes)

					this.channelIds.push(item.channelCode)
					this.channelCNNames.push(item.channelCNName)
					this.intervalTimes.push(intervalTime)
					this.requestTimesArray.push(requestTimes * 1000)
				})

				this.channelIds.forEach((it, idx) => {
					this.getAllFlight(it, idx)
				})
			}
		},
		getAllFlight (channelId, timesIndex) {
			const params = {
				fromCityCode: this.$route.query.fromCityCode,
				fromCityName: this.$route.query.fromCityName,
				toCityCode: this.$route.query.toCityCode,
				toCityName: this.$route.query.toCityName,
				flightDate: this.$route.query.flightDate,
				channelIds: channelId,
				routeType: 2,
				returnFlightDate: this.$route.query.returnFlightDate,
				randomId: this.$route.query.r
			}
			getReturnAllFlight(params).then((res) => {
				this.handleChannelLine(res, channelId, timesIndex)
			})
			.catch((err) => {
				this.handleChannelLine(err, channelId, timesIndex)
			})
		},
		handleChannelLine (res, channelId, timesIndex) {
			if (res.data && res.data.state === true) {
				let data = res.data
				let listData = data.airFerightList
				this.showList(listData)
			} else {
				let leftTimes = this.intervalTimes[timesIndex]
				if (leftTimes === 0) {
				} else {
					leftTimes--
					this.intervalTimes[timesIndex] = leftTimes
					setTimeout(() => {
						this.getAllFlight(channelId, timesIndex)
					}, this.requestTimesArray[timesIndex])
				}
			}
		},
		showList (arrData) {
			if (this.tmpListArray.length === 0) {
				arrData.forEach((item) => {
					this.addListItem(item)
					this.tmpListArray.push(item)
				})
			} else {
				arrData.forEach((listItem) => {
					let newPrice = listItem.lowestPrice === null ? '--' : listItem.lowestPrice

					let newBackData = listItem.returnFlight || {}
					let newBackPrice = newBackData.lowestPrice === null ? '--' : newBackData.lowestPrice

					let newFlightNo = listItem.flightNo
					let newBackNo = newBackData.flightNo === null ? '--' : newBackData.flightNo

					let newTotalPrice = newPrice + newBackPrice

					let newChannelName = listItem.lowestChannelName === null ? '--' : listItem.lowestChannelName

					let flag = false

					this.tmpListArray.forEach((arrItem) => {
						let listBackData = arrItem.returnFlight || {}
						// let lowestPrice = arrItem.lowestPrice === null ? '--' : arrItem.lowestPrice
						// let backPrice = listBackData.lowestPrice === null ? '--' : listBackData.lowestPrice
						// let totalPrice = lowestPrice + backPrice
						let flightNo = arrItem.flightNo === null ? '--' : arrItem.flightNo
						let backNo = listBackData.flightNo == null ? '--' : listBackData.flightNo

						// let channelName = arrItem.lowestChannelName === null ? '--'  : arrItem.lowestChannelName

						if (flightNo === newFlightNo && backNo === newBackNo) {
							flag = true
						}
					})

					if (flag === false) {
						this.addListItem(listItem)
					} else {
						let pItem = this.$_.findWhere(this.dataList, {'flightNo': newFlightNo, 'returnflightNo': newBackNo})
						pItem.flightPrice.push({'lowestChannelName': newChannelName, 'lowestPrice': newTotalPrice, 'isLowestPrice': false})

						pItem.flightPrice.forEach((it) => {
							it.isLowestPrice = false
						})

						let lowestPriceItem = this.$_.min(pItem.flightPrice, function (obj) {
							return obj.newTotalPrice
						})

						lowestPriceItem.isLowestPrice = true
					}
				})
			}
		},
		addListItem (item) {
			// 最低价渠道
			let lowestChannelName = item.lowestChannelName === null ? '--' : item.lowestChannelName
			// 最低价价格
			let lowestPrice = item.lowestPrice === null || item.lowestPrice === '' ? '0' : item.lowestPrice
			let pakeagePrice = item.pakeagePrice === null ? '--' : item.pakeagePrice

			let backLowestPrice = item.returnFlight.lowestPrice === null || item.returnFlight.lowestPrice === '' ? '0' : item.returnFlight.lowestPrice

			let totalPrice = parseInt(lowestPrice) + parseInt(backLowestPrice)
			totalPrice = totalPrice === 0 ? pakeagePrice : totalPrice

			let flightPrice = []

			flightPrice.push({
				'lowestChannelName': lowestChannelName,
				'lowestPrice': totalPrice,
				'isLowestPrice': true
			})
			// console.log(item)

			this.dataList.push({
				'flightItemGo': this.flightItem(item),
				'flightItemBack': this.flightItem(item.returnFlight),
				'isShow': false,
				'flightPrice': flightPrice,
				'flightNo': item.flightNo,
				'returnflightNo': item.returnFlight.flightNo
			})

			console.log(this.dataList.length)
		},
		flightItem (item) {
			let fromAirportName = item.fromAirportName === null ? '--' : item.fromAirportName
			let toAirportName = item.toAirportName === null ? '--' : item.toAirportName
			let fromAirportCode = item.fromAirportCode === null ? '--' : item.fromAirportCode
			let toAirportCode = item.toAirportCode === null ? '--' : item.toAirportCode

			let companyName = item.carrierName === null ? '--' : item.carrierName

			let startTime = item.startTime === null ? '--' : item.startTime
			let endTime = item.endTime === null ? '--' : item.endTime
			let flightNo = item.flightNo === null ? '--' : item.flightNo
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
		differDay (date1, date2) {
			let d1 = new Date(date1)
			let d2 = new Date(date2)
			let days = Math.abs(d2 - d1) / 1000 / 3600 / 24
			return days
		},
		handleOrder (type) {
			// 按价格排序
			if (type === 'price' && this.priceType === 'asc') {
				let arrSortResult = this.$_.sortBy(this.dataList, function (item) {
					return item.lowestPrice
				})
				this.dataList = arrSortResult
				this.priceType = 'desc'
			} else if (type === 'price' && this.priceType === 'desc') {
				let arrSortResult = this.$_.sortBy(this.dataList, function (item) {
					return -item.lowestPrice
				})
				this.dataList = arrSortResult
				this.priceType = 'asc'
			}

			// 按时间排序
			if (type === 'time' && this.priceType === 'asc') {
				let arrSortResult = this.$_.sortBy(this.dataList, function (item) {
					return item.mTime
				})
				this.dataList = arrSortResult
				this.priceType = 'desc'
			} else if (type === 'time' && this.priceType === 'desc') {
				let arrSortResult = this.$_.sortBy(this.dataList, function (item) {
					return -item.mTime
				})
				this.dataList = arrSortResult
				this.priceType = 'asc'
			}
		},
		showCalendar () {
			this.isShowList = false
			this.isCalendarShow = true
		},
		closeCalendar (day) {
			// 关闭日历
			this.isShowList = true
			this.isCalendarShow = false

			this.changeStartDate(this.default_start_date)
			this.changeStartDateValue(this.default_start_date_value)
			this.changeEndDate(this.default_end_date)
			this.changeEndDateValue(this.default_end_date_value)

			this.changeSelectDay(day)

			this.$router.push({
				query: merge(this.$route.query, {'flightDate': this.default_start_date_value, 'returnFlightDate': this.default_end_date_value})
			})

			window.location.reload()
		},
		...mapMutations(['changeStartDate', 'changeEndDate', 'changeStartDateValue', 'changeEndDateValue', 'changeSelectDay'])
	},
	activated () {
		this.getAllChannels()
	},
	deactivated () {
		this.$destroy(true)
	}
}
</script>

<style lang="stylus" scoped>
</style>
