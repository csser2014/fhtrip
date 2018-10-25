<template>
	<div class="search-wrapper">
		<div class="search">
			<div class="iconfont back-icon" @click="goBack">&#xe63c;</div>
			<input class="search-input" v-model="keyword" type="text" placeholder="搜索目的地" />
			<div class="iconfont search-icon">&#xe620;</div>
			<div v-if="hasKeyWord" class="iconfont close-icon" @click="resetData">&#xe844;</div>
		</div>
		<div class="search-content" ref="search" v-show="keyword">
			<ul>
				<li class="search-item border-bottom" v-for="(item, index) of list" :key="index" @click="handleCity(item)">{{ item.city_name_cn }}</li>
				<li class="search-item border-bottome" v-show="hasList">没有找到匹配项目</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapMutations } from 'vuex'
import Bscroll from 'better-scroll'
export default {
	name: 'CitySearch',
	props: {
		cities: Array
	},
	data () {
		return {
			keyword: '',
			list: [],
			timer: null,
			click: { type: Boolean, default: true }
		}
	},
	methods: {
		goBack () {
			this.$emit('selectcity', '')
		},
		handleCity (item) {
			this.$emit('selectcity', item)
		},
		...mapMutations(['changeStartCity']),
		...mapMutations(['changeEndCity']),
		resetData () {
			this.list = []
			this.keyword = ''
		}
	},
	computed: {
		hasList () {
			return !this.list.length
		},
		hasKeyWord () {
			return this.keyword
		}
	},
	watch: {
		keyword () {
			if (this.timer) {
				clearTimeout(this.timer)
			}
			if (!this.keyword) {
				this.list = []
				return
			}
			this.timer = setTimeout(() => {
				const result = []
				for (let i in this.cities) {
					this.cities[i].cities.forEach((value) => {
						let cityNameEn = value.city_name_en.toLowerCase()
						if (cityNameEn.indexOf(this.keyword) > -1 ||
							value.city_name_cn.indexOf(this.keyword) > -1) {
							result.push(value)
						}
					})
				}
				this.list = result
			}, 100)
		}
	},
	mounted () {
		this.scroll = new Bscroll(this.$refs.search, {click: this.click})
	}
}
</script>

<style lang="stylus" scoped>
	::-webkit-input-placeholder
		color:#bbb
	.search-wrapper
		height: 1rem
	.search
		height: 1rem
		background: #fff
		position:relative
		.back-icon
			position: absolute;
			left: .28rem;
			top: .32rem;
			color: #000;
			font-size: .48rem;
		.close-icon
			color: #dfdfdf
			position: absolute
			right: .5rem
			top: .35rem
		.search-input
			background: #f5f5f5
			border-radius: 4px
			box-sizing: border-box
			width: 6.3rem
			border-radius: .06rem
			padding: .15rem 0
			color:#bbb
			font-size: .28rem
			margin: .15rem 0 0 .9rem
			text-indent: .74rem
		.search-icon
			position:absolute
			left: 1.1rem
			top: 0.35rem
	.search-content
		z-index:1
		overflow:hidden
		position:absolute
		top: 1rem
		left:0
		right:0;
		bottom:0
		background:#eee
		.search-item
			line-height: 1rem
			padding-left: 0.3rem
			font-size: 0.28rem
			color: #333
			background:#fff
</style>
