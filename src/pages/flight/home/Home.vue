<template>
	<div>
		<tab-nav :tabList="tabList" :tabType="tab_type" @changeTab="changeTab" v-show="isTabShow">
			<home-single :tabType="tab_type" @changeCity="showCity" @changeDate="showCalendar"></home-single>
		</tab-nav>
		<slide-animate>
			<home-city v-show="isCityShow" @closeCity="closeCity" :isCityShow="isCityShow"></home-city>
		</slide-animate>
		<slide-animate>
			<home-calendar v-show="isCalendarShow" @closeCalendar="closeCalendar" :isCalendarShow="isCalendarShow" :isType="isType"></home-calendar>
		</slide-animate>
	</div>
</template>

<script>
import SlideAnimate from 'common/Animate'
import { mapState, mapMutations } from 'vuex'
import TabNav from 'common/TabNav'
import HomeSingle from 'flight/home/components/Single'
import HomeCity from 'common/city/City'
import HomeCalendar from 'common/Calendar'
import { getDateDiff, diffDate, getDate } from 'utils/date'
export default {
	name: 'FlightHome',
	components: {
		SlideAnimate,
		TabNav,
		HomeSingle,
		HomeCity,
		HomeCalendar
	},
	data () {
		return {
			isCityShow: false,
			isCalendarShow: false,
			isTabShow: true,
			isType: 'home',
			isCityType: '', // 记录出发地和到达地的类型
			tabList: [
				{
					type: 'single',
					name: '单程'
				},
				{
					type: 'return',
					name: '返程'
				}
			]
		}
	},
	computed: {
		...mapState(['tab_type', 'default_start_date', 'default_start_date_value', 'default_end_date', 'default_end_date_value'])
	},
	methods: {
		changeTab (tab) {
			this.changeCurTab(tab.type)
			if (tab.type === 'return') {
				// 处理开始日期大于结束日期
				if (diffDate(this.default_start_date_value, this.default_end_date_value) !== false) {
					const endDate = getDate(1, 'complex', this.default_start_date_value)
					const endDateValue = getDate(1, 'standard', this.default_start_date_value)
					this.changeEndDate(endDate)
					this.changeEndDateValue(endDateValue)
				}
				const day = getDateDiff(this.default_start_date_value, this.default_end_date_value)
				// 默认往返天数
				this.changeSelectDay(day)
			}
		},
		showCity (type) {
			// 显示选择城市，记录是出发地还是到达地
			this.isCityShow = true
			this.isTabShow = false
			this.isCityType = type
		},
		closeCity (item) {
			// 关闭选择城市，根据是出发地还是到达地来保存数据
			this.isCityShow = false
			this.isTabShow = true

			if (this.isCityType === 'start' && item !== '') {
				this.changeStartCity(item.city_name_cn)
				this.changeStartCityCode(item.city_code)
			} else if (this.isCityType === 'end' & item !== '') {
				this.changeEndCity(item.city_name_cn)
				this.changeEndCityCode(item.city_code)
			}
		},
		showCalendar (type) {
			// 显示日历
			this.isTabShow = false
			this.isCalendarShow = true
		},
		closeCalendar (type, day) {
			// 关闭日历
			this.isTabShow = true
			this.isCalendarShow = false

			if (type === 'start') {
				// 保存出发时间
				this.changeStartDate(this.default_start_date)
				this.changeStartDateValue(this.default_start_date_value)
			} else if (type === 'end') {
				// 保存到达时间
				this.changeStartDate(this.default_start_date)
				this.changeStartDateValue(this.default_start_date_value)
				this.changeEndDate(this.default_end_date)
				this.changeEndDateValue(this.default_end_date_value)
				this.changeSelectDay(day)
			}
		},
		...mapMutations(['changeCurTab', 'changeStartCity', 'changeEndCity', 'changeStartCityCode', 'changeEndCityCode', 'changeStartDate', 'changeEndDate', 'changeStartDateValue', 'changeEndDateValue', 'changeSelectDay'])
	}
}
</script>

<style lang="stylus" scoped>
</style>
