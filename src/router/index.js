import Vue from 'vue'
import Router from 'vue-router'
import FlightHome from 'flight/home/Home'
import oneCompare from 'flight/list/oneCompare'
import oneDetail from 'flight/list/oneDetail'
import twoCompare from 'flight/list/twoCompare'
import twoDetail from 'flight/list/twoDetail'
import FlightComplete from 'flight/list/complete'

Vue.use(Router)

export default new Router({
  routes: [
    {
		path: '/',
		redirect: '/flight'
    },
    {
		path: '/flight',
		name: 'FlightHome',
		component: FlightHome
    },
    {
		path: '/flight/oneflightcompare',
		name: 'oneCompare',
		component: oneCompare
    },
    {
		path: '/flight/oneflightdetail',
		name: 'oneDetail',
		component: oneDetail
    },
    {
		path: '/flight/twoflightcompare',
		name: 'twoCompare',
		component: twoCompare
    },
    {
		path: '/flight/complete',
		name: 'FlightComplete',
		component: FlightComplete
    },
    {
		path: '/flight/twoflightdetail',
		name: 'twoDetail',
		component: twoDetail
    }
  ]
})
