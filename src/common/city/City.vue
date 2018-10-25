<template>
	<div class="city-wrapper">
		<city-search :cities="cities" @selectcity="selectChangeCity"></city-search>
		<tab-nav :tabList="tabList" :tabType="tabType" @changeTab="changeTab">
			<city-list :cities="cities" :hot_cities="hot_cities" :history_cities="history_cities" :letter="letter" :tabType="tabType" @selectcity="selectChangeCity" :isCityShow="isCityShow"></city-list>
			<city-alphabet :cities="alphabets" @change="handleLetterChange" @selectcity="selectChangeCity"></city-alphabet>
		</tab-nav>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { getCity } from 'api/flight'
import TabNav from 'common/TabNav'
import CityList from 'common/city/components/List'
import CityAlphabet from 'common/city/components/Alphabet'
import CitySearch from 'common/city/components/Search'
export default {
	name: 'City',
	props: {
		isCityShow: Boolean
	},
	components: {
		TabNav,
		CityList,
		CityAlphabet,
		CitySearch
	},
	data () {
		return {
			tabType: 'single',
			tabList: [
				{
					type: 'single',
					name: '国内'
				},
				{
					type: 'return',
					name: '国际/港澳台'
				}
			],
			cities: [],
			hot_cities: [],
			history_cities: [],
			retData: [],
			alphabets: [],
			letter: ''
		}
	},
	methods: {
		changeTab (tab) {
			// 选择国内还是国际
			this.tabType = tab.type
			if (this.tabType === 'single') {
				this.changeCity('domestic')
			} else {
				this.changeCity('internation')
			}
		},
		getCity () {
			getCity().then(this.handleCity)
		},
		handleCity (res) {
			res = res.data
			if (res.state === true && res.data) {
				this.retData = res.data
				// 默认展示国内
				this.changeCity('domestic')
			}
		},
		changeCity (type) {
			this.cities = []
			this.hot_cities = []
			this.alphabets = []
			this.history_cities = []
			let tmpArr = []
			if (type === 'domestic') {
				this.cities = this.retData.domestic
				// 处理热门城市
				this.handleHotCity(this.retData.domesticHot)
				if (this.default_domestic_history_city !== '') {
					tmpArr = JSON.parse(this.default_domestic_history_city)
				}
			} else {
				this.cities = this.retData.internation
				// 处理热门城市
				this.handleHotCity(this.retData.internationHot)
				if (this.default_internet_history_city !== '') {
					tmpArr = JSON.parse(this.default_internet_history_city)
				}
			}

			tmpArr.map((item) => {
				item && this.history_cities.push(item)
			})

			this.changeAlphabet()
		},
		changeAlphabet () {
			let result = []
			this.cities.forEach((item) => {
				result.push(item)
			})
			result.unshift({start_char: '历史'})
			result.unshift({start_char: '热门'})
			this.alphabets = result
		},
		handleHotCity (hotCities) {
			for (let key in hotCities) {
				let hCities = hotCities[key]['cities']
				for (let sKey in hCities) {
					this.hot_cities.push(hCities[sKey])
				}
			}
		},
		handleLetterChange (letter) {
			switch (letter) {
				case '热门':
					letter = 'hot'
					break
				case '历史':
					letter = 'history'
					break
			}
			this.letter = letter
		},
		selectChangeCity (item) {
			this.$emit('closeCity', item)
		}
	},
	computed: {
		...mapState(['default_domestic_history_city']),
		...mapState(['default_internet_history_city'])
	},
	mounted () {
		this.getCity()
	}
}
</script>

<style lang="stylus" scoped>
	.city-wrapper
		background: #fff
		z-index: 2
		position: absolute
		top:0
		left:0
		bottom:0
		right:0
</style>
