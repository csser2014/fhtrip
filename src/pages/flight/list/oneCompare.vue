<template>
	<div>
		<div class="list-wrapper" v-show="isShowList">
			<one-calendar @changeDate="showCalendar" :calendarPriceList="calendarPriceList"></one-calendar>
			<one-item :dataList="dataList"></one-item>
			<tab-bottom :dataList="dataList" @change="handleOrder"></tab-bottom>
		</div>
		<home-calendar v-show="isCalendarShow" @closeCalendar="closeCalendar" :isCalendarShow="isCalendarShow" :isType="isType"></home-calendar>
	</div>
</template>

<script>
import merge from 'webpack-merge'
import { mapState, mapMutations } from 'vuex'
import { getAllChannels, getAllFlight } from 'api/flight'
import OneCalendar from 'flight/list/components/oneFlightCalendar'
import OneItem from 'flight/list/components/oneItem'
import TabBottom from 'flight/list/components/tabBottom'
import HomeCalendar from 'common/Calendar'
export default {
	name: 'OneCompare',
	components: {
		OneCalendar,
		OneItem,
		TabBottom,
		HomeCalendar
	},
	data () {
		return {
			isCalendarShow: false,
			isShowList: true,
			isType: 'list',
			calendarPriceList: [],
			flightDateItem: '',
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
		...mapState(['default_price_list', 'default_start_city', 'default_start_city_code', 'default_end_city', 'default_end_city_code', 'default_start_date', 'default_start_date_value'])
	},
	methods: {
		// 获取所有的 channel
		getAllChannels () {
			const params = {
				type: 2,
				isDomestic: 1,
				r: Math.random()
			}
			getAllChannels(params).then(this.handleAllChannel)
		},
		handleAllChannel (res) {
			// 为每一个 channelId 获取数据
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
			// 获取每一个 channelId 的航班信息
			const params = {
				fromCityCode: this.$route.query.fromCityCode,
				fromCityName: this.$route.query.fromCityName,
				toCityCode: this.$route.query.toCityCode,
				toCityName: this.$route.query.toCityName,
				flightDate: this.flightDateItem,
				channelIds: channelId,
				randomId: this.$route.query.r
			}
			getAllFlight(params).then((res) => {
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

				// this.completeChannelId.push(channelId)

				this.showList(listData, channelId)
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

					let newChannelName = listItem.lowestChannelName === null ? '--' : listItem.lowestChannelName

					let flightsStr = ''
					let flag = false

					flightsStr = this.compareFlight(listItem.flightList, listItem)

					this.tmpListArray.forEach((arrItem) => {
						let coachFlightsStr = ''

						coachFlightsStr = this.compareFlight(arrItem.flightList, arrItem)

						if (coachFlightsStr === flightsStr) {
							flag = true
						}
					})

					if (flag === false) {
						this.addListItem(listItem)
					} else {
						let pItem = this.$_.findWhere(this.dataList, {'AllFlightStr': flightsStr})
						pItem.lowestChannelNameArr.push({'lowestChannelName': newChannelName, 'lowestPrice': newPrice, 'isLowestPrice': false})

						pItem.lowestChannelNameArr.forEach((it) => {
							it.isLowestPrice = false
						})

						let lowestPriceItem = this.$_.min(pItem.lowestChannelNameArr, function (obj) {
							return obj.lowestPrice
						})

						lowestPriceItem.isLowestPrice = true
					}
				})
			}
		},
		compareFlight (dList, aItem) {
			let coachCitiesStr = ''
			let coachCompaniesStr = ''
			let coachFlightsStr = ''

			dList.forEach((arrIt, idx) => {
				if (aItem.flightList.length > 1) {
					if (coachCitiesStr !== '') {
						coachCitiesStr += ','
					}
					coachCitiesStr += arrIt.toCityName
				}

				if (coachCompaniesStr.indexOf(arrIt.carrierName) !== -1) {
					coachCompaniesStr = coachCompaniesStr + '、' + arrIt.flightNo
				} else {
					coachCompaniesStr = coachCompaniesStr + ' ' + arrIt.carrierName + arrIt.flightNo
				}

				if (coachFlightsStr !== '') {
					coachFlightsStr += ','
				}

				coachFlightsStr += arrIt.flightNo
			})

			return coachFlightsStr
		},
		addListItem (item) {
			let startTime = item.startTime === null ? '--' : item.startTime
			let fromAirportCode = item.fromAirportCode === null ? '' : item.fromAirportCode
			let toAirportCode = item.toAirportCode === null ? '' : item.toAirportCode

			let citiesStr = ''
			let companiesStr = ''
			let AllFlightStr = ''

			item.flightList.forEach((it, index) => {
				if (item.flightList.length > 1 && index !== item.flightList.length - 1) {
					if (citiesStr !== '') {
						citiesStr += ','
					}
					let itAirport = it.toAirportName
					let itCity = it.toCityName
					itCity = itCity == null || itCity === null ? itAirport : itCity
					citiesStr += itCity
				}

				if (companiesStr.indexOf(it.carrierKey) !== -1) {
					companiesStr = companiesStr + '、' + it.flightNo
				} else {
					companiesStr = companiesStr + ' ' + it.carrierName + it.flightNo
				}

				let isShare = it.isShare === null ? '0' : it.isShare

				if (parseInt(isShare) === 1) {
					companiesStr += "<span class='share_flight'>(共享)</span>"
				}

				if (AllFlightStr !== '') {
					AllFlightStr += ','
				}

				AllFlightStr += it.flightNo
			})

			let fromAirportName = item.fromAirportName === null ? '--' : item.fromAirportName
			let toAirportName = item.toAirportName === null ? '--' : item.toAirportName

			let endTime = item.endTime === null ? '--' : item.endTime

			if (endTime.length > 10 && startTime.length > 10) {
				startTime = startTime.substring(endTime.length - 5, startTime.length)
				endTime = endTime.substring(endTime.length - 5, endTime.length)
			}

			let flightNo = item.flightNo === null ? '--' : item.flightNo
			let onTimeRate = item.onTimeRate === null ? '--' : item.onTimeRate
			onTimeRate = onTimeRate === '' ? '--' : onTimeRate

			let lowestChannelName = item.lowestChannelName === null ? '--' : item.lowestChannelName

			let lowestPrice = item.lowestPrice === null ? '--' : item.lowestPrice

			item.allChannelPrice.forEach((it1, index) => {
				let name = it1.channelName
				if (lowestChannelName.indexOf(name) === -1) {
					lowestChannelName = lowestChannelName + ',' + name
				}
			})

			let mTime = new Date().getTime()

			this.tmpListArray.push(item)

			// console.log(fromAirportCode + ':' + toAirportCode + ':' + mTime + ':' + flightNo + ':' + AllFlightStr + ':' + companiesStr + ':' + startTime + ':' + fromAirportName + ':' + citiesStr + ':' + endTime + ':' + toAirportName + ':' + lowestPrice + ':' + lowestChannelName + ':' + onTimeRate)

			let lowestChannelNameArr = []
			lowestChannelNameArr.push({'lowestChannelName': lowestChannelName, 'lowestPrice': lowestPrice, 'isLowestPrice': true})

			this.dataList.push({'AllFlightStr': AllFlightStr, 'companiesStr': companiesStr, 'lowestPrice': lowestPrice, 'flightNo': flightNo, 'startTime': startTime, 'endTime': endTime, 'fromAirportName': fromAirportName, 'toAirportName': toAirportName, 'onTimeRate': onTimeRate, 'lowestChannelName': lowestChannelName, 'lowestChannelNameArr': lowestChannelNameArr, 'fromAirportCode': fromAirportCode, 'toAirportCode': toAirportCode, 'mTime': mTime, 'isShow': false})

			console.log(this.dataList.length)
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
		closeCalendar (listItem, curItem) {
			// 关闭日历
			this.isShowList = true
			this.isCalendarShow = false
			this.calendarPriceList = listItem
			this.flightDateItem = curItem.fullDay

			this.changeStartDate(this.default_start_date)
			this.changeStartDateValue(this.default_start_date_value)

			this.$router.push({
				query: merge(this.$route.query, {'flightDate': this.flightDateItem})
			})

			window.location.reload()
		},
		...mapMutations(['changeStartDate', 'changeStartDateValue'])
	},
	activated () {
		this.flightDateItem = this.$route.query.flightDate
		this.getAllChannels()
		this.calendarPriceList = JSON.parse(this.default_price_list)
	},
	deactivated () {
		this.$destroy(true)
	}
}
</script>

<style lang="stylus" scoped>
</style>
