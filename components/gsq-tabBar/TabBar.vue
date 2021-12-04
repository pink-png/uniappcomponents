<template>
	<view class="page-total">
		<view class="tab-list">
			<view class="list" v-for="(item,index) in TabBarList" @click="onTabBar(item,index)" :key="index">
				<image class="acimg" :src="item.acImg" mode="widthFix" v-show="tabBarShow === index"></image>
				<image :src="item.img" mode="widthFix" v-show="tabBarShow != index"></image>
				<text class="action">{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabBarList: [{
						index: 0,
						name: '抽奖',
						img: '../../static/tabbar/one1.png',
						acImg: '../../static/tabbar/one2.png'
					},
					{
						index: 1,
						name: '钱包',
						img: '../../static/tabbar/two1.png',
						acImg: '../../static/tabbar/two2.png'
					},
					{
						index: 2,
						name: '黄金',
						img: '../../static/tabbar/three1.png',
						acImg: '../../static/tabbar/three2.png'
					},
					{
						index: 3,
						name: '大厅',
						img: '../../static/tabbar/four1.png',
						acImg: '../../static/tabbar/four2.png'
					},
				],
				codeheight: 0,
				isOverall: 0,
				phoneModel: '',
			};
		},
		props: {
			tabBarShow: {
				type: Number,
				default: 0,
			}
		},
		mounted() {
			try {
				const res = uni.getSystemInfoSync();
				let that = this;
				// 获取系统信息
				uni.getSystemInfo({
					success(res) {
						// console.log(res.brand) //手机牌子
						// console.log(res.model) //手机型号
						// console.log(res.screenWidth) //屏幕宽度
						// console.log(res.screenHeight) //屏幕高度
						that.codeheight = Math.round(res.screenHeight);
						that.phoneModel = res.model
						if (res.model.search('iPhone')) {
							that.isOverall = 0;
						} else if (Math.round(res.screenHeight) > 740) {
							that.isOverall = 1;
						}
						// console.log(that.isOverall);
					}
				});
			} catch (e) {
				// error
			}
		},
		methods: {
			/**
			 * @param {Object} item
			 * @param {Number} index
			 */
			onTabBar(item, index) {
				// this.tabBarShow = index;
				switch (index) {
					case 0:
						// wx.redirectTo({
						// 	url: '../../pages/luckdraw/luckdraw'
						// })
						break;
					case 1:
						// wx.redirectTo({
						// 	url: '../../pages/wallet/wallet'
						// })
						break;
					case 2:
						// wx.redirectTo({
						// 	url: '../../pages/gold/gold'
						// })
						break;
					case 3:
						// wx.redirectTo({
						// 	url: '../../pages/hall/hall'
						// })
						break;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'TabBar.scss';
</style>
