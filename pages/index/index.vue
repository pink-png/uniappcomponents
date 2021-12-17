<template>
	<view class="content">
		<view class="aa"></view>
		<view class="nn"></view>
		<view class="dd"></view>
		<view class="yy"></view>
		<!-- <image src="https://img2.baidu.com/it/u=2168213873,1727451561&fm=26&fmt=auto" mode=""></image> -->
	</view>
</template>

<script>
	// import banner from "../../common/base64/index/banner.js"

	export default {
		data() {
			return {
				textaa: 1
			}
		},
		async onLoad() {
			this.textaa = 1121212

			// 显示base64图片
			// this.Qccodebanner = banner.replace(/[\r\n]/g, "");
			// console.log('111', typeof this.Qccodebanner)
			// let res = await this.$https(this.$api.hh)
			// console.log('res',res)
		},
		methods: {},
	}
</script>

<style scoped lang="scss">
	.content {
		background-color: red;

		display: flex;
		flex-direction: column;

		.awwexd {
			width: 108rpx;
			height: 110rpx;
			background-position: 0 -40rpx;
			display: inline-block;
			background: url('https://img2.baidu.com/it/u=2168213873,1727451561&fm=26&fmt=auto');
		}

		/* .nn {
			width: 112rpx;
			height: 110rpx;
			background-position: -255rpx -276rpx;
			display: inline-block;
		}

		.dd {
			width: 97rpx;
			height: 107rpx;
			background-position: -363rpx -8rpx;
			display: inline-block;
		}

		.yy {
			width: 110rpx;
			height: 110rpx;
			background-position: -367rpx -556rpx;
			display: inline-block;
		} */
	}
</style>
