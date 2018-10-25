export default {
	changeCurTab (state, type) {
		state.tab_type = type
		try {
			localStorage.tab_type = type
		} catch (e) {
		}
	},

	changeStartCity (state, city) {
		state.default_start_city = city
		try {
			localStorage.default_start_city = city
		} catch (e) {
		}
	},

	changeEndCity (state, city) {
		state.default_end_city = city
		try {
			localStorage.default_end_city = city
		} catch (e) {
		}
	},

	changeStartCityCode (state, code) {
		state.default_start_city_code = code
		try {
			localStorage.default_start_city_code = code
		} catch (e) {
		}
	},

	changeEndCityCode (state, code) {
		state.default_end_city_code = code
		try {
			localStorage.default_end_city_code = code
		} catch (e) {
		}
	},

	changeDomesticHistoryCity (state, item) {
		state.default_domestic_history_city = item
		try {
				localStorage.default_domestic_history_city = item
		} catch (e) {
		}
	},

	changeInternetHistoryCity (state, item) {
		state.default_internet_history_city = item
		try {
				localStorage.default_internet_history_city = item
		} catch (e) {
		}
	},

	changeStartDate (state, date) {
		state.default_start_date = date
		try {
			localStorage.default_start_date = date
		} catch (e) {
		}
	},

	changeEndDate (state, date) {
		state.default_end_date = date
		try {
			localStorage.default_end_date = date
		} catch (e) {
		}
	},

	changeStartDateValue (state, date) {
		state.default_start_date_value = date
		try {
			localStorage.default_start_date_value = date
		} catch (e) {
		}
	},

	changeEndDateValue (state, date) {
		state.default_end_date_value = date
		try {
			localStorage.default_end_date_value = date
		} catch (e) {
		}
	},

	changePriceList (state, item) {
		state.default_price_list = item
		try {
			localStorage.default_price_list = item
		} catch (e) {
		}
	},

	changeLink (state, link) {
		state.default_link = link
		try {
			localStorage.default_link = link
		} catch (e) {
		}
	},

	changeSelectDay (state, day) {
		state.default_select_day = day
		try {
			localStorage.default_select_day = day
		} catch (e) {
		}
	}
}
