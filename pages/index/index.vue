<template>
	<view class="container">
		<view class="childbox" v-for="(item,index) in commponentslist" :key="index" @click="navcomponets(item)">
			{{item}}
		</view>
		<!-- <MpvueCitypicker ></MpvueCitypicker> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				commponentslist :
				['picker-view省市区选择',
				'省市选择(2栏 目的只为选择市)','数字选择器',
				'多功能滑动组件(还在开发中，支持最简单的滑动删除)',
				'头部通用',
				'自定义tabbar',
				'左右滑动tab列表',
				'头部消息提示 succsee err info warn   暂支持4种情况',
				'弹框   - onReady生命周期才能直接弹窗',
				'高级tab列表滑动可各种拓展',
				'可输入提交弹框',
				'城市列表选择需要配置数据',
				'列表滑动操作   - 支付宝小程序不支持',
				'滑动列表外壳',
				'弹框     - 需依赖 uni-transition',
				'就一个数据展示而已',
				'时间选择器',
				'时间选择 年月日时分    - 需依赖 uni-popup',
				'只支持H5  transition',
				'BetterSticky',
				'画布',
				'视频播放器',
				'小到大定时器',
				'自定义拖动容器',
				'天 时 分 秒 定时器',
				'LuPopupWrapper',
				'列表滑动展示',
				'日历只显示当前月当天',
				'H5生成二维码',
				'uniapp 上传图片到服务器'
				]
			}
		},
		methods: {
			navcomponets(item){
				uni.navigateTo({
					url:'../zujian/zujian'
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	.container{
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		padding: 0 20rpx;
		.childbox{
			width: 100%;
			height: 90rpx;
			// line-height: 90rpx;
			border: 1rpx solid #808080;
			border-radius: 25rpx;
			margin-top: 10rpx;
			text-align: center;
		}
	}
</style>
