import { getCurDate, getNextDate, getCurDateValue, getNextDateValue } from '../utils/date'

let defaultTabType = 'single'

// 默认出发地
let defaultStartCity = '广州'

// 默认到达地
let defaultEndCity = '北京'

// 默认出发地代号
let defaultStartCityCode = 'CAN'

// 默认到达地代号
let defaultEndCityCode = 'BJS'

// 默认国内历史记录
let defaultDomesticHistoryCity = ''

// 默认国际历史记录
let defaultInternetHistoryCity = ''

let defaultStartDate = getCurDate()

let defaultEndDate = getNextDate()

let defaultStartDateValue = getCurDateValue()

let defaultEndDateValue = getNextDateValue()

// 默认当前日期的价格
let defaultPriceList = ''

// 默认跳转链接
let defaultLink = ''

// 默认选择的天数
let defaultSelectDay = ''

try {
	if (localStorage.tab_type) {
		defaultTabType = localStorage.tab_type
	}

	if (localStorage.default_start_city) {
		defaultStartCity = localStorage.default_start_city
	}

	if (localStorage.default_end_city) {
		defaultEndCity = localStorage.default_end_city
	}

	if (localStorage.default_start_city_code) {
		defaultStartCityCode = localStorage.default_start_city_code
	}

	if (localStorage.default_end_city_code) {
		defaultEndCityCode = localStorage.default_end_city_code
	}

	if (localStorage.default_domestic_history_city) {
		defaultDomesticHistoryCity = localStorage.default_domestic_history_city
	}

	if (localStorage.default_internet_history_city) {
		defaultInternetHistoryCity = localStorage.default_internet_history_city
	}

	if (localStorage.default_start_date) {
		defaultStartDate = localStorage.default_start_date
	}

	if (localStorage.default_end_date) {
		defaultEndDate = localStorage.default_end_date
	}

	if (localStorage.default_start_date_value) {
		defaultStartDateValue = localStorage.default_start_date_value
	}

	if (localStorage.default_end_date_value) {
		defaultEndDateValue = localStorage.default_end_date_value
	}

	if (localStorage.default_price_list) {
		defaultPriceList = localStorage.default_price_list
	}

	if (localStorage.default_link) {
		defaultLink = localStorage.default_link
	}

	if (localStorage.default_select_day) {
		defaultSelectDay = localStorage.default_select_day
	}
} catch (e) {
}

export default {
	tab_type: defaultTabType,
	default_start_city: defaultStartCity,
	default_end_city: defaultEndCity,
	default_start_city_code: defaultStartCityCode,
	default_end_city_code: defaultEndCityCode,
	default_domestic_history_city: defaultDomesticHistoryCity,
	default_internet_history_city: defaultInternetHistoryCity,
	default_start_date: defaultStartDate,
	default_end_date: defaultEndDate,
	default_start_date_value: defaultStartDateValue,
	default_end_date_value: defaultEndDateValue,
	default_price_list: defaultPriceList,
	default_link: defaultLink,
	default_select_day: defaultSelectDay
}
