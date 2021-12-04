<template>
	<view class="header" :style="{height: headerheight + 'rpx' }">
		<view v-if="showleft" class="header-left">
			<view class="">
				11111
			</view>
		</view>
		<view class="header-center">
			<image src="../../static/search.png" style="width:40rpx;height:40rpx"></image>
			<view class="header-center-box-ri">
				<input type="text" style="height: 100%;width: 100%;" v-model="searchinput" />
			</view>
		</view>

		<view v-if="showright" class="header-right">
			<view class="">
				1111
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchinput: ''
			}
		},
		props: {
			headerheight: {
				type: Number,
				default: 88
			},
			showleft: {
				type: Boolean,
				default: true
			},
			showright: {
				type: Boolean,
				default: true
			},
		},
		created() {},
		methods: {
			search() {
				let search = this.searchinput
				this.$emit('search', search)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100vw;
		background-color: pink;
		box-sizing: border-box;
		padding: 10rpx;

		.header-left {
			width: 100rpx;
			height: 100%;
			background-color: red;
			text-align: center;
		}

		.header-center {
			// background-color: pink;
			flex: 1;
			height: 100%;
			display: flex;
			align-items: center;
			overflow: hidden;
			.header-center-box-ri {
				margin-left: 20rpx;
				// background-color: red;
				flex: 1;
			}
		}

		.header-right {
			width: 100rpx;
			height: 100%;
			background-color: blue;
			text-align: center;
		}
	}
</style>
