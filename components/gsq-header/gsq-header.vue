<template>
	<view class="header" :style="{height: headerheight + 'rpx' }">
		<view v-if="showleft" class="header-left">
			<slot name="left"></slot>
		</view>
		<view class="header-center">
			<image src="../../static/search.png"></image>
			<view class="header-center-box-ri">
				<input :placeholder="placeholder" type="text" v-model="searchinput" />
			</view>
			<view class="xiaoqu" v-if="ischa && searchinput!='' " @click=" searchinput = '' ">
				<image src="../../static/inputcha.png"></image>
			</view>
		</view>
		<view v-if="showright" class="header-right">
			<slot name="right"></slot>
		</view>
	</view>
</template>

<script>
	/**
	 * gsq-header
	 * @property {Number} headerheight = 88 navbar高度
	 * @property {String} placeholder = '请输入内容' 提示框内容
	 * @property {Boolean} showleft = [true | false] 是否显示左边的solt
	 * @property {Boolean} showright = [true | false] 是否显示右边的solt
	 * @property {Boolean} ischa = [true | false] 是否显示点击清除的按钮
	 *
	 * @event {Function(current)} change 改变标签触发
	 */
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
			ischa: {
				type: Boolean,
				default: true
			},
			placeholder: {
				typeof: String | Number,
				default: '请输入内容'
			}
		},
		created() {},
		methods: {
			search() {
				const search = this.searchinput
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
		background-color: #ebebeb;
		box-sizing: border-box;
		padding: 10rpx;

		.header-left {
			width: 100rpx;
			// background-color: red;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.header-center {
			flex: 1;
			height: 100%;
			display: flex;
			align-items: center;
			overflow: hidden;
			position: relative;
			image {
				width: 40rpx;
				height: 40rpx;
			}

			.xiaoqu {
				position: absolute;
				bottom: 10rpx;
				right: 20rpx;

				image {
					width: 30rpx;
					height: 30rpx;
				}
			}

			.header-center-box-ri {
				margin-left: 20rpx;
				flex: 1;
				
				input {
					height: 100%;
					width: 100%;
				}
			}
		}

		.header-right {
			width: 100rpx;
			// background-color: blue;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
