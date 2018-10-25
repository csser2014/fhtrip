<template>
	<div class="calendar-wrapper">
		<div class="header">
			<router-link to="/flight">
				<div class="iconfont back-icon">&#xe63c;</div>
			</router-link>
			<p class="title">{{ default_start_city }} - {{ default_end_city }}</p>
		</div>
		<ul class="calendar-info">
			<li class="date-info">
				<span class="start">出发</span><br />
				<span>{{ this.default_start_date | stripYear }}</span>
			</li>
			<li class="date-info total-day">
				<span class="line">&nbsp;</span>
				<span class="day">{{ this.default_select_day }}天</span>
			</li>
			<li class="date-info return-info">
				<span class="reach">返程</span><br />
				<span>{{ this.default_end_date | stripYear }}</span>
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
	filters: {
		stripYear (value) {
			return value.substring(4).replace('年', '')
		}
	},
	methods: {
		handleDate () {
			this.$emit('changeDate')
		}
	},
	computed: {
		...mapState(['default_start_city', 'default_end_city', 'default_start_date', 'default_end_date', 'default_select_day'])
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
	.calendar-info
		overflow:hidden
		height: .8rem
		text-align:center
		margin-top:.1rem
		margin-bottom:.1rem
		display:flex
		li
			text-align:left
			padding-left:.3rem
			&.date-info
				flex:1
				padding-top:.1rem
			&.total-day
				text-align:center
				line-height:.5rem
				position:relative
			&.return-info
				text-align:right
				padding-right:.3rem
			span
				display:inline-block
				font-size: .24rem
				color:#333
				&.day
					background: #eafff8
					border-radius: 1px
					width: .72rem
					height:.4rem
					display:inline-block
					position:relative
				&.line
					position:absolute
					width: 1.5rem
					border-bottom:1px solid #eafff8
					top: -.18rem
					left: .4rem
				&.start
					color:#bbb
					text-align:left
				&.reach
					color:#bbb
			.date
				top:-.3rem
				font-size: .18rem
				display: inline-block;
				-webkit-transform: scale(calc(9 / 12))
				transform: scale(calc(9 / 12))
			&.select-calendar
				border-left: 1px solid #ccc
				float:right
				width: 1.08rem
				em
					display:block
					line-height: .3rem
					color:#333
					font-weight:bold
					&.lowerprice
						margin-top: .1rem
</style>
