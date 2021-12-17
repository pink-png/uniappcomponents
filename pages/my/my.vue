<template>
	<view class="body-view">
		<!-- 头部 -->
		<v-tabs v-model="currentTab" ref="tab" height="96rpx" :tabs="menuTabs" field="name" @change="changeTab">
		</v-tabs>
		<!-- 显示区域 -->
		<swiper :current="currentTab" class="swiper-box-list" duration="300" @change="swiperChange">
			<swiper-item v-for="(item,index1) in swiperDateList" :key="index1" class="swiper-box-list">
				<scroll-view class="swiper-topic-list" 
				refresher-enabled
				@refresherpulling="refresherpulling"
				@refresherrefresh ="refresherrefresh"
				@refresherrestore="refresherrestore"
				:id="'tabNum'+index1" scroll-y="true" @scrolltolower="loadMore(index1)">
					<block v-for="(itemchild,index2) in item" :key="index2">
						<view class="tabContent" style="float: left;" v-if="index2%2!=0">
							{{itemchild.name}}
						</view>
						<view class="tabContent" style="float: right;" v-if="index2%2==0">
							{{itemchild.name}}
						</view>
					</block>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				scrollLeft: 0,
				currentTab: 0,
				// Tab分类标题
				menuTabs: [{
					name: '今日热点'
				}, {
					name: '医疗'
				}, {
					name: '交通'
				}, {
					name: '住房'
				}, {
					name: '社会保障'
				}, {
					name: '教育'
				}, {
					name: '民生热点'
				}],
				// Tab切换内容
				swiperDateList: [
					[{name :0},{name : 0},{name :1},{name : 2},{name :1},{name : 2},{name :1},{name : 2},{name :0},{name : 0},{name :1},{name : 2},{name :1},{name : 2},{name :1},{name : 2},{name :0},{name : 0},{name :1},{name : 2},{name :1},{name : 2},{name :1},{name : 2},{name :0},{name : 0},{name :1},{name : 2},{name :1},{name : 2},{name :1},{name : 2},{name :0},{name : 0},{name :1},{name : 2},{name :1},{name : 2},{name :1},{name : 2},{name :0},{name : 0},{name :1},{name : 2},{name :1},{name : 2},{name :1},{name : 2},{name :0},{name : 0},{name :1},{name : 2},{name :1},{name : 2},{name :1},{name : 2},{name :0},{name : 0},{name :1},{name : 2},{name :1},{name : 2},{name :1},{name : 2}],
					[{name :1},{name : 1},{name :1},{name : 2},{name :1},{name : 2},{name :1},{name : 2}],
					[{name :2},{name : 2},{name :1},{name : 2},{name :1},{name : 2},{name :1},{name : 2}],
					[{name :3},{name : 3},{name :1},{name : 2},{name :1},{name : 2},{name :1},{name : 2}],
					[{name :4},{name : 4},{name :1},{name : 2},{name :1},{name : 2},{name :1},{name : 2}],
					[{name :5},{name : 5},{name :1},{name : 2},{name :1},{name : 2},{name :1},{name : 2}],
					[{name :6},{name : 5},{name :1},{name : 2},{name :1},{name : 2},{name :1},{name : 2}],
				],
			}
		},
		methods: {
			//切换tab
			changeTab(e) {
				console.log('2', e)
				this.currentTab = e
			},
			swiperChange: async function(e) {
				console.log('滑动', e)
				let index = e.target.current;
				this.currentTab = index;
				// this.setScrollLeft(index);
			},
			// 下拉刷新
			refresherpulling(){
					
			},
			refresherrefresh(){
				
			},
			// 山拉加载
			loadMore(tabIndex) {
				console.log(tabIndex)
				console.log('正在加载更多数据。。。')
			},
			// setScrollLeft: async function(tabIndex) {
			// 	let leftWidthSum = 0;
			// 	for (var i = 0; i <= tabIndex; i++) {
			// 		let nowElement = await this.getWidth('tabNum' + i);
			// 		leftWidthSum = leftWidthSum + nowElement.width;
			// 	}
			// 	let winWidth = uni.getSystemInfoSync().windowWidth;
			// 	this.scrollLeft = leftWidthSum > winWidth ? (leftWidthSum - winWidth) : 0
			// },
			// getWidth(id) { //得到元素的宽高
			// 	return new Promise((res, rej) => {
			// 		uni.createSelectorQuery().select("#" + id).fields({
			// 			size: true,
			// 			scrollOffset: true
			// 		}, (data) => {
			// 			res(data);
			// 		}).exec();
			// 	})
			// },

		},
	}
</script>

<style lang="scss">
	.body-view{
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
		.swiper-box-list{
			width: 100%;
			height: calc(100vh - 96rpx);
			.swiper-topic-list{
				width: 100%;
				height: calc(100vh - 96rpx);
				padding: 20rpx;
				box-sizing: border-box;
				// display: flex;
				// flex-wrap: wrap;
				// justify-content: space-between;
				// align-items: flex-start;
				.tabContent{
					margin-top: 16rpx;
					width: 49%;
					height: 70rpx;
					border: 1rpx solid pink;
				}
			}
		}
	}
</style>
