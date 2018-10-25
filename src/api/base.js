import axios from 'axios'

export function get (url, params = {}, timeout = 10000) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
			params: params,
			timeout: timeout
		})
		.then((res) => {
			resolve(res)
		})
		.catch((err) => {
			reject(err)
		})
	})
}

export function post (url, params = {}, timeout = 10000) {
	return new Promise((resolve, reject) => {
		axios.post(url, {
			params: params,
			timeout: timeout
		})
		.then((res) => {
			resolve(res)
		})
		.catch((err) => {
			reject(err)
		})
	})
}
