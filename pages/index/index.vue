<template>
	<!-- <scroll-view scroll-y class="scrollY">
		<view class="scrollYitem" v-for="(item,index) in Componentname" @click="navTabComponent(item)">
			{{item.ZH}}
		</view>
	</scroll-view> -->
	<view >
		<circle percent="60">
			<view style="width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;">
				60%
			</view>
		</circle>
	</view>
	
</template>
<script>
	export default {
		data() {
			return {
				count : 0,
				countxxx : this.count / 100,
				Componentname: [
					{EN: 'circle',ZH: '进度圆全端可用'},
					{EN: 'cCircle',ZH: '进度圆小程序无效'},
					{EN: 'GsqPassworldInputDiy',ZH: '自定义密码输入框'},
					{EN: 'GsqHeader',ZH: '头部通用'},
					{EN: 'Animation',ZH: '只支持H5  transition'},
					{EN: 'GsqCitypicker',ZH: '省市区选择'},
					{EN: 'GsqShengShiPicker',ZH: '省市选择'},
					{EN: 'GsqNumberBox',ZH: '数字选择器'},
					{EN: 'GsqSwipeAction',ZH: '多功能滑动组件'},
					{EN: 'GsqTabbar',ZH: '自定义tabbar'},
					{EN: 'GsqTabList',ZH: '左右滑动tab列表'},
					{EN: 'BoboMessage',ZH: '头部消息提示'},
					{EN: 'MingPop',ZH: '弹框1'},
					{EN: 'Vtabs',ZH: '高级tab列表滑动'},
					{EN: 'HFromAlert',ZH: '可输入提交弹框'},
					{EN: 'UniAddressSelector',ZH: '城市列表选择需要配置数据'},
					{EN: 'MarkSlideList',ZH: '列表滑动操作'},
					{EN: 'CodeKeyBoard',ZH: '简易数字键盘'},
					{EN: 'DialogBox',ZH: '弹框2'},
					{EN: 'MxDatePicker',ZH: '多类型时间选择器'},
					{EN: 'PickerDate',ZH: '上下滑动时间选择器'},
					{EN: 'KXDateTime',ZH: '时间选择 年月日时分'},
					{EN: 'LinnianCountDown',ZH: '天 时 分 秒 定时器'},
					{EN: 'SsCalendar',ZH: '日历只显示当前月当天'},
					{EN: 'BetterSticky',ZH: '只支持H5'},
					{EN: 'CanvasLove',ZH: '画布'},
					{EN: 'ChunleiVideo',ZH: '视频播放器'},
					{EN: 'DigitJump',ZH: '小到大定时器'},
					{EN: 'DragBall',ZH: '自定义拖动容器'},
					{EN: 'LuPopupWrapper',ZH: 'LuPopupWrapper'},
					{EN: 'PyhGoodsSwiper',ZH: '列表滑动展示'},
					{EN: 'TkiQrcode',ZH: 'H5生成二维码'},
					{EN: 'UploadImages',ZH: 'uniapp 上传图片到服务器'},
					{EN: 'unisection',ZH: '就一个数据展示而已'},
					{EN: 'uniSwipeAction',ZH: '滑动列表外壳'},
					{EN: 'uniSwipeActionItem',ZH: '滑动列表子项'},
					{EN: 'unipopup',ZH: '弹框 需依赖 uni-transition'},
					{EN: 'TcolorPicker',ZH: '颜色选择器'},
					{EN: 'GsqGeneralform',ZH: '多功能表单'},
				]
			}
		},
		methods: {
			navTabComponent(item) {
				if(item.EN == 'GsqHeader'){
					uni.navigateTo({
						url: '/pages/component/GsqHeader'
					})
				}else if(item.EN == 'Animation'){
					uni.navigateTo({
						url: '/pages/component/Animation'
					})
				}else if(item.EN == 'GsqCitypicker'){
					uni.navigateTo({
						url: '/pages/component/GsqCitypicker'
					})
				}
				
			}
		},
		onLoad() {
			setInterval(()=>{
				if (this.count >= 100) return 
				this.count+=10
			},1000)
		}
		
	}
</script>

<style scoped>
	.scrollY {
		width: 100vw;
		height: 100vh;
		background-color: #f1f1f1;
		font-weight: 600;
		color: #34495e;
		font-family: Open Sans,-apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,Segoe UI,Arial,Roboto,PingFang SC,miui,Hiragino Sans GB,Microsoft Yahei,sans-serif;
	}

	.scrollYitem {
		width: 80%;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		background-color: #fff;
		border-radius: 60rpx;
		margin: 20rpx auto;
	}
	
	
	.img{
		position: fixed;
		top: 100rpx;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
