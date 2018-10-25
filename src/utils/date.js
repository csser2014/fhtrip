export function getDate (sDay, type, dt) {
	let d, year, month, day, week
	d = dt !== undefined ? new Date(dt) : new Date()
	d.setDate(d.getDate() + sDay)
	year = d.getFullYear()
	month = d.getMonth() + 1
	day = d.getDate()

	month = toFixDate(month)
	day = toFixDate(day)
	week = getWeek(d.getDay())

	if (type === 'standard') {
		return year + '-' + month + '-' + day
	} else {
		return year + '年' + month + '月' + day + '日' + ' ' + week
	}
}

// 如果是1到9，则在后面添加0
export const toFixDate = date => date < 10 ? '0' + date : date

// 判断星期几
export const getWeek = week => ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][week]

// 是否是润年
export const isLeapYear = year => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0

// 判断某个月的天数
export function getDayInMonth (year, month) {
	const monthDay = [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
	return monthDay[month - 1]
}

// 判断某个月的第一天是星期几
export function getFirstFromMonth (year, month) {
	let d = new Date()
	d.setFullYear(year)
	d.setMonth(month - 1)
	d.setDate(1)
	return d.getDay()
}

// 计算两个日期相差的天数
export function getDateDiff (startTime, endTime) {
	const sTime = new Date(startTime)
	const eTime = new Date(endTime)
	const num = 1000 * 3600 * 24
	return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(num))
}

// 判断两个日期是否相等
export function diffDate (date1, date2) {
	let d1, d2
	if (date1 !== 0 && date1 !== undefined) {
		d1 = new Date(date1)
		d2 = new Date(date2)
		if (d1 instanceof Date && d2 instanceof Date) {
			return (d1 > d2) ? true : (d1 < d2) ? false : 0
		} else {
			throw new TypeError(d1 + '-' + d2)
		}
	}
}

export function getCurDate () {
	return getDate(0, 'complex')
}

export function getNextDate () {
	return getDate(1, 'complex')
}

export function getCurDateValue () {
	return getDate(0, 'standard')
}

export function getNextDateValue () {
	return getDate(1, 'standard')
}
