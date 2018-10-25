<template>
	<scroll class="list" :isShow="isCityShow" ref="mainList">
		<div>
			<div class="area" ref="hot">
				<div class="title">热门</div>
				<div class="city-list">
					<ul class="city-wrapper">
						<li class="city" v-for="(city, index) in hot_cities" :key="index" @click="handleCity(city, 'city')">{{ city.city_name_cn }}</li>
					</ul>
				</div>
			</div>
			<div class="area" ref="history">
				<div class="title">历史</div>
				<div class="city-list">
					<ul class="city-wrapper">
						<li class="city" v-for="(item, index) in history_cities" :key="index" @click="handleCity(item, 'history')">{{ item.city_name_cn }}</li>
					</ul>
				</div>
			</div>
			<div class="area" v-for="city in cities" :key="city.start_char" :ref="city.start_char">
				<div class="title">{{ city.start_char }}</div>
				<ul class="item-list">
					<li class="item border-bottom" v-for="(item, index) in city.cities" :key="index" @click="handleCity(item, 'city')">{{ item.city_name_cn }}</li>
				</ul>
			</div>
		</div>
	</scroll>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Scroll from 'common/scroll/scroll'
// import BetterScroll from 'better-scroll'
export default {
	name: 'CityList',
	components: {
		Scroll
	},
	props: {
		hot_cities: Array,
		cities: Array,
		letter: String,
		tabType: String,
		history_cities: Array,
		isType: String,
		isCityShow: Boolean,
		click: { type: Boolean, default: true }
	},
	methods: {
		handleCity (item, type) {
			(type === 'city') && this.handleHistoryCity(item) // 处理搜索历史

			this.$emit('selectcity', item)
		},
		handleHistoryCity (item) {
			let arr = []
			let strCity = ''
			if (this.tabType === 'single') {
				if (this.default_domestic_history_city) {
					arr = JSON.parse(this.default_domestic_history_city)
				}
			} else {
				if (this.default_internet_history_city) {
					arr = JSON.parse(this.default_internet_history_city)
				}
			}

			let cityCodeArr = arr.map((item, idex) => {
				return item.city_code
			})

			// 去掉重复的历史城市
			if (this.$_.contains(cityCodeArr, item.city_code)) {
				return
			}

			let obj = {
				city_code: item.city_code,
				city_name_cn: item.city_name_cn,
				city_name_en: item.city_name_en
			}

			// 限制城市历史只能最多 12 个
			if (!this.$_.contains(cityCodeArr, item.city_code)) {
				if (arr.length >= 12) {
					arr.unshift(obj)
					arr.pop()

					this.history_cities.unshift(obj)
					this.history_cities.pop()
				} else {
					arr.push(obj)
					this.history_cities.push(obj)
				}
			}

			strCity = JSON.stringify(arr)

			// 根据国内和国际进行保存
			if (this.tabType === 'single') {
				this.changeDomesticHistoryCity(strCity)
			} else {
				this.changeInternetHistoryCity(strCity)
			}
		},
		...mapMutations(['changeDomesticHistoryCity', 'changeInternetHistoryCity'])
	},
	computed: {
		...mapState(['default_domestic_history_city']),
		...mapState(['default_internet_history_city'])
	},
	watch: {
		letter () {
			if (this.letter) {
				let element = ''
				if (this.letter === 'hot' || this.letter === 'history') {
					element = this.$refs[this.letter]
				} else {
					element = this.$refs[this.letter][0]
				}
				this.$refs.mainList.scrollToElement(element)
			}
		},
		tabType () {
			this.$refs.mainList.scrollToElement('hot')
		}
	}
}
</script>

<style lang="stylus" scoped>
	.border-topbottom
		&:before
			border-color:#f0f0f0
		&:after
			border-color:#f0f0f0
	.border-bottom
		&:before
			border-color:#f0f0f0
	.list
		overflow:hidden
		position:absolute
		top:2rem
		left:0
		right:0
		bottom:0
		.title
			line-height: .6rem
			background: #f5f5f5
			padding-left: .3rem
			color:#bbb
			font-size: .26rem
		.city-list
			padding: 0.3rem 0.6rem 0 0.2rem
			overflow:hidden
			.city-wrapper
				float:left
				.city
					margin: 0 .18rem .3rem 0
					float:left
					text-align:center
					border: 1px solid #E9E9E9
					border-radius: 2px
					height: .6rem
					line-height: .6rem
					width: 2rem
					white-space: nowrap
					overflow: hidden
					text-overflow: ellipsis
		.item-list
			.item
				line-height: 1rem
				margin-left: .3rem
				font-size: .28rem
				color:#333
</style>
