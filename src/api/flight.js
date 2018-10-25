import { get } from 'api/base'

// 获取日历价格信息
export function getCalendarInfo (params = {}) {
	const url = '/api/selectPriceCalendar.json'
	return get(url, params)
}

// 获取城市信息
export function getCity (params = {}) {
	const url = '/api/city_new.json'
	return get(url, params)
}

// 获取所有的 channel
export function getAllChannels (params = {}) {
	const url = '/api/channel.json'
	return get(url, params)
}

// 获取单程每一个 channelId 的航班信息
export function getAllFlight (params = {}) {
	const url = '/api/oneflightData.json'
	return get(url, params)
}

// 获取返程每一个 channelId 的航班信息
export function getReturnAllFlight (params = {}) {
	const url = '/api/twoflightData.json'
	return get(url, params)
}

// 立即预订
export function handleOrder (params = {}) {
	const url = '/api/onesendcode.json'
	return get(url, params)
}

// 处理单程航班细节
export function getFlightDetail (params = {}) {
	const url = '/api/oneflightdetail.json'
	return get(url, params)
}

// 处理返程航班细节
export function getReturnFlightDetail (params = {}) {
	const url = '/api/twoflightdetail.json'
	return get(url, params)
}
