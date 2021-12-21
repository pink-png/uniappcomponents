<template>
	<view class="container">
		<!-- 分类大类 -->
		<view class="tabccc">
			<v-tabs v-model="currentTap" height="96rpx" :lineColor="lineColor" :activeColor="activeColor"
				:tabs="indexClassifyListedit" @change="changeTab" />
		</view>

		<!-- 分类列表 -->
		<swiper class="swiper" :current="currentTap" :duration="300" @change="onswiperchange">
			<swiper-item v-for="(page, index) in newalllist" :key="index">
				<scroll-view scroll-y="true" class="scrollview">
					<view class="v_flex_text">
						<view style="width: 50%;">
							<view class="v_flex_ccc" v-for="(item,index1) in page" :key="index1" v-if="index1%2==0">
								<view class="v_text" @click="skipPage(item.name,item.id)"
									hover-class="classify_btn_hover">
									{{item.name}}
								</view>
							</view>
						</view>
						<view style="width: 50%;">
							<view class="v_flex_ccc" v-for="(item,index2) in page" :key="index2" v-if="index2%2!=0">
								<view class="v_text" @click="skipPage(item.name,item.id)"
									hover-class="classify_btn_hover">
									{{item.name}}
								</view>
							</view>
						</view>
					</view>
				</scroll-view>

			</swiper-item>

		</swiper>

	</view>


</template>

<script>
	import Vtabs from "@/components/v-tabs/v-tabs.vue"
	export default {
		data() {
			return {
				currentTap : 0,
				indexClassifyListedit: ['xixi', 'haha', 'yiyi'],
				newalllist: [
					[{
						name: 1,
						id: 1
					}, {
						name: 2,
						id: 2
					}, {
						name: 3,
						id: 3
					}],
					[{
						name: 3,
						id: 3
					}, {
						name: 4,
						id: 4
					}, {
						name: 5,
						id: 5
					}],
					[{
						name: 7,
						id: 7
					}, {
						name: 8,
						id: 8
					}, {
						name: 9,
						id: 9
					}]
				]
			}
		},
		components: {
			Vtabs
		},
		props: {
			lineColor: {
				type: String,
				default: 'red'
			},
			activeColor: {
				type: String,
				default: 'red'
			}

		},
		methods: {
			// 切换tab
			changeTab(index) {
				console.log('当前选中的项：' + index)
				this.currentTap = index
			},
			// 滑动
			onswiperchange(event) {
				console.log('滑动的event', event.detail.current)

				let {
					current
				} = event.detail
				this.currentTap = current
			}
		}
	}
</script>

<style scoped lang="scss">
	.container {
		display: flex;
		flex-direction: column;

		.tabccc {
			position: fixed;
			top: 96rpx;
			left: 0;
			right: 0;
			z-index: 999;
		}

		.swiper {
			height: calc(100vh - 200rpx);

			.scrollview {
				height: calc(100vh - 200rpx);

				.v_flex_text {
					display: flex;
					justify-content: space-between;

					.v_flex_ccc {
						margin-top: 25rpx;
						margin-left: 35rpx;

						.v_text {
							width: 320rpx;
							padding: 26rpx 26rpx;
							text-align: center;
							background: #ffffff;
							border-radius: 10rpx;
							color: #535353;
							font-size: 28rpx;
							line-height: 40rpx;
							border: 1rpx solid #efefef;
							display: block;
							box-sizing: border-box;
						}
					}

					.classify_btn_hover {
						color: red;
						border: 1rpx solid red;
					}

				}
			}
		}

	}
</style>
