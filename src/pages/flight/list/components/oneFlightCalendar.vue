<template>
	<div class="calendar-wrapper">
		<div class="header">
			<router-link to="/flight">
				<div class="iconfont back-icon">&#xe63c;</div>
			</router-link>
			<p class="title">{{ default_start_city }} - {{ default_end_city }}</p>
		</div>
		<ul class="calendar-header">
			<li v-for="(item, index) in calendarPriceList" :key="index" :class="[item.isSelect === true ? 'cur' : '']">
				<em class="date">{{ item.week }}</em>
				<span class="day">{{ item.date }}</span>
				<em class="price">￥{{ item.price }}</em>
			</li>
			<li class="select-calendar" @click="handleDate">
				<em class="lowerprice">低价</em>
				<em>日历</em>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'SelectCalendar',
	props: {
		calendarPriceList: Array
	},
	methods: {
		handleDate () {
			this.$emit('changeDate')
		}
	},
	computed: {
		...mapState(['default_start_city', 'default_end_city'])
	}
}
</script>

<style lang="stylus" scoped>
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
	.calendar-header
		overflow:hidden
		height: .8rem
		line-height: .8rem
		text-align:center
		margin-top:.1rem
		margin-bottom:.1rem
		li
			width: 14.28571%
			color:#bbb
			font-size: .24rem
			float:left
			box-sizing: border-box
			position:relative
			height: .8rem
			line-height: .8rem
			&.cur
				.date, .day, .price
					color:#48B28D
			.date, .day, .price
				position:absolute
				left: 0
				width:100%
				color:#999
			.date
				top:-.3rem
				font-size: .18rem
				display: inline-block;
				-webkit-transform: scale(calc(9 / 12))
				transform: scale(calc(9 / 12))
			.day
				font-size: .24rem
				color:#333
				top:0
			.price
				font-size: .18rem
				display: inline-block;
				-webkit-transform: scale(calc(9 / 12))
				transform: scale(calc(9 / 12))
				bottom: -.3rem
			&.select-calendar
				border-left: 1px solid #ccc
				em
					display:block
					line-height: .3rem
					color:#333
					font-weight:bold
					&.lowerprice
						margin-top: .1rem
</style>
